import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome,faUserSecret, faChartBar, faWallet } from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import UserAdmin from "./components/Admin/UserAdmin";
import Chart from "./components/charts/Charts";
import Wallet from "./components/Wallet/wallet";

import lineChart from "./components/charts/LineChart/LineChart" ;
import barChart from "./components/charts/BarChart/BarChart" ;
import pieChart from "./components/charts/PieChart/PieChart" ;
import scatterChart from "./components/charts/ScatterChart/ScatterChart" ;


import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import EventBus from "./common/EventBus";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCharts, setShowshowCharts] = useState(false);
  const [showWallet, setShowshowWallet] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); 
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("admin"));
      setShowshowCharts(currentUser.roles.includes("chart"));
      setShowshowWallet(currentUser.roles.includes("wallet"));
    } else {
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
         <div className="navbar-nav mr-auto">
           {currentUser&&(
          <li className="nav-item mr-2">
            <Link to={"/home"} className="nav-link">
                <FontAwesomeIcon icon={faHome} size={"2x"}/>
            </Link>
          </li>
           )} 

            {showCharts  && (
              <li className="nav-item mr-2">
                <Link to={"/chart"} className="nav-link">
                <FontAwesomeIcon icon={faChartBar} size={"2x"}/>
                </Link>
              </li>
            )}        

          {(showWallet||showCharts)  && (
            <Link to={"/Wallet"} className="nav-link">
              <FontAwesomeIcon icon={faWallet} size={"2x"}/>
            </Link>
          )}

            {(showAdminBoard || showCharts)  && (
              <li className="nav-item mr-2">
                <Link to={"/admin"} className="nav-link">
                <FontAwesomeIcon icon={faUserSecret} size={"2x"}/>
                </Link>
              </li>
            )}

           </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto mr-2">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item mr-2">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/admin" component={UserAdmin} />
            <Route path="/chart" component={Chart} />
            <Route exact path="/lineChart" component={lineChart} />
            <Route exact path="/pieChart" component={pieChart} />
            <Route path="/barChart" component={barChart} />
            <Route path="/scatterChart" component={scatterChart} />
            <Route path="/wallet" component={Wallet}/>
          </Switch>
        </div>

      </div>
    </Router>
  );
};

export default App;
