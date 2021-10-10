import React, { useState, Fragment, useEffect  } from "react";
import EditUserForm from "./EditUser";
import AddUserForm from "./AddUser";
import UserTable from "./UserTable";
import Styles from "./UserAdmin.css";
import UserService from '../../services/user.service';

const UserAdmin = () => {

	const [ users, setUsers ] = useState([]);
	const [ roleList, setRoles ] = useState([]);
	const [showModal,setShowModal]=useState(false)

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


	const [ currentUser, setCurrentUser ] = useState('')
	const [ editing, setEditing ] = useState(false)

  	const addUser = user => {
		UserService.addUserDetails(user).then((res)=>{
			getUserDetails();
		})
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
			setEditing(false);
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
		setEditing(true)
		setCurrentUser({ id: user._id, name: user.username, username: user.email , role:user.roles, roleName: roleList.find(x=>x._id===user.roles[0]).name})
	}

	

  return (
    <div className="container">
      <div>
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
								roles={roleList}
							/>

						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} roles={roleList} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h3 className="m-3">User Details</h3>
					<UserTable users={users} roles={roleList} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
    </div>
  );
};

export default UserAdmin;
