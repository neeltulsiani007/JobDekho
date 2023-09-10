import React, { useState } from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NavbarIntern from './NavbarIntern'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { toast , ToastContainer} from 'react-toastify';
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import firebase from 'firebase/compat/app';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Fragment } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import baseUrl from '../baseUrl';

function Postform() {
  
  const[photo,setPhoto] = useState("")
    const [caption,setCaption] = useState("")
    const[loading,setLoading] = useState(true);
    const[loadersubmit , setLoadersubmit]  = useState(false);
    const[imageupload,setImageupload] = useState(null);
    const[submittext , setSubmittext] = useState("Post");
   const axiosPrivate = useAxiosPrivate();
   var firebaseConfig = {
    apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
    authDomain: "otp-function-f1bf6.firebaseapp.com",
    projectId: "otp-function-f1bf6",
    storageBucket: "otp-function-f1bf6.appspot.com",
    messagingSenderId: "158018589085",
    appId: "1:158018589085:web:9e919de6ca149332215f74"
  };


  if (!firebase.apps.length) {
    console.log("in profile firebase1")
   firebase.initializeApp({firebaseConfig});
  }
   else{
    console.log(firebase.apps.length)
      firebase.app(); 
      console.log("in profile firebase2")   
   }
   const firebaseApp = getApp();
   const storage = getStorage(firebaseApp, "gs://otp-function-f1bf6.appspot.com");

  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById("homebutton").style.backgroundColor = ""
    document.getElementById("homebutton").style.color = "rgb(156 163 175)"
    document.getElementById("gethiredbutton").style.backgroundColor = ""
    document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
    document.getElementById("projectsbutton").style.backgroundColor = ""
    document.getElementById("postbutton").style.color = "white"
    document.getElementById("postbutton").style.backgroundColor = "rgb(17 24 39)"
    document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
  
    const getUsers = async () => {
      try {
          const response = await axiosPrivate.get('/users', {
              withCredentials:true
          });
          console.log(response)
        }catch(e){console.log(e)}
  }
      getUsers();
  },[axiosPrivate]);



    const handleChange = async(e)=>
    {
    
      setLoading(false)
      console.log(e.target.files[0])
      if(e.target.files[0].name.split('.').pop() === 'mp4')
      {
        toast.error("Invalid Image")
      }
      else{
        console.log("inside setphoto")
      setPhoto(e.target.files[0])
      if(e.target.files[0]){
      const imageRef = ref(storage,`images/${e.target.files[0].name + v4()}`);
      await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
         getDownloadURL(snapshot.ref).then((url) => {
         setImageupload(url);
         setLoading(true)
         });
       });
      }

    }
    
    }
 

    const handleCancel = (e)=>{
      e.preventDefault();
      setImageupload(null);
    }

   const handleSubmit = async(e)=>{
    setLoadersubmit(true);
    setSubmittext("Loading")
     e.preventDefault();
    if(!photo){
      toast.error("File is required")
      setLoadersubmit(false)
      setSubmittext("Post")
    }
    else{
    console.log(photo)
     const config = {
        headers:{
            "Content-Type":"multipart/form-data",
            withCredentials:true
        }
     }
     const res = await axiosPrivate.post(`${baseUrl}/internpost`,{
        photo:photo,
        caption:caption,
     },config);
  console.log(res)
     if(res.data.success === false)
     {
      toast.error("Post Failed ! Try again ")
      setLoadersubmit(false)
      setSubmittext("Post")
     }
     else
     {
      navigate("/home")
     }
    }
   }
   
  return (
    <div class="font-sans">   
        <NavbarIntern />
       <div class="flex flex-col items-center justify-center my-20">
       <ToastContainer 
         position='top-center'
         autoClose = '1500'
         />
<div class="heading text-center font-bold text-3xl m-5 text-gray-800 font-sans">New Post</div>

  <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <textarea 
    value={caption}
    onChange={(e)=>{setCaption(e.target.value)}}
    style={{resize:"none"}}
    class="description text-xl sec p-3 h20 border border-gray-300 outline-none" 
     placeholder="Enter caption here ...">
     </textarea>
     
     {!loading?
                    <div class="h-80 w-full    rounded-full mx-auto items-center justify-center pt-24 ">
                    <Fragment>
                                <div class="text-3xl font-semibold flex justify-center mt-5 w-full items-center text-center ">Loading 
               {/* <ThreeDots
                height="80" 
                width="80" 
                radius="9"
                color="gray" 
                ariaLabel="three-dots-loading"
                 wrapperStyle={{
                 marginLeft:"43%",
                 marginBottom:"10px"
                }}
              /> */}
               <svg aria-hidden="true" class={`w-10  h-10 ml-3   mt-1    text-gray-200 animate-spin dark:text-gray-400 fill-blue-900`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg></div>
                </Fragment>
                </div>
                :
     <div>
     {!imageupload?
      <div class="flex items-center justify-center w-full h-80 mt-4">
                <label class="flex cursor-pointer flex-col w-full h-80 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div class="flex flex-col items-center justify-center pt-7 ">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-20 h-20 mt-16 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo</p>
                    </div>
                    <input type="file" class="opacity-0"  onChange={handleChange} />
                </label>
            </div>
            :
          <div class="flex h-80 mt-4">
            <LazyLoadImage
            effect='blur'
            src={imageupload}
            class="flex cursor-pointer w-[700px]  h-80 border-2 rounded-md border-dashed object-cover "
            >
            </LazyLoadImage>
            </div>
     
    }
   </div>
}
    
    
    <div class="icons flex text-gray-500 m-1 items-end justify-end">
 
  
   
   <div class="buttons flex -mb-4">
      <div class="btn border border-gray-300 p-1 px-4 w-24 text-center text-xl my-3 h-10 font-semibold cursor-pointer hover:text-black hover:bg-gray-100 text-gray-500 ml-auto  "
      onClick={handleCancel}
      >Cancel</div>
      <div class="btn border flex border-blue-500 p-1 px-4   text-center text-xl my-3 h-10  font-semibold cursor-pointer text-white hover:bg-blue-700 ml-2 bg-blue-500" 
      onClick={handleSubmit}
      >{submittext}
      <svg aria-hidden="true" class={`w-5 h-5 ml-3 mt-1 ${!loadersubmit && "hidden"}  text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
      </div>
    </div>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Postform
