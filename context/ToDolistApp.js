import React, {Children, useEffect, useState} from "react";
import Web3modal from "web3modal";
import {ethers} from "ethers";
import {toDolistAddress,toDolistABI} from "./constants";
const fetchContact =(signerOrProvider) => 
 new ethers.Contract(toDolistAddress,toDolistABI,signerOrProvider);
 export const ToDolistContext = React.createContext();
 export const ToDolistProvider = ({children}) => {
    const [currentAccount,setCurrentAccount] = useState('');
    const [error,setError] =useState('');
    const [allToDolist,setAllToDoList] = useState([]);
    const [myList,setMyList] = useState([]);
    const [allAddress,setAllAddress] = useState([]);
    //--Connecting metamask
    const checkIfWalletIsCoonect = async()=>{
        if(!window.ethereum) return setError("{Please install metamask");
        const account =await window.ethereum.request({method:"eth_accounts"});
        if(account.lenght){
            setCurrentAccount(account[0]);
            console.log(account[0]);
        }else{
            setError("Please install metamask & connect,Reload");
        }
    };
    useEffect(()=>{
        checkIfWalletIsCoonnect();
    })



    return(
        <ToDolistContext.Provider value={{}}>
            {children}
        </ToDolistContext.Provider>
    )
 }


const ToDolistApp =() => {
    return (
        <div>ToDolistApp</div>
    )

}
export default ToDolistApp