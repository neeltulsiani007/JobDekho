import React, { useEffect, useState } from "react";
import {SlLock,SlUser,SlHome,SlLogout} from "react-icons/sl"
import { AiOutlineMail,AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import InternProfiletemplate from "./InternProfiletemplate";
import NavbarIntern from "./InternProfileNavbar";


function InternProfilesetting(){

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

    document.getElementById("profile").style.backgroundColor = "rgb(17 24 39)"
    document.getElementById("profile").style.color = "white"
    document.getElementById("home").style.backgroundColor = ""
    document.getElementById("home").style.color = "rgb(156 163 175)"
    document.getElementById("logout").style.backgroundColor = ""
    document.getElementById("logout").style.color = "rgb(156 163 175)"
    document.getElementById("changepassword").style.backgroundColor = ""
    document.getElementById("changepassword").style.color = "rgb(156 163 175)"
    document.getElementById("emailverify").style.backgroundColor = ""
    document.getElementById("emailverify").style.color = "rgb(156 163 175)"
    return () => {
      isMounted = false;
      controller.abort();
  }
  },[]);


  return (
    <div className=" font-sans md:bg-gray-200 ">
      <NavbarIntern />
      <div className=" text-xl w-full bg-gray-300  font-semibold">
       <InternProfiletemplate/>
      </div>
    </div>
  );
};

export default InternProfilesetting;