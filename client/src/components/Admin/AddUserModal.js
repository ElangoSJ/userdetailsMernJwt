import React , {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';

const AddUserPop=(props)=>{	

    const initialFormState = { username: '', email: '',role:[] }
	const [ user, setUser ] = useState(initialFormState);
    const  [disabled,setDisabled]=useState(true);

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
        if (user.username && user.email && user.role) {
            setDisabled(false);
        }   
	}

    const handleClickSave=(event)=>{
        event.preventDefault()
        if (user.username && user.email && user.role) {
            props.addUserClick(user)
            setUser(initialFormState);
        }

        setTimeout(()=>{
            setDisabled(true);
        },500)
        
    }

    return(
        <Modal show={props.show}  centered >
            <Modal.Header>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <div>               
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleInputChange} />
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleInputChange} />
                    <span>Roles:</span>
                        <select  name="role" value={user.role} onChange={handleInputChange}>
                            <option  />
                                {props.roles?.map((role, index) => {
                                return <option key={index} value={role._id}>{role.name.charAt(0).toUpperCase()+ role.name.slice(1)}</option>;
                                })}
                        </select>            
                 </div>
                </Modal.Body>
            <Modal.Footer>
            <Button className="m-2 rounded border-0" onClick={handleClickSave} disabled={disabled}>Add <FontAwesomeIcon className="ml-2" icon={faUserPlus} size={"1x"}/></Button>
            
            <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
		</Modal>        
    )
}

export default AddUserPop;