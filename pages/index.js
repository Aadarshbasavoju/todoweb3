import React ,{useState, useEffect, useContext} from "react";
import { MdOutlineVerified } from "react-icons/md";
import { TbSend ,VscChromeClose} from "react-icons/ri";
import { AiFillLock,AiFillUnlock } from "react-icons/ai";
import Image from 'next/image';
import  {ToDolistContext}  from "../context/ToDolistApp"; 
import Style from '../styles/index.module.css';
import Loading from '../loading.gif';


const Home = () => {
  const {checkIfWalletIsConnect, toDoList} = useContext(ToDolistContext);

  useEffect(()=>{
    checkIfWalletIsConnect();
    toDoList();
  },[]);
  return <div>Home</div>;
};

export default Home;