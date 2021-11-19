import React , {useState,useEffect} from 'react';
import {Modal, Button, ButtonGroup, ToggleButton} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faWallet} from '@fortawesome/free-solid-svg-icons';

const UserTransaction=(props)=>{    
    const [walletDetails,setWalletData]=useState(props.walletData);
    const initialFormState = { name: walletDetails?.name, walletid: walletDetails?.walletid, amount:0 ,description:''};
    const [ transactionDetails, setTransactionDetails ] = useState(initialFormState);
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('Debit');
    const [balance,setBalance]=useState(walletDetails?.balance);

    useEffect(()=>{
        setWalletData(props.walletData);
        setTransactionDetails(props.walletData);
        setBalance(props.walletData?.balance);
        console.log(walletDetails);
    },[props])

    const radios = [
        { name: 'Credit', value: 'Credit' },
        { name: 'Debit', value: 'Debit' }       
      ];

    const handleClickSave=(event)=>{
        event.preventDefault()
        if (transactionDetails.amount) {
            transactionDetails.balance=balance;
            transactionDetails.type=radioValue;
            props.createTransactionDetails(transactionDetails);
        }        
    }

    const handleInputChange = event => {
        debugger
        if(event.target.name=='amount'){
            if(radioValue=='Debit'){
                const balanceAmt=((+props.walletData?.balance)+(+event.target.value));
                setBalance(balanceAmt);
            }else if(radioValue=='Credit'){
                const balanceAmt=((+props.walletData?.balance)-(+event.target.value));
                setBalance(balanceAmt);
            }
        }
               
		const { name, value } = event.target

		setTransactionDetails({ ...transactionDetails, [name]: value })
    }

    const handleChangeTransactionType=(e)=>{
        setRadioValue(e.currentTarget.value);
    }

    return(
        <Modal show={props.show}  centered >
            <Modal.Header>
                <Modal.Title>Transaction</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                <div>   
                    <div className="d-flex">
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" value={transactionDetails?.name} disabled={true}  />
                        </div>
                        <div className="px-2">
                            <label>Wallet Id</label>
                            <input type="text" name="walletid" value={transactionDetails?.walletid} disabled={true}  />
                        </div>                        
                    </div>
                    <div className="d-flex">
                        <div>
                            <label>Transaction Amount (Credit/Debit)</label>
                            <input type="number"  name="amount" value={transactionDetails?.amount} onChange={handleInputChange} />
                        </div>
                        <div className="ml-3">
                        <label>Type</label>
                                <ButtonGroup>
                                    {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                        name="type"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={handleChangeTransactionType}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                    ))}
                                </ButtonGroup>
                        </div>
                    </div>
                    <label>Reason of Transaction</label>
                    <input type="text" name="description" value={transactionDetails?.description} onChange={handleInputChange} />
                    <label>Balance</label>
                    <input type="number" name="balance" value={balance} disabled={true} />
                 </div>
                </Modal.Body>
            <Modal.Footer>
            <Button className="m-2 rounded border-0" onClick={handleClickSave}>
                Done
            </Button>
            
            <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
		</Modal>        
    )
}

export default UserTransaction;