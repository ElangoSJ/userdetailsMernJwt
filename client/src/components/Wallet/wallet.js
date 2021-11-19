import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare,faWallet,faList , faMoneyCheck} from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import AddNewWallet from "./add-new-wallet";
import WalletService from "../../services/wallet.service";
import TransactionDetails from "../Wallet/wallet-transaction-details";
import walletstyle from "./wallet.css";
import UserTransaction from "./transaction-model";
import { useSelector } from "react-redux";


const Wallet = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [show, setShowNewWallet] = useState(false);
    const [showTransaction, setShowTransactionModel] = useState(false);
    const [walletDetail,setWalletDetail] = useState([]);
    const [userTransaction,setUserTransactionDetails] = useState([]);
    const [newWallet,setNewWallet]=useState(false);
    const [textChange,setTextChange]=useState('Create New Wallet')
    

    const addNewWallet=(walletDetail)=>{
        WalletService.addNewWalletDetail(walletDetail).then((res)=>{
            if(res){
                setShowNewWallet(false);
                setWalletDetail(res.data);
                setNewWallet(true);
                setTextChange('Wallet Already Created');
                return false;
            }                
        })
    }

    useEffect(()=>{
        getWallet();
    },[]);

    const getWallet=()=>{
        WalletService.getWalletDetail(currentUser?.email).then((res)=>{
            if(res){
                setWalletDetail(res.data);
                if(res.data.length>0){
                    setNewWallet(true);
                    setTextChange('Wallet Already Created');
                }else{
                    setNewWallet(false);
                }
                
                return false;
            }                
        })
    }

    useEffect(()=>{
        getTransDetails();
    },[walletDetail[0]?.walletid]);

    const getTransDetails = () => {
        WalletService.getTransactiondetails(walletDetail[0]?.walletid).then((res)=>{
            if(res){
                setUserTransactionDetails(res.data);
                return false;
            }    
        })
    }

    const createTransDetails=(data)=>{
        WalletService.userTransaction(data).then((res)=>{
            setShowTransactionModel(false);
            getTransDetails();
        });
    }

return(
    <div className="constainer">
        <div className="row">
            <div className="col-sm text-center">
                <p>Create New Wallet</p>
                <Button className="bg-white border-0" onClick={()=>{setShowNewWallet(true)}}>
                    <FontAwesomeIcon className="ml-2" icon={faWallet} color={'gray'} size={"2x"}/>
                    <FontAwesomeIcon className="ml-2" icon={faPlusSquare} color={'gray'} size={"1x"}/>
                </Button>
                <AddNewWallet show={show} textBtn={textChange} addNewWallet={addNewWallet} newWallet={newWallet} onHide={()=>{setShowNewWallet(false)}}></AddNewWallet>
            </div>
            
            <div className="col-sm text-center">
                <p>Check Wallet Transaction</p>
                <Button className="bg-white border-0">
                    <FontAwesomeIcon className="ml-2" icon={faWallet} color={'gray'} size={"2x"}/>
                    <FontAwesomeIcon className="ml-2" icon={faList} color={'gray'} size={"1x"}/>
                </Button>
            </div>

            <div className="col-sm text-center">
                <p>Make a Transaction</p>
                <Button className="bg-white border-0" onClick={()=>{setShowTransactionModel(true)}}>
                    <FontAwesomeIcon className="ml-2" icon={faMoneyCheck} color={'gray'} size={"2x"}/>
                </Button>
                <UserTransaction show={showTransaction} walletData={walletDetail[0]} createTransactionDetails={createTransDetails} onHide={()=>{setShowTransactionModel(false)}}></UserTransaction>
            </div>
        </div>
        <div>
            <TransactionDetails userTransDetails={userTransaction}></TransactionDetails>
        </div>
    </div>)
}

export default Wallet;