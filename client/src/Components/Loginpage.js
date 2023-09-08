import useAuth from '../hooks/useAuth'
import React from 'react'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import 'firebase/compat/auth';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseUrl from '../baseUrl';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


function Loginpage(){
    const[Gotohomepage,setGotohomepage] = useState(false);
    const[showPassword,setShowPassword] = useState("password")
    const[Gotorecruitpage,setGotorecruitpage] = useState(false);
    const[email,setEmail] = useState("")
    const[loading , setLoading] = useState(false)
    const[password,setPassword] = useState("")

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

    const { setAuth } = useAuth();
    const navigate = useNavigate();

  if(Gotorecruitpage)
  {
    return <Navigate to="/home" />
  }
    if(Gotohomepage)
  {
   return <Navigate to="/title" />
  }


  const validate = (email,password) =>{
     if(!email)
     {
      toast.error("Email is required",{styles})
      return false
     }
     if(!password)
     {
      toast.error("Password is required",{styles})
      return false
     }
     return true
  }
  
    const onSignInSubmit = async(e) =>
    {
      e.preventDefault();
      console.log("in osis")
      if ((validate(email,password))){
        setLoading(true)
        const res = await axios.post(`${baseUrl}/checkuserexists`,
          {
            email:email,
            password:password
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
        console.log(res.data);
        if (res.data.success === false){
         toast.error("Invalid E-mail or Password",{styles});
         setLoading(false);
        } else {
          // localStorage.setItem("user", JSON.stringify(res.data.user));
          const accessToken = res?.data?.accessToken;
          setAuth({ email, password , accessToken });
          if(res.data.typeuser === "intern"){
          setGotorecruitpage(true)
          }
          else
          {
            navigate('/recruiterhome')
          }
        }
      } 
    }

    
    const handlepassword = ()=>{
      if(showPassword === "password")
      {
        setShowPassword('text')
        document.getElementById("eye").style.display = 'none'
        document.getElementById("hiddeneye").style.display = 'flex'
      }
      else
      {
        setShowPassword('password')
        document.getElementById("eye").style.display = 'flex'
        document.getElementById("hiddeneye").style.display = 'none'
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
  <section class="border-red-500 bg-zinc-200 min-h-screen md:w-screen pt-12 flex items-center justify-center">
    <div class="bg-zinc-100 md:p-5 p-5 flex  rounded-2xl  shadow-md shadow-black md:max-w-4xl">
      <div class="lg:w-1/2 w-full px-5 h-full lg:pt-7 pt-4 ">
        <h2 class="text-3xl font-bold text-[#002D74]">Login</h2>
        <p class="text-sm mt-4 text-[#002D74]">If you have an account, please login</p>
        <form class="mt-9"  method="POST">
          <div>
            <label class="flex text-base font-sans font-semibold   text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            type="email" name="" id="email" placeholder="Enter E-mail ..." class="w-full border-[1px] border-zinc-400  px-4 py-3 rounded-lg bg-gray-100 mt-2 placeholder:text-sm  font-sans focus:border-blue-800 focus:bg-white focus:outline-none" autofocus autocomplete required />
          </div>

          <div class="mt-6">
            <label class="flex text-base font-sans font-semibold text-gray-700">Password</label>
            <input
             value={password}
             onChange={(e)=>{setPassword(e.target.value)}}
            type={showPassword} name="" id="password" placeholder="Enter Password ..." 
            minlength="6"
             class="w-full px-4 py-3 rounded-lg border-zinc-400 placeholder:text-sm placeholder:font-sans bg-gray-100 mt-2 border-[1px] focus:border-blue-800
                  focus:bg-white focus:outline-none" required />
                    <svg xmlns="http://www.w3.org/2000/svg"  onClick={handlepassword} id = "eye"
            fill="gray"
             class="bi bi-eye absolute cursor-pointer w-6 h-6  ml-[252px] lg:block hidden  lg:ml-[350px] -mt-[35px]"
             viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" id ="hiddeneye" style ={{display:'none'}}
            onClick={handlepassword} fill="currentColor" class="bi bi-eye-slash absolute hidden lg:block cursor-pointer -mt-[35px] w-6 h-6 ml-[252px]    lg:ml-[350px]" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
          </div>

          <div class="text-right mt-3">
            <a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
          </div>

          <button 
                  onClick={onSignInSubmit}
          type="submit" class="w-full flex items-center justify-center  bg-blue-800 hover:bg-[#002D74] focus:bg-blue-600 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">{`${loading?"Loading":"Login"}`}
          
                        <svg aria-hidden="true" 
                        class = {`w-6 h-6 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-white ${!loading&&"hidden"}`}
                        // class="w-6 h--6 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" 
                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>

                </button>
         
        </form>

        <div class="mt-7 grid grid-cols-3 items-center text-gray-500">
          <hr class="border-gray-500" />
          <p class="text-center text-sm">OR</p>
          <hr class="border-gray-500" />
        </div>
{/* 
        <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
          <span class = "ml-4">Login with Google</span>
        </button> */}

        <div class="md:text-base  flex text-xs items-center mt-4">
          <p>If you don't have an account...</p>
          <button
          onClick={()=>{setGotohomepage(true)}} 
          class="py-1 px-4 ml-3 md:ml-4 bg-white border rounded-xl hover:scale-110 duration-300 hover:text-white hover:bg-[#002D74] border-[#002D74]  ">Sign Up</button>
        </div>
      </div>

      <div class="w-1/2 lg:block hidden ">
        <img 
        class="rounded-lg h-[100%]"
       // src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VpdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
        src="https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" 
        />
      </div>

    </div>
    <footer class="bg-white w-screen dark:bg-gray-800  top-0 absolute  shadow ">
    <div class="w-full mx-auto w-screen-xl p-3 md:flex dark:text-gray-400 md:items-center md:justify-center">
 <span 
 onClick = {()=>{navigate('/')}}
 class="font-semibold text-lg cursor-pointer">JobDekho</span>
    
  
    </div>
</footer>
  </section>

  </body>
  )
 
}
export default Loginpage
