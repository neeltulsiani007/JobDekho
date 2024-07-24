// ProfileForm.js
import React, { Fragment } from 'react'
import { useState,useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { ToastContainer, toast } from 'react-toastify';
import { getApp } from "firebase/app";
import {v4} from "uuid"
import {ref, uploadBytes , getDownloadURL, getStorage} from "firebase/storage";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Logo from './def.png'
import baseUrl from '../baseUrl';


function InternProfileTemplate(){

  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [showuploadtick,setShowuploadtick] = useState(false)
  const[loading , setLoading] = useState(true)
  const [photo,setPhoto] = useState("");
  const [display,setDisplay] = useState("");
  const [imageupload,setImageupload] = useState("");
  const[email,setEmail] = useState("");
  const [bio,setBio] = useState("");
  const[age,setAge] = useState("");
  const[state,setState] = useState("");
  const[city,setCity] = useState("");
  const[zipcode,setZipcode] = useState("");
  const[skills,setSkills] = useState([]);
  const[skillsslice,setSkillsslice] = useState("");
  const[username,setUsername] = useState("");
  const[dob,setDob] = useState("");
  const[country,setCountry] = useState("");
  const[gender,setGender] = useState("");
  const[contact,setContact] = useState();
  const [user,setUser] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [update,setUpdate] = useState(true);
  const [listexp,setListexp] = useState({});
  const [listedu,setListedu] = useState({});
  const [modalopen,setModalOpen] = useState(false);
  const [modalopenedu,setModalOpenEdu] = useState(false);
  const [modalopenexp,setModalOpenExp] = useState(false);
  const [modalopeneduadd,setModalOpenEduAdd] = useState(false);
  const [modalopenexpadd,setModalOpenExpAdd] = useState(false);
  const [degree , setDegree] = useState("");
  const [location , setLocation] = useState("");
  const [role , setRole] = useState("");
  const [company , setCompany] = useState("");
  const [modalopenskills , setModalOpenSkills] = useState(false);



  var firebaseConfig = {
    apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
    authDomain: "otp-function-f1bf6.firebaseapp.com",
    projectId: "otp-function-f1bf6",
    storageBucket: "otp-function-f1bf6.appspot.com",
    messagingSenderId: "158018589085",
    appId: "1:158018589085:web:9e919de6ca149332215f74"
  };

 var storage = getStorage(getApp(), "gs://otp-function-f1bf6.appspot.com");

  useEffect(() => {

    
const getuserprofile = async()=>{
   await axiosPrivate.get("http://localhost:4000/getuserprofile",
   {
    withCredentials:true
   }).then((response) =>{
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
      setSkills(response.data.recordset[0].skills.split(","))
      setSkillsslice(response.data.recordset[0].skills)

      

    }); 
}
const getuserexperience = async()=>{
    await axiosPrivate.get("http://localhost:4000/getinternexperience",
    {
     withCredentials:true
    }).then((response) => {
       console.log(response.data.recordset);
        setListexp(response.data.recordset)
        if(response.data.recordset)
        setBio(response.data.recordset[response.data.recordset.length-1])
     }); 
 }

 const getusereducation = async()=>{
    await axiosPrivate.get("http://localhost:4000/getinterneducation",
    {
     withCredentials:true
    }).then((response) => {
      console.log("in gue")
      console.log(response.data.recordset)
        setListedu(response.data.recordset)
     }); 
 }

getuserprofile();
getuserexperience();
getusereducation();
setLoading(false);
  },[axiosPrivate]);


  

   

   const handleFileChange = async(e)=>{

        setLoading(false)
        setShowuploadtick(true)
        console.log(storage)
        console.log(e.target.files[0])
        setPhoto(e.target.files[0])
        console.log(e.target.files[0].name)
        setDisplay(e.target.files[0].name)
        setImageupload(e.target.files[0])
        const imageRef = ref(storage,`images/${e.target.files[0].name + v4()}`);
        await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
        setImageupload(url);
       
          });
        });
        setLoading(true);
      }

      const handleFileSubmit = async(e)=>{
        e.preventDefault();
  
        if(!photo){
          toast.error("File is required")
        }
        else{

         const config = {
            headers:{
                "Content-Type":"multipart/form-data",
                withCredentials:true
            }
         }
         const res = await axiosPrivate.post(`${baseUrl}/updateinternphoto`,{
            photo:photo,
         },config);
          console.log(res)
         if(res.data.success === false)
         {
            toast.error('Update failed ! Try again', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
         }
         else
         {
            toast.success('Profile Photo updated!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                
         }
        }
        setShowuploadtick(false)
       }


  



   const handleExperienceSubmit = async(e)=>{
    
    e.preventDefault();

    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
    if(role && company){
    const response =  await axiosPrivate.post("http://localhost:4000/postexperience",{
   experience:role,
   location:company,
   },config)


   const obj = {usernumber:contact , experience:role , location:company}
   listexp?.push(obj);
   setRole("");
   setCompany("");
   toast.success('Profile Updated !', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
   setModalOpenExpAdd(false)
    }
    else
    {
        toast.error('Enter Experience', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setModalOpenExpAdd(false)
    }
   }

   const handleEducationSubmit = async()=>{
    

    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
    if(degree && location){
    const response =  await axiosPrivate.post("http://localhost:4000/posteducation",{
   education:degree,
   location,

   },config)

   const obj = {usernumber:contact , education:degree,location:location}
   listedu.push(obj);
   setDegree("");
   setLocation("");
   toast.success(' Profile updated!', {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
   setModalOpenEduAdd(false)
    }
    else
    {
        toast.error('Enter Education Details',{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setModalOpenEduAdd(false)
    }
   }
 
  

   
   const handleReset = (e)=>{
    console.log("in handlereset")
    e.preventDefault()
    setCountry("");
    setState("");
    setZipcode("");
    setCity("");
   }

   const handleEduCancel = (e)=>{
    e.preventDefault()
    setDegree("");
    setLocation("");
   }

   const handleExpCancel = (e)=>{
    e.preventDefault()
    setCompany("");
    setRole("");
   }

   const handleSkillsCancel = (e)=>{
    e.preventDefault()
    setSkillsslice("");
   }
  

   const handleUpdate = async(e)=>{

    e.preventDefault();

    
     
    const config = {
        headers:{ 
            'Content-Type': 'application/x-www-form-urlencoded',
            withCredentials:true
        }
     }
    console.log(gender,username,skills,dob)
    console.log(username?username:user.name)
    console.log(age?age:user.age)
    const response =  await axiosPrivate.post("http://localhost:4000/updateinternprofile",{

        name:username?username:user.name,
        age:age?age:user.age,
        city:city?city:user.city,
        skills:skillsslice?skillsslice:user.skills,
        country:country?country:user.country,
        gender:gender?gender:user.gender,
        zipcode:zipcode?zipcode:user.zipcode,
        state:state?state:user.state,
        dob:dob?dob:user.dob,
        contact:contact?contact:user.contact

       },config)
       if(response.data.success === true)
       {
         toast.success(' Profile updated!', {
           position: "top-center",
           autoClose: 1500,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           });
       }
       else
       {
         toast.error('Update failed ! Try again', {
           position: "top-center",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
           });
       }
       user.name = username?username:user.name;
       user.age = age?age:user.age;
       user.skills = skills?skills:user.skills;
       user.email = email?email:user.email;
       user.city = city?city:user.city;
       user.country = country?country:user.country;
       user.state = state?state:user.state;
       user.gender = gender?gender:user.gender;
       user.zipcode = zipcode?zipcode:user.zipcode;
       user.dob = dob?dob:user.dob;
       setSkills(skillsslice.split(","))
       setUpdate(true) 
   }

  return (

    <div className="  bg-gray-100 flex pt-14  justify-center px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-7xl   w-full bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-gray-300">
     
     {/* Modal */}
      <div id="default-modal" tabindex="-1"  class={`${!modalopen && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative  p-4 w-full max-w-2xl max-h-full">

        <div class="relative  bg-white rounded-lg shadow  pb-3" >
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Skills
                </h3>
                <button 
                onClick={()=>{setModalOpen(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg 
                    class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {skills?.length
                ?(
                    <ul className='  text-lg my-5 space-y-6 items-center justify-center'>
                        {skills.map((x, i) =>
                        <li className='items-center justify-center'>{x}</li>)}
                    </ul>
                ): <p></p>
            }
        </div>
    </div>
</div>

{/* Modal End */}

{/* Modal Edu Form */}

<div id="default-modal" tabindex="-1"  class={`${!modalopeneduadd && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative  p-4 w-full max-w-2xl max-h-full">
    
        <div class="relative bg-white rounded-lg shadow ">
     
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Add Education
                </h3>
                <button
                onClick={()=>{setModalOpenEduAdd(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
         
            <div class="p-4 md:p-5 space-y-4 ">
         
                <label htmlFor="gender" className="flex text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
             
                  type="text"
                  required
                  value = {degree}
                  onChange={(e)=>{setDegree(e.target.value)}}
                  className=" block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter degree"
                />
             
                <label htmlFor="gender" className="flex text-sm font-medium text-gray-700">
                  Location
                </label>
                <input

                  type="text"
                  required
                  value = {location}
                  onChange={(e)=>{setLocation(e.target.value)}}
                  className=" block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter location"
                />
            
            </div>
            
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                onClick={handleEducationSubmit}
                 type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
                <button  
                onClick={handleEduCancel}
                type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel</button>
            </div>
        </div>
    </div>
</div>

{/* Modal Edu Form End */}

{/* Modal Skills Form */}

<div id="default-modal" tabindex="-1"  class={`${!modalopenskills && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative  p-4 w-full max-w-2xl max-h-full">
    
        <div class="relative bg-white rounded-lg shadow ">
     
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Add Skills
                </h3>
                <button
                onClick={()=>{setModalOpenSkills(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
         
            <div class="p-4 md:p-5 space-y-4 ">
         
                <label htmlFor="gender" className="flex text-sm font-medium text-gray-700">
                  Skills
                </label>
                <input
             
                  type="text"
                  required
                  value = {skillsslice}
                  onChange={(e)=>{setSkillsslice(e.target.value)}}
                  className=" block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter skills"
                />
             
            
            </div>
            
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                onClick={handleUpdate}
                 type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
                <button  
                onClick={handleSkillsCancel}
                type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel</button>
            </div>
        </div>
    </div>
</div>

{/* Modal Skills Form End */}

{/* Modal Exp Form */}

<div id="default-modal" tabindex="-1"  class={`${!modalopenexpadd && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative  p-4 w-full max-w-2xl max-h-full">
    
        <div class="relative bg-white rounded-lg shadow ">
     
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Add Experience
                </h3>
                <button
                onClick={()=>{setModalOpenExpAdd(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
         
            <div class="p-4 md:p-5 space-y-4 ">
         
                <label htmlFor="gender" className="flex text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
             
                  type="text"
                  required
                  value = {role}
                  onChange={(e)=>{setRole(e.target.value)}}
                  className=" block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter degree"
                />
             
                <label htmlFor="gender" className="flex text-sm font-medium text-gray-700">
                  Company
                </label>
                <input

                  type="text"
                  required
                  value = {company}
                  onChange={(e)=>{setCompany(e.target.value)}}
                  className=" block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter location"
                />
            
            </div>
            
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                onClick={handleExperienceSubmit}
                 type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
                <button  
                onClick={handleExpCancel}
                type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel</button>
            </div>
        </div>
    </div>
</div>

{/* Modal Exp Form End */}


    {/* Modal education */}
    <div id="default-modal" tabindex="-1"  class={`${!modalopenedu && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative p-4 w-full max-w-2xl max-h-full">

        <div class="relative bg-white rounded-lg shadow  pb-3" >
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Education
                </h3>
                <button 
                onClick={()=>{setModalOpenEdu(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg 
                    class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {listedu?.length
                ?(
                    <ul className='  text-lg my-5 space-y-6 items-center justify-center'>
                        {listedu.map((x, i) =>
                        <li className='items-center justify-center'>{x.education + " , "+x.location}</li>)}
                    </ul>
                ): <p></p>
            }
        </div>
    </div>
</div>

{/* Modal End */}

    {/* Modal Experience */}
    <div id="default-modal" tabindex="-1"  class={`${!modalopenexp && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative p-4 w-full max-w-2xl max-h-full">

        <div class="relative bg-white rounded-lg shadow  pb-3" >
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900 ">
                    Experience
                </h3>
                <button 
                onClick={()=>{setModalOpenExp(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-hide="default-modal">
                    <svg 
                    class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            {listexp?.length
                ?(
                    <ul className='  text-lg my-5 space-y-6 items-center justify-center  w-full'>
                        {listexp.map((x, i) =>
                        <li className='items-center justify-center'>{x.experience + " at "+x.location}</li>)}
                    </ul>
                ): <p></p>
            }
        </div>
    </div>
</div>

{/* Modal End */}

        {/* Left Part: Cover Photo and Skills */}
        <div className={`lg:col-span-2 flex flex-col items-center lg:items-start space-y-6 border-r border-gray-300 pr-6`}>
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="relative">
               {imageupload?
                <LazyLoadImage
                effect='blur'
                src={imageupload}    
                class="h-36 w-36 rounded-full" alt="" /> 
                :
                <LazyLoadImage
                effect='blur'
                 src={user.profilephoto?user.profilephoto:Logo} 
                 class="h-36 w-36 rounded-full  border-black"  alt="" /> 
               }
              <label htmlFor="filePicker" className="absolute bottom-0 cursor-pointer right-0 bg-gray-200 p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-300">
              <svg
              className={`${showuploadtick && "hidden"}  w-5 h-5`}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="edit"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
              <svg 
              onClick={handleFileSubmit}
              className={`${!showuploadtick && "hidden" }  w-5 h-5`}
              xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z"></path>
                </svg>
              </label>
              <input id="filePicker" style={{display:"none"}} type={"file"} onChange={handleFileChange}></input>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
               <p className="text-sm text-gray-600">{bio?bio.experience:"New User"}</p> 
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center mb-2 justify-between">
              <label htmlFor="skills" className=" text-lg font-medium text-gray-700 flex items-center">
                Skills
                <button 
                onClick={()=>{setModalOpenSkills(true)}}
                className="ml-2 text-gray-500 hover:text-gray-700">
                <svg 
                className='w-4 h-4'
                xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="edit"><path d="M12.82373,12.95898l-1.86279,6.21191c-0.1582,0.52832-0.01367,1.10156,0.37646,1.49121c0.28516,0.28516,0.66846,0.43945,1.06055,0.43945c0.14404,0,0.28906-0.02051,0.43066-0.06348l6.2124-1.8623c0.23779-0.07129,0.45459-0.2002,0.62988-0.37598L31.06055,7.41016C31.3418,7.12891,31.5,6.74707,31.5,6.34961s-0.1582-0.7793-0.43945-1.06055l-4.3501-4.34961c-0.58594-0.58594-1.53516-0.58594-2.12109,0L13.2002,12.3291C13.02441,12.50488,12.89551,12.7207,12.82373,12.95898z M15.58887,14.18262L25.6499,4.12109l2.22852,2.22852L17.81738,16.41113l-3.18262,0.9541L15.58887,14.18262z"></path><path d="M30,14.5c-0.82861,0-1.5,0.67188-1.5,1.5v10c0,1.37891-1.12158,2.5-2.5,2.5H6c-1.37842,0-2.5-1.12109-2.5-2.5V6c0-1.37891,1.12158-2.5,2.5-2.5h10c0.82861,0,1.5-0.67188,1.5-1.5S16.82861,0.5,16,0.5H6C2.96729,0.5,0.5,2.96777,0.5,6v20c0,3.03223,2.46729,5.5,5.5,5.5h20c3.03271,0,5.5-2.46777,5.5-5.5V16C31.5,15.17188,30.82861,14.5,30,14.5z"></path></svg>
                </button>
              </label>
            </div>
            {skills?.length
                ?(
                    <ul className='md:list-disc font-medium text-base pl-5'>
                        {skills.slice(0,3).map((x, i) =>
                        <li className='pr-16'>{x.trim()}</li>)}
                    </ul>
                ): <p></p>
            }
          </div>
          <div className="flex justify-end items-center">
              <span
               onClick={()=>{setModalOpen(true)}}
              className="text-blue-500 hover:text-blue-800 hover:underline cursor-pointer text-xs">See all</span>
              <button className="ml-2 text-gray-500 hover:text-gray-700">
              </button>
            </div>
          <div className="w-full mt-7">
            <button className="w-full bg-blue-700 text-white text-sm py-4 px-4 rounded-md hover:bg-blue-800">
              Upload Resume
            </button>
          </div>
        </div>

        {/* Middle Part: Form Details */}
        <div className="lg:col-span-7 space-y-6 border-r border-gray-300 pr-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">About</h3>
          <form className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="flex text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                 disabled
                  id="name"
                  name="name"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.name}
                />
              </div>
              <div>
                <label htmlFor="contactNo" className="flex text-sm font-medium text-gray-700">
                  Contact No.
                </label>
                <input
                onChange={(e)=>{setContact(e.target.value)}}
                disabled
                  id="contactNo"
                  name="contactNo"
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.number?user.number:"Enter your contact number"}
                />
              </div>
              
              <div>
                <label htmlFor="gender" className="flex text-sm font-medium text-gray-700">
                  Gender
                </label>
                <input
                value={gender}
                onChange={(e)=>{setGender(e.target.value)}}
                  id="gender"
                  name="gender"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.gender?user.gender:"Enter gender"}
                />
              </div>
              <div>
                <label htmlFor="country" className="flex text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                onChange={(e)=>{setCountry(e.target.value)}}
                  id="country"
                  value={country}
                  name="country"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.country?user.country:"Enter your country"}
                />
              </div>
              <div>
                <label htmlFor="email" className="flex text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                disabled
                  id="email"
                  name="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.email}
                />
              </div>
              <div>
                <label htmlFor="dob" className="flex text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                onChange={(e)=>{setState(e.target.value)}}
                  id="dob"
                  value={state}
                  name="dob"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.state?user.state:"Enter your state"}
                />
              </div>
              
              <div>
                <label htmlFor="state" className="flex text-sm font-medium text-gray-700">
                Date of Birth
                </label>
                <input
                 value={dob}
  
                 onChange={(e)=>{setDob(e.target.value)}}
                  id="state"
                  name="state"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.dob?user.dob:"Enter date of birth"}
                />
              </div>
            
              <div>
                <label htmlFor="zipcode" className="flex text-sm font-medium text-gray-700">
                City
                </label>
                <input
                 onChange={(e)=>{setCity(e.target.value)}}
                  id="zipcode"
                  name="zipcode"
                  value={city}
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.city?user.city:"Enter your city"}
                />
              </div>
              <div>
                <label htmlFor="posts" className="flex text-sm font-medium text-gray-700">
                  Number of Posts
                </label>
                <input
                disabled
                  id="posts"
                  name="posts"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.numberofposts}
                />
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                  Zipcode
                </label>
                <input
                onChange={(e)=>{setZipcode(e.target.value)}}
                  id="peers"
                  value={zipcode}
                  name="peers"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={user.zipcode?user.zipcode:"Enter your zipcode"}
                />
              </div>
              <div>
                <button
                  id="peers"
                  name="peers"
                onClick={handleUpdate}
                  className="mt-3 block w-full text-white bg-blue-700 px-3 py-2 rounded-lg  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                > Save
                </button>
              </div>
              <div>
                <button
                  id="peers"
                  name="peers"
                    onClick={handleReset}
                  className="mt-3 block w-full px-3 py-2 rounded-lg text-white bg-gray-500  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                > Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Part: Education and Experience */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          <div className=" pr-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              Education
              <button className="ml-2 text-gray-500 hover:text-gray-700">
              <svg
              onClick={()=>{setModalOpenEduAdd(true)}}
              className='w-4 h-4'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="edit"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
              </button>
            </h3>
            <div className="space-y-4">
            {listedu?.length
                            ?(
                            <div className='space-y-4'>
                        {listedu.slice(0,2).map((exp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md">
                  <p className="font-semibold">{exp.education}</p>
                  <p className="text-gray-600">{exp.location}</p>
                </div>
              ))}
                         </div>
                            ): <div class="text-lg pb-2 text-gray-600 "> Education not specified. </div>
                        }
            </div>
            <div className="flex justify-end items-center  pt-4">
              <span
              onClick={()=>{setModalOpenEdu(true)}}
              className="text-blue-500 hover:text-blue-800 hover:underline cursor-pointer text-xs">See all</span>
              <button className="ml-2 text-gray-500 hover:text-gray-700">
               
              </button>
            </div>
          </div>

          <div className='border-t border-gray-400 '>
            <h3 className="text-lg mt-4 font-semibold text-gray-700 mb-4  flex items-center">
              Experience
              <button
              onClick={()=>{setModalOpenExpAdd(true)}}
              className="ml-2 text-gray-500 hover:text-gray-700">
              <svg
              className='w-4 h-4'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="edit"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
              </button>
            </h3>
            {listexp.length
                            ?(
                            <div className='space-y-4'>
                        {listexp.slice(0,2).map((exp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md">
                  <p className="font-semibold">{exp.experience}</p>
                  <p className="text-gray-600">{exp.location}</p>
                </div>
              ))}
                         </div>
                            ): <div class="text-lg pb-2 text-gray-600 "> Experience not specified. </div>
                        }
          
            <div className="flex justify-end items-center  pt-4">
              <span 
              onClick={()=>{setModalOpenExp(true)}}
              className="text-blue-500 hover:text-blue-800 hover:underline cursor-pointer text-xs">See all</span>
              <button className="ml-2 text-gray-500 hover:text-gray-700">
                
              </button>
            </div>
          </div>
        </div>
       
      </div>
    
    </div>
                      
  );
};

export default InternProfileTemplate;
