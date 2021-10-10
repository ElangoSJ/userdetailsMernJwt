import React ,{useEffect, useState} from "react";
import { Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash,faSave } from '@fortawesome/free-solid-svg-icons';
import UserAdmin from "./UserAdmin.css";


const TrashButton=(cell, row, rowIndex, formatExtraData)=> {  
    const handelClick=(cell)=>{
    alert(cell);
    }
    

    return ( 
    <div className="action-div">
        <Button
         className="trashBtn" onClick={handelClick}>
          <FontAwesomeIcon icon={faSave} size={"2x"} color={"gray"}/>
        </Button> 

        <Button
         className="trashBtn">
          <FontAwesomeIcon icon={faTrash} size={"2x"} color={"gray"}/>
        </Button>        
     </div> 
  ); 
  } 
export default TrashButton;