import React, { useState, useEffect  } from "react";
import UserTable from "./UserTable";
import Styles from "./UserAdmin.css";
import UserService from '../../services/user.service';
import { Button} from 'react-bootstrap';
import AddUserPop from "./AddUserModal";
import EditUserPop from "./EditUserModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const UserAdmin = () => {

	const [ users, setUsers ] = useState([]);
	const [ roleList, setRoles ] = useState([]);
	const [show, setShow] = useState(false);
	const [editUserPopup, setEditUserPopup] = useState(false);
	const [ currentUser, setCurrentUser ] = useState('')
	const [ editing, setEditing ] = useState(false)


	const getUserDetails=()=>{
		UserService.getUsers().then(
			(res)=>{
					setUsers(res.data);				
		},(err)=>{
			const _content =
			(err.response && err.response.data) ||
			err.message ||
			err.toString();  
			setUsers(_content);
		});
	}

	const addNewUser = (user) => {
		if(user.username && user.email && user.role){
		  alert(`Username : ${user.username},Email : ${user.email},role : ${user.role.length}`);
		  UserService.addUserDetails(user).then((res)=>{
			  if(res){
				  setShow(false);
				  getUserDetails();
				  return false;
			  }
			  
		  })
		}
    }

	const deleteUser = id => {
		setEditing(false)
		UserService.deleteUser(id).then(res=>{
			getUserDetails();
		})
	}

	const updateUser = (id, userDetail) => {
		if(userDetail.id === id){
			console.log(userDetail);
			setEditUserPopup(false);
			UserService.addUserDetails(userDetail).then((res)=>{
				if(res){
					getUserDetails();
				}				
			},(err)=>{
				console.log(err)
			})
		}
	}

	const editRow = user => {
		setEditUserPopup(true)
		setCurrentUser({ id: user._id, name: user.username, username: user.email , role:user.roles, roleName: roleList.find(x=>x._id===user.roles[0]).name})
	}

	useEffect(() => {
		getUserDetails();
	},[]);

	useEffect(() => {
		UserService.getRoleList().then(
			(res)=>{
				setRoles(res.data);
		},(err)=>{
			const _content =
			(err.response && err.response.data) ||
			err.message ||
			err.toString();

			setRoles(_content);
		});
	},[]);	

  return (
    <div className="container">
		<div className="flex-large">
			<h3 className="m-3">User Details</h3>
			<Button className="nextButton" onClick={()=>{setShow(true)}} >
					Add New User<FontAwesomeIcon className="ml-2" icon={faPlusCircle} size={"1x"}/>
			</Button>
			<UserTable users={users} roles={roleList} editRow={editRow} deleteUser={deleteUser} />
		</div>

		<div>			
			<EditUserPop 	showEditUser={editUserPopup} 
							onEditUserHide={()=>{setEditUserPopup(false)}} 
							editing={editing}
							setEditing={setEditing}
							currentUser={currentUser}
							updateUser={updateUser}
							roles={roleList}></EditUserPop>
			<AddUserPop show={show} addUserClick={addNewUser} roles={roleList} onHide={()=>{setShow(false)}}></AddUserPop>
		</div>
	</div>
  );
};

export default UserAdmin;
