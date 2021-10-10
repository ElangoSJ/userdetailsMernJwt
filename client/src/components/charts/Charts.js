import React from "react";
import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartBar,faChartPie,faChartLine,faChartArea } from '@fortawesome/free-solid-svg-icons';
import styles from "./Charts.css";


const Charts = () => {
    return (
    <div className="w-100 h-100">
        <div className="container w-100 h-100">
            <div className="row mx-auto align-middle p-5">
                <div className="col-sm">
                    <Link to={"/barChart"} className="nav-link link">
                        <FontAwesomeIcon icon={faChartBar} size={"5x"} color={"#4499e3"}/>                        
                    </Link> 
                    <p className="p-tag">Bar Chart</p>
                </div>
                <div className="col-sm">
                    <Link to={"/pieChart"} className="nav-link link">
                        <FontAwesomeIcon icon={faChartPie} size={"5x"} color={"#f3939c"}/>
                    </Link>
                    <p className="p-tag">Pie Chart</p>
                </div>   
                <div className="col-sm">
                    <Link to={"/lineChart"} className="nav-link link">
                        <FontAwesomeIcon icon={faChartLine} size={"5x"} color={"#c75e68"}/>
                    </Link>
                    <p className="p-tag">Line Chart</p>
                </div>
                <div className="col-sm">
                    <Link to={"/scatterChart"} className="nav-link link">
                        <FontAwesomeIcon icon={faChartArea} size={"5x"} color={"#09315c91"}/>
                    </Link>
                    <p className="p-tag">Scatter Chart</p>
                </div>                  
            </div>  
        </div>
    </div>
  );
};

export default Charts;

