import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from '../baseUrl';
import axios from '../api/axios';
import { stepNavbar } from '../assets/stepNavbar';
import Tab from '../assets/tab';
import background from './bgbig.svg'
import  { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { ToastContainer , toast } from 'react-toastify';
import { UserContext } from '../context/UserProvider';
import { useContext } from 'react';

function Internformotpstep(){

    const[otp1,setOtp1] = useState("")
    const[otp2,setOtp2] = useState("")
    const[otp3,setOtp3] = useState("")
    const[otp4,setOtp4] = useState("")
    const[otp5,setOtp5] = useState("")
    const[otp6,setOtp6] = useState("")
    const[otpfinal,setOtpfinal] = useState("");
    const[gobacktoform,setGobacktoform] = useState(false);
    const num1 = useRef();
    const num2 = useRef();
    const num3 = useRef();
    const num4 = useRef();
    const num5 = useRef();
    const num6 = useRef();
    const[loading,setLoading] = useState(false);
    const[loadingresend,setLoadingResend] = useState(false);
    const {user,setUser} = useContext(UserContext)
     var res;

    const navigate = useNavigate();
 
    if(gobacktoform)
    {
      return <Navigate to="/internformlast" />
    }
    // const showToastMessage = () => {
    //     console.log("success called");
    //     toast.success('OTP verified!', {
    //       position: "top-center",
    //       autoClose: 1500,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //       });
    //       }

          // const showerrorMessage = () => {
          //   console.log("error toasted");
          //   toast.error('Incorrect OTP', {
          //     position: "top-center",
          //     autoClose: 1500,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     theme: "colored",
          //     });
          //   }

  const insertintern = async()=>{
    
    const res = await axios.post(`${baseUrl}/insertintern`, {
     name:user.name,
     age:user.age,
     number:user.number,
     city:user.city,
     email:user.email,
     password:user.password,
     skills:user.skills
     });
    }


  const handleSubmit = async(e)=> {
    e.preventDefault();
    console.log(user)
    setLoading(true)
    console.log(otpfinal)
    const code = otpfinal;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
    const usertemp = result.user;
    console.log(JSON.stringify(usertemp));
    //    res = await axios.post(`${baseUrl}/insertintern`, {
    //  name:name,
    //  age:age,
    //  number:number,
    //  city:city,
    //  email:email,
    //  password:password,
    //  skills:skills
    //  });
    insertintern();
 
      setGobacktoform(true)
    }).catch((error)=>{
      alert("Incorrect otp")
      console.log(error)
      // showerrorMessage();
    });
  }

  return (
    <body class="max-h-screen">
  <section class="border-red-500 pt-12 bg-zinc-200 min-h-screen flex items-center justify-center">
  {/* <ToastContainer
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
      /> */}
   <div class="bg-white   flex  rounded-2xl  shadow-sm shadow-gray-400 lg:w-screen  max-w-5xl">
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
                        state={index === 1 ? "active" : ""}
                    />
                  </div>
                ))}
              </div>
     
      </div>

      <div class="lg:w-[70%] px-5 h-full lg:pt-10 pt-10 lg:pb-0 pb-5 items-center justify-center ">
        {/* <div class>hello</div> */}
        <h2 class="lg:hidden text-2xl font-bold font-[Arial] text-[#002D74] mb-7">Verify OTP</h2>
        
        {/* <p class="text-sm mt-4 text-[#002D74]">Create an Intern Account !</p> */}
        <form onSubmit={handleSubmit} class="items-center lg:mt-16 justify-center">
      {/* <p class = "text-center mb-7  font-semibold ">Enter OTP</p> */}
      <div
      class="pb-14 text-lg font-semibold"
      >A 6 digit OTP has been sent to your mobile number . Please enter the OTP to verify your account .</div>
      <div
      class = "text-black text-xl  font-semibold"
      >Enter OTP</div>
      <div class="box-content p-5 w-auto h-auto  ">
         <div class="flex-col md:space-x-7 space-x-2 lg:space-y-7 space-y-4">       
          <input
            name="otp1"
            type="text"
            id="otp1"
            autoFocus={true}
            class="w-14 h-14 border-2 border-slate-900 text-center"
            autoComplete="off" 
            value={otp1}
            ref={num1}
            onChange={(e) =>{setOtp1(e.target.value);num2.current.focus()}}
            tabIndex="1" maxLength="1" 
          />
          <input
            id="otp2"
            name="otp2"
            class="w-14 h-14 border-2 border-slate-900 text-center"
            type="text"
            autoComplete="off"
            autoFocus={false}
            value={otp2}
            ref={num2}
            onChange={(e) =>{setOtp2(e.target.value);num3.current.focus()}}
            tabIndex="2" maxLength="1" 

          />
          <input

            name="otp3"
            class="w-14 h-14 border-2 border-slate-900 text-center"
            type="text"
            ref={num3}
            autoComplete="off"
            autoFocus={false}
            value={otp3}      
            onChange={(e) =>{setOtp3(e.target.value);num4.current.focus()}}
            tabIndex="3" maxLength="1" 

          />
          <input
            name="otp4"
            type="text"
            ref={num4}
            class="w-14 h-14 border-2 border-slate-900 text-center"
            autoComplete="off"
            autoFocus={false}
            value={otp4}
            onChange={(e) =>{setOtp4(e.target.value);num5.current.focus()}}
            tabIndex="4" maxLength="1"
          />

          <input
            name="otp5"
            type="text"
            ref={num5}
            autoComplete="off"
            autoFocus={false}
            class="w-14 h-14 border-2 border-slate-900 text-center"
            value={otp5}
            onChange={(e) =>{setOtp5(e.target.value);num6.current.focus()}}
            tabIndex="5" maxLength="1"
          />

        <input
            name="otp6"
            ref={num6}
            type="text"
            autoFocus={false}
            autoComplete="off"
            class="w-14 h-14 border-2 border-slate-900 text-center"
            value={otp6}
            onChange={(e) =>{setOtp6(e.target.value);setOtpfinal(otp1+otp2+otp3+otp4+otp5+e.target.value)}}
            tabIndex="6" maxLength="1"
          />
          
         <div>
         </div>
         <div class="flex items-center justify-center  pt-5 ">
         {!loading?
        <button id = "subbutton"
        onClick={handleSubmit}
        class="bg-blue-700 text-white w-48 mr-6 hover:bg-blue-900 rounded-lg p-3 font-semibold  cursor-pointer"
        >Submit</button>
        :
        <button type="button"   
        disabled={true}
        class="bg-blue-700 flex items-center mr-6 w-48 justify-center text-white hover:bg-blue-900 rounded-lg p-3 font-semibold  cursor-pointer"
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

        </div>
        </div>
        </div>
      </form>
      <div class="flex items-center justify-center text-lg font-semibold   pt-20 ">
            Didn't receive OTP ? , click below to resend OTP
          </div>
          <div class="flex items-center justify-center  pt-8 ">
         {!loadingresend?
        <button id = "subbutton"
        class="hover:bg-blue-700 hover:text-white text-blue-700 border border-blue-700 hover:border-none w-48  bg-white rounded-lg p-3 font-semibold  cursor-pointer"
        >Resend OTP</button>
        :
        <button type="button"   
        disabled={true}
        class="bg-blue-700 flex items-center w-48 justify-center text-white hover:bg-blue-900 rounded-lg p-3 font-semibold  cursor-pointer"
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
export default Internformotpstep