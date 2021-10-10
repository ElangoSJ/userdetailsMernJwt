import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
      console.log("Edit User"+ JSON.stringify(props.currentUser));
    },
    [ props ]
  )
  
  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
  }

  return (
    <div  className="add-div">
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user.id, user)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
     
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />

      <label>Roles:</label>
          <select onChange={handleInputChange} name="role">
            <option value={user.role}>{user.roleName}</option>
              {props.roles.map((role, index) => {
                  return <option key={index} value={role._id}>{role.name.charAt(0).toUpperCase()+ role.name.slice(1)}</option>;
              })}
          </select>
      <button className="m-2 rounded border-0">Update <FontAwesomeIcon className="ml-2" icon={faUserEdit} size={"1x"}/></button>
      <button className="m-2 rounded border-0" onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
    </div>    
  )
}

export default EditUserForm