import React , {useState,useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

const EditUserPop=(props)=>{
    
    const [ user, setUser ] = useState(props.currentUser);
    const  [disabled,setDisabled]=useState(true);

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

    const handleClickUpdate=(event)=>{
        event.preventDefault()
        props.updateUser(user.id, user);

        setTimeout(()=>{
            setDisabled(true);
        },500)
        
    }

    return(
        <Modal show={props.showEditUser}  centered >
            <Modal.Header>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <div >
                        
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
                            
                    </div>    
                </Modal.Body>
            <Modal.Footer>
            <Button className="m-2 rounded border-0" onClick={handleClickUpdate} >Update <FontAwesomeIcon className="ml-2" icon={faUserEdit} size={"1x"}/></Button>
            
            <Button variant="secondary" onClick={props.onEditUserHide}>
                    Close
                </Button>
            </Modal.Footer>
		</Modal>
        
    )
}

export default EditUserPop;