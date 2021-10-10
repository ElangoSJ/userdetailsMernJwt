import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { headerNameChange } from "./Home";
import {faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const deleteUserData =(e) => UserService.deleteUser(currentUser.id).then(
      (response) => {
        if(response){
          EventBus.dispatch("logout");
        }        
      },
      (error) => {
        if (error.response) {
          console.log("Unable to delete the user");
        }
      }
    );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <headerNameChange.Consumer>{
      (headerName)=>{
        return (
<div className="container">
      <header className="jumbotron d-flex ">
        <h3>
          <strong>{currentUser.username}</strong> {headerName?headerName:'Profile'}
        </h3>
        {!headerName && (
          <div>
             <button className="btn btn-gray pull-right float-right" onClick={deleteUserData}>
              <FontAwesomeIcon icon={faTrash} size={"2x"} color={'gray'}/>
            </button>
            <button className="btn btn-gray pull-right float-right">
              <FontAwesomeIcon icon={faEdit} size={"2x"} color={'gray'}/>
            </button>            
          </div>
        )}
         
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong> {currentUser.roles}     
    </div>
        )
      }
      }
    
    </headerNameChange.Consumer>
  );
};

export default Profile;
