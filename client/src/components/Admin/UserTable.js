import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';

const UserTable = (props) => (
  <table>
    <thead>
      <tr>
          <th>S.No</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Password</th>
          <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {props.users.length > 0 ? (props.users.map((user,index) => (          
        <tr key={index}>
          <td>{index}</td>
          <td>{user?.username}</td>
          <td>{user?.email}</td>
          <td>{
            props.roles.find(x=> x._id===user.roles[0])?.name.charAt(0).toUpperCase()+ props?.roles.find(x=>x._id===user.roles[0])?.name.slice(1)
            }</td>
          <td>
             <p className={user?.password ? "created" : "waited"}>{user?.password ? "Activated" : "Not Yet Created"}</p>
          </td>
          <td>
            <button onClick={() => {props.editRow(user)}} className="button muted-button border-0">
                <FontAwesomeIcon icon={faEdit} size={"1x"}/>
            </button>
            <button onClick={() => props.deleteUser(user._id)} className="button muted-button border-0">
              <FontAwesomeIcon icon={faTrash} size={"1x"}/>
            </button>
          </td>
        </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable