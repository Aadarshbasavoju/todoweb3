import React, { useEffect, useState} from "react";
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
    const checkIfWalletIsConnect = async()=>{
        if(!window.ethereum) return setError("{Please install metamask");
        const account =await window.ethereum.request({method:"eth_accounts"});
        if(account.lenght){
            setCurrentAccount(account[0]);
            console.log(account[0]);
        }else{
            setError("Please install metamask & connect,Reload");
        }
    };
    //--connect metamask wallet
    const connectWallet = async ()=> {
        if (!window.ethereum) return setError("please install metamask");

        const account = await window.ethereum.request({method: "eth_requestAccounts"});

        setCurrentAccount(account[0]);


    };

    //interacting with smart contract
    const toDoList = async(message)=>{
        try{
            const web3modal= new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContact(signer);
            const createList = await contract.createList(message);
            createList.wait();
            console.log(createList);

           
        }   catch(error){
            setError("Something wrong in list creation");
        }
    };
     const getToDoList = async()=>{
        try{
            const web3modal= new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContact(signer);

            //Get Data
            const getAllAddress =  await contract.getAddress();
            setAllAddress(getAllAddress);
            console.log(getAllAddress);

            getAllAddress.map(async(eL) =>{
                const getSingleData = await contract.getCreatorData(eL);
                allToDoList.push(getToDoList);
                console.log(getSingleData);
            
            });
            const allMessage = await contract.getMessage();
            setMyList(allMessage);

        }catch (error){
            setError("Somethong wrong getting Data");
        }
     };


     //CHANGE STATE OF TODOLIST TO FALSE TO TRUE
     const change= async(address)=>{
        try {
            const web3modal= new Web3modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.web3Provider(connection);
            const signer = provider.getSigner();
            const contract = await fetchContact(signer);

            const state = await contract.toggle(address);
            state.wait();
            console.log(change);
     }catch (error){
        setError("Somethong wrong changing Status");
        }
     }

    return(
        <ToDolistContext.Provider value={{
            checkIfWalletIsConnect,
             connectWallet, 
             getToDoList,
             toDoList,
             change,
             currentAccount,
             error,
             allToDolist,
             myList,
             allAddress,
            }}
             >
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