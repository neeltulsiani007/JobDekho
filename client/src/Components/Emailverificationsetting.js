import React, { useEffect, useState } from "react";
import {SlLock,SlUser,SlHome,SlLogout} from "react-icons/sl"
import { AiOutlineMail,AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Emailverification from "./Emailverification";
import NavbarIntern from "./InternProfileNavbar";


function Emailverificationsetting(){
  
  

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();   
    console.log("object")

    document.getElementById("profile").style.backgroundColor = ""
    document.getElementById("profile").style.color = "rgb(156 163 175)"
    document.getElementById("home").style.backgroundColor = ""
    document.getElementById("home").style.color = "rgb(156 163 175)"
    document.getElementById("logout").style.backgroundColor = ""
    document.getElementById("logout").style.color = "rgb(156 163 175)"
    document.getElementById("changepassword").style.backgroundColor = ""
    document.getElementById("changepassword").style.color = "rgb(156 163 175)"
    document.getElementById("emailverify").style.backgroundColor = "rgb(17 24 39)"
    document.getElementById("emailverify").style.color = "white"
    return () => {
      isMounted = false;
      controller.abort();
  }
  },[]);
 


  return (
    <div className=" font-sans">
    <NavbarIntern />
    
      <div className=" text-xl w-full bg-gray-200 font-semibold">
       <Emailverification />
      </div>

    </div>
  );
};

export default Emailverificationsetting;