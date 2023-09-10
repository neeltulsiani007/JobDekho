import React, { useState } from 'react'
import NavbarIntern from './NavbarIntern'
import { useEffect } from 'react';
import { toast , ToastContainer} from 'react-toastify';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import firebase from 'firebase/compat/app';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import { Fragment } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import baseUrl from '../baseUrl';

function Videoform(){

    const [video,setVideo] = useState("");
    const [uploaded , setUploaded] = useState(false)
    const [caption , setCaption ] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const [loading,setLoading] = useState(false);
    const[uploadloading , setUploadLoading] = useState(false);
    const[uploadtext , setUploadText] = useState("Upload");
    const [videoupload,setVideoupload] = useState(false)
    const navigate = useNavigate();

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
  

    useEffect(() => {
     
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"
        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "rgb(156 163 175)"
        document.getElementById("projectsbutton").style.backgroundColor = ""
        document.getElementById("postbutton").style.color = "white"
        document.getElementById("postbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
      },[]);


      const styles = {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      }

   const handleFilechange = async(e)=>{
    setUploaded(true);
    setLoading(false)

    console.log(e.target.files[0])
    if(e.target.files[0].name.split('.').pop() !== 'mp4')
    {
      toast.error("Invalid Video")
      setUploaded(false);
    }
    else{
    setVideo(e.target.files[0])
    if (e.target.files[0].size > 10e6) {
        toast.error("Please upload a file smaller than 10 mb",styles);
        setVideo("");
      }
      else 
      {

        const imageRef = ref(storage,`videos/${e.target.files[0].name + v4()}`);
        await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
           getDownloadURL(snapshot.ref).then((url) => {
           setVideoupload(url);
           setLoading(true)
           setVideo(e.target.files[0])
           });
         });
      }
    }
   }

   const handleUpload = async(e)=>
   {
    console.log(video)
    e.preventDefault();
    setUploadLoading(true);
    setUploadText("Loading");
    if(!video){
        toast.error("File is required",styles)
        setUploadLoading(false);
        setUploadText("Upload");
      }
      else{
      console.log(video)
       const config = {
          headers:{
              "Content-Type":"multipart/form-data",
              withCredentials:true
          }
       }
       const res = await axiosPrivate.post(`${baseUrl}/internvideo`,{
          video:video?video:video,
          caption:caption,
       },config);
    console.log(res)
       if(res.data.success === false)
       {
        setUploadLoading(false);
        setUploadText("Upload");
        toast.error("Post Failed ! Try again ")
       }
       else
       {
        navigate("/home")
       }
      }
   }


  return (
     <div className='relative h-screen font-sans' >
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
    <NavbarIntern />
      <div class=" flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8">

	<div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
		<div class="text-center">
			<h2 class="mt-5 text-3xl font-bold text-gray-900">
			New Post!
			</h2>
			<p class="mt-2 text-sm text-gray-400">Upload Video.</p>
		</div>
        <form class="mt-8 space-y-3"  method="POST">
                    <div class="grid grid-cols-1 space-y-2">
                        <label class="text-sm font-bold text-gray-500 tracking-wide">Caption</label>
                            <input class="text-base p-2 border
                             border-gray-300 rounded-lg focus:outline-none
                              focus:border-indigo-500" type="text" 
                              value={caption}
                              onChange={(e)=>{setCaption(e.target.value)}}
                              placeholder="Enter Caption here ..." />
                    </div>
                    <div class="grid grid-cols-1 space-y-2">
                                    <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Video</label>
                        <div class="flex items-center  justify-center w-full">
                          {!uploaded?
                            <label class=" flex cursor-pointer flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div class={`h-full w-full text-center flex ${!uploaded && "flex-col"}  justify-center items-center `}>

                                    {!uploaded?
                            <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10 text-blue-400
                            group-hover:text-blue-600" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                      :
                                      <div></div>
                                        }
                                    {!uploaded?
                                    <div class="flex flex-auto  w-2/5 mx-auto -mt-10">
                                    <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                                    <span class="text-sm px-3 text-gray-500">No files selected</span>
                                    </div>
                                    :
                                    <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-6">
                                      
                                      <Fragment>
                        <ThreeDots
                        height="80" 
                        width="80" 
                        radius="9"
                        color="gray" 
                        ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            marginTop:"70px",
                          marginLeft:"40%",
                          marginBottom:"10px"
                        }}
                      />
                        </Fragment>
                                
                                    </div>
                                    }
                                      <p class={`pointer-none text-gray-500 text-lg ${uploaded && "hidden"} `}><span class="text-lg">Drag and drop files here <br /> or <span id="" class="  text-lg">select a file</span> </span>from your computer</p>
                                    {/* {!uploaded?
                                    <p class="pointer-none text-gray-500 text-lg "><span class="text-lg">Drag and drop files here <br /> or <span id="" class="  text-lg">select a file</span> </span>from your computer</p>
                                    :
                                    <p class="pointer-none  text-lg text-black "><span class="text-lg  ">File has been selected <br /> <span id="" class=" text-lg font-semibold">Click on Upload</span> </span>to Post </p>
                                } */}
                                    </div>
                                <input type="file" name='video' class="hidden" onChange={handleFilechange} />
                            </label>
                            :
                            <div class={`flex cursor-pointer flex-col rounded-lg  ${!loading && "border-dashed border-4"} w-full h-60  group text-center`}>
                            {!loading?
                             <Fragment>
                        <ThreeDots
                        height="80" 
                        width="80" 
                        radius="9"
                        color="gray" 
                        ariaLabel="three-dots-loading"
                          wrapperStyle={{
                            marginTop:"70px",
                          marginLeft:"40%",
                          marginBottom:"10px"
                        }}
                      />
                        </Fragment>
                        :
                        <video 
                        src={videoupload}
                        class = "object-cover  min-w-full min-h-full"
                        >
                        </video>
                            
                            }
                            </div>
                              }
                        </div>
                    </div>
                            <p class="text-sm text-gray-300">
                                <span>File type: mp4 (size less than 10 mb)</span>
                            </p>
                    <div>
                        <button type="submit"
                        onClick={handleUpload}
                         class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-2 rounded-full tracking-wide
                          font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        {uploadtext}
                        <svg aria-hidden="true" class={`w-5 h-5 ml-[7px] mt-[2px]  ${!uploadloading && "hidden"}  text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                    </button>
                    </div>
        </form>
	</div>
</div>
</div>
  )
}

export default Videoform
