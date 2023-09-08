import React, { useContext } from 'react'
import { useState , useEffect} from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from '../baseUrl';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { stepNavbar } from '../assets/stepNavbar';
import Tab from '../assets/tab';
import background from './bgbig.svg'
import backgroundsmall from './bgsmall.svg'
import { UserContext } from '../context/UserProvider';



function Recruiterformmultistep1(){
  const[name,setName] = useState("");
  const [number,setNumber] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState("password");
  const [confirmpassword , setConfirmPassword] = useState("")
 const[loading , setLoading] = useState(false)
 const {user,setUser} = useContext(UserContext)

 var res;

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

    const navigate = useNavigate();



 const handleSubmit = async () =>{
  
    setLoading(true)
   if(validate(name,number,email,password,confirmpassword)){

   res = await axios.post(`${baseUrl}/checkinternexists`,{
     number:number,
     email:email,
     });
  
   if(res.data.success === false)
   {
     setLoading(false)
     toast.error("User already exists",{
       styles
     })
  }
  else if(res.data.success === true){
    setUser({
      name:name,
      number:number,
      email:email,
      password:password,
    })
    navigate('/recruitmentformmultistep2');
}
else{
  toast.error("Email failed !",{
    styles
  })
}
   }
   else
   {
    setLoading(false)
   }
 }
  

 const validate = (name,number,email,password,confirmpassword)=>{
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const regex2 = /^[0-9]{10}$/;
    var re = {
     capital: /(?=.*[A-Z])/,
     length: /(?=.{8,12}$)/,
     specialChar: /[ -\/:-@\[-\`{-~]/,
     digit: /(?=.*[0-9])/,
 };
   
    if(!name){
     toast.error("Name is required",{styles})
     return false
    }
    if(!number){
     toast.error("Number is required",{styles})
     return false
    }
    if(!email){
     toast.error("Email is required",{styles})
     return false
    }
    if(!password)
    {
     toast.error("Password is required",{styles})
     return false
    }
    if(password !== confirmpassword)
    {
        toast.error("Passwords dont match",{styles})
        return false
    }
    if(email){
    if(!regex.test(email))
    {
     toast.error("Invalid Email",{styles})
     return false
    }
   }
    if(number > 0){
    if(!regex2.test(number))
    {
     toast.error("Invalid Number",{styles})
     return false
    }
   }
    if(!re.capital.test(password))
   {
      toast.error("Use atleast one capital letter",{styles})
      return false
   }
    if(!re.length.test(password))
   {
      toast.error("Length must be between 8 and 12",{styles})
      return false
   }
    if(!re.specialChar.test(password))
   {
       toast.error("Use atleast one special character",{styles})
       return false
   }
    if(!re.digit.test(password))
   {
       toast.error("Use atleast one digit",{styles})
       return false
   }
   return true

 }
    
    const handlepassword = ()=>{
      if(showPassword === "password")
      {
        setShowPassword('text')
      }
      else
      {
        setShowPassword('password')
      }
    }
   
  return (
    <body class="max-h-screen">
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
         <nav className="block lg:hidden">
        <div className="bg-no-repeat bg-cover h-[15rem] flex items-center justify-center " 
            style={{backgroundImage: `url(${backgroundsmall})`}}
        >
            {stepNavbar.map((step,index) => (
              <div key={step.id}>
                <Tab
                  stepNo={step.stepNo}
                  title=""
                  message=""
                  state={index === 0 ? "active" : ""}
                />
              </div>
            ))}
        </div>
      </nav>
  <section class="border-red-500  -mt-16 lg:-mt-0 bg-zinc-200 min-h-screen lg:pt-12 lg:flex lg:items-center justify-center">
   <div class="bg-white   lg:flex   rounded-2xl  shadow-sm shadow-gray-400 lg:w-screen max-w-5xl">
      <div
      style={{ backgroundImage: `url(${background})` }}
      class="w-[22%] h-[695 px]  shadow-black border-[1px]   bg-no-repeat bg-cover rounded-lg lg:block hidden ">
    
<div className="  w-full px-[10%] pt-28 items-center justify-center">
                {stepNavbar.map((step,index) => (
                  <div key={step.id}  
                  class=""
                  >
                    <Tab 
                      stepNo={step.stepNo}
                      title={step.title}
                      message={step.message}
                        state={index === 0 ? "active" : ""}
                    />
                  </div>
                ))}
              </div>
      </div>

      <div class="lg:w-[78%] w-auto lg:pb-0 pb-4  px-5 h-full lg:pt-4 pt-4  ">
        <h2 class="text-2xl font-bold font-[Arial] text-[#002D74]">Registration</h2>
        {/* <p class="text-sm mt-4 text-[#002D74]">Create an Intern Account !</p> */}
        <div class="bg-white  rounded px-8 pt-6  mb-4 flex flex-col mt-2">
           <form>
            <div id="sign-in-button"></div>
         <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="flex uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2" for="grid-first-name">
        Name
      </label>
      <input
      value={name}
      onChange={(e)=>{setName(e.target.value)}}
      class="appearance-none placeholder:text-xs block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Enter First Name ..." />
    </div>
    <div class="md:w-1/2 px-3">
      <label class="flex uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2" for="grid-last-name">
        Company Name
      </label>
      <input 

      class="appearance-none placeholder:text-xs block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Enter Last Name ..." />
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="flex uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2" for="password">
     Password
      </label>
      <input 
      type = {showPassword}
      value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
      class="appearance-none placeholder:text-sm block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="password"  placeholder="********" />
    </div>
    <div class="md:w-1/2 px-3">
      <label class="flex uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2" for="grid-confirmpass">
      Confirm Password
      </label>
      <input
      type = {showPassword}
      value={confirmpassword}
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
      class="appearance-none block placeholder:text-sm w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-confirmpass"  placeholder="********" />
    </div>
  </div>
    <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="flex uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2" for="email">
       Email
      </label>
      <input 
      value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
      class="appearance-none block w-full placeholder:text-xs bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="email" type="text" placeholder="Enter E-mail ..." />
    </div>
    <div class="md:w-1/2 px-3 mb-6">
      <label class="flex uppercase tracking-wide text-grey-darker text-xs font-semibold mb-2" for="number">
        Mobile Number
      </label>
      <input 
      value={number}
        onChange={(e)=>{setNumber(e.target.value)}}
      class="appearance-none placeholder:text-xs block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="number" type="text" placeholder="Enter Mobile Number ..." />
    </div>
  </div>
  {!loading?
          <buttton 
          onClick={handleSubmit}
          id = "subbutton"
          class="bg-blue-700 w-full text-white flex items-center justify-center  hover:bg-blue-900 rounded-lg p-3 font-semibold  cursor-pointer"
        >Submit
        </buttton>

        :
        <button type="button"   
        disabled={true}
        class="bg-blue-700 flex items-center w-full justify-center text-white hover:bg-blue-900 rounded-lg p-3 font-semibold  cursor-pointer"
        > 
        Loading
        <svg class="w-6 h-5 mt-[3px] ml-[5px] text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
    </button>
          }
       </form>  
</div>
      </div>
    </div>
    <footer class=" w-screen bg-gray-800  top-0 absolute  shadow ">
    <div class="w-full mx-auto w-screen-xl p-3 md:flex text-gray-400 md:items-center md:justify-center">
 <span 
 onClick = {()=>{navigate('/')}}
 class="font-semibold text-lg cursor-pointer">JobDekho</span>
    </div>
</footer>
  </section>
  </body>
  )
 
}
export default Recruiterformmultistep1
