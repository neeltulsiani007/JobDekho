import React, { useState  ,useEffect} from "react";
import {SlLock,SlUser,SlHome,SlLogout} from "react-icons/sl"
import { AiOutlineMail,AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import Changepassword from "./Changepassword";
import NavbarIntern from "./InternProfileNavbar";



function Changepasswordsetting(){
  const menus = [
    { name: "Home", link: "/home", icon: SlHome ,id:"home"},
    { name: "Profile", link: "/internprofilesetting", icon: SlUser ,id:"profile"},
    { name: "Change Password", link: "/changepasswordsetting", icon: SlLock ,id:"changepassword"},
    { name: "Email Verification", link: "/emailverification", icon: AiOutlineMail , id:"emailverify"},
    { name: "Logout", link: "/logout", icon: SlLogout , id:"logout"},
   
  ];
  const [open, setOpen] = useState(false);

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
    document.getElementById("changepassword").style.backgroundColor = "rgb(17 24 39)"
    document.getElementById("changepassword").style.color = "white"
    document.getElementById("emailverify").style.backgroundColor = ""
    document.getElementById("emailverify").style.color = "rgb(156 163 175)"
    return () => {
      isMounted = false;
      controller.abort();
  }
  },[]);

  return (
    <div className=" font-sans ">
     
      <NavbarIntern />
      <div className=" text-xl w-full bg-gray-200 font-semibold">
       <Changepassword />
      </div>

    </div>
  );
};

export default Changepasswordsetting;