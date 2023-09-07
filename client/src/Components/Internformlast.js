import React from 'react'
import { Navigate } from 'react-router-dom';
import { useState , useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from '../baseUrl';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { stepNavbar } from '../assets/stepNavbar';
import Tab from '../assets/tab';
import background from './bgbig.svg'
import { useRef } from 'react';
import {BiParty} from 'react-icons/bi'
import { Button } from 'semantic-ui-react';

function Internformlast(){


    const dataFetchedRef = useRef(false);

    // const styles = {
    //   position: "top-center",
    //   autoClose: 1500,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored"
    // }

    const navigate = useNavigate();

       useEffect(() =>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        toast.success("Account Created !",{
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          })
    },[])


  
  return (
    <body class="max-h-screen">
  <section class="border-red-500 pt-12 bg-zinc-200 min-h-screen flex items-center justify-center">
  <ToastContainer
      position="top-center"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
   <div class="bg-white  flex  rounded-2xl h-[695px]  shadow-sm shadow-gray-400  lg:w-screen max-w-5xl">
      <div
      style={{ backgroundImage: `url(${background})` }}
      class="w-[30%] h-[695px]  shadow-black border-[1px]   bg-no-repeat bg-cover rounded-lg lg:block hidden ">
    
<div className="  w-full px-[10%] pt-28 items-center justify-center">
                {stepNavbar.map((step,index) => (
                  <div key={step.id}  
                  class=""
                  >
                    <Tab 
                      stepNo={step.stepNo}
                      title={step.title}
                      message={step.message}
                        state={index === 2 ? "active" : ""}
                    />
                  </div>
                ))}
              </div>
     
      </div>

      <div class="lg:w-[70%] px-5 h-full lg:pt-4 pt-4 flex flex-col items-center lg:justify-start    ">
              
            <div class="text-3xl font-semibold mt-40 lg:mt-36 flex">
            <BiParty class="mr-2 mt-[2px]" />
              <BiParty class="mr-2 mt-[2px]" />
                Congratulations!
                <BiParty 
                class="ml-2 mt-[2px]"
                />
                  <BiParty 
                class="ml-2 mt-[2px]"
                />
                </div>
            <div
            class="text-lg font-medium font-sans mt-16 lg:mt-20 flex"
            >Your account has been created successfully , you can now login with your credentials .</div>
            <div
            class="text-lg font-sans font-medium mt-14 lg:mt-20 flex"
            >Click on the button below to return to Login page . </div>
            <div class="mt-10">
                <button
                onClick = {()=>{navigate('/')}}
             class="hover:bg-blue-700 hover:text-white text-blue-700 border border-blue-700 hover:border-none w-48  bg-white rounded-lg p-3 font-semibold  cursor-pointer"
                >
                    Login
                </button>
            </div>    
     </div>
    </div>
    <footer class="bg-white w-screen dark:bg-gray-800  top-0 absolute  shadow ">
    <div class="w-full mx-auto w-screen-xl p-3   md:flex dark:text-gray-400 md:items-center md:justify-center">
 <span 
 onClick = {()=>{navigate('/')}}
 class="font-semibold text-lg cursor-pointer">JobDekho</span>
    </div>
</footer>
  </section>
  </body>
  )
 
}
export default Internformlast
