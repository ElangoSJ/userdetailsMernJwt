// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faUserPlus} from '@fortawesome/free-solid-svg-icons';

// const AddUserForm = props => {
// 	const initialFormState = { username: '', email: '',role:'0' }
// 	const [ user, setUser ] = useState(initialFormState);

// 	const handleInputChange = event => {
// 		const { name, value } = event.target

// 		setUser({ ...user, [name]: value })
// 	}

// 	return (
// 		<div className="add-div">
// 			<form
// 			onSubmit={event => {
// 				event.preventDefault()
// 				if (!user.username.length>3 && !user.email.length>3 && !user.role) return

// 				// props.addUser(user);
// 			}}
// 			>
// 			<label>Username</label>
// 			<input type="text" name="username" value={user.username} onChange={handleInputChange} />
// 			<label>Email</label>
// 			<input type="text" name="email" value={user.email} onChange={handleInputChange} />
// 			<span>Roles:</span>
//       			<select onChange={handleInputChange} name="role">
//         			<option value={user.role} />
//         				{props.roles.map((role, index) => {
// 						return <option key={index} value={role._id}>{role.name.charAt(0).toUpperCase()+ role.name.slice(1)}</option>;
//         				})}
//       			</select>
			
// 			<button className="m-2 rounded border-0">Add <FontAwesomeIcon className="ml-2" icon={faUserPlus} size={"1x"}/></button>
// 		</form>
// 		</div>
		
// 	)
// }

// export default AddUserForm