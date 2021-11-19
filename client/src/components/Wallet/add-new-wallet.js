import React , {useState} from 'react';
import { useSelector } from "react-redux";
import {Modal, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWallet} from '@fortawesome/free-solid-svg-icons';

const AddNewWallet=(props)=>{	
    debugger
    const { user: currentUser } = useSelector((state) => state.auth);
    const initialFormState = { name: currentUser.username, email: currentUser.email, balance:100 };
    const [ walletDetails, setWallet ] = useState(initialFormState);

    const handleClickSave=(event)=>{
        event.preventDefault()
        if (walletDetails.name && walletDetails.email && walletDetails.balance) {
            props.addNewWallet(walletDetails);
        }        
    }

    return(
        <Modal show={props.show}  centered >
            <Modal.Header>
                <Modal.Title>New Wallet</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <div>               
                    <label>Name</label>
                    <input type="text" name="name" value={walletDetails.name} disabled={true}  />
                    <label>Email</label>
                    <input type="text" name="email" value={walletDetails.email} disabled={true} />                            
                    <label>Add Money</label>
                    <input type="text" name="balance" value={walletDetails.balance} disabled={true} />
                 </div>
                </Modal.Body>
            <Modal.Footer>
            <Button className="m-2 rounded border-0" onClick={handleClickSave} disabled={props.newWallet}>
                 {props.textBtn}<FontAwesomeIcon className="ml-2" icon={faWallet} size={"1x"}/>
            </Button>
            
            <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
		</Modal>        
    )
}

export default AddNewWallet;