import React ,{useState, useEffect, useContext} from "react";
import { MdOutlineVerified } from "react-icons/md";
import { TbSend ,VscChromeClose} from "react-icons/ri";
import { AiFillLock,AiFillUnlock } from "react-icons/ai";
import Image from 'next/image';
import  {ToDolistContext}  from "../context/ToDolistApp"; 
import Style from '../styles/index.module.css';



const Home = () => {
  const {checkIfWalletIsConnect,
    connectWallet, 
    getToDoList,
    toDoList,
    change,
    currentAccount,
    error,
    allToDolist,
    myList,
    allAddress,
  } = useContext(ToDolistContext);

  useEffect(()=>{
    checkIfWalletIsConnect();
    
  },[]);
  return
  ( <div clasName={Style.home}>
    <div className={Style.navBar}></div>
    <h1>Welcome To Do List</h1>
    <button onClick={()=>connectWallet()}> Connect Wallet </button>
    : (
      < button> {currentAccount.slice(0, 20))...</button>
    )
    
  </div>
  )
};

export default Home;