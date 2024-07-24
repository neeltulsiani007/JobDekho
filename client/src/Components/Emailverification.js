import React, {  useState,useEffect ,useRef } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ToastContainer , toast } from 'react-toastify';
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import baseUrl from '../baseUrl';

function Emailverification() {

    const [clicked,setClicked] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const [loading,setLoading] = useState(false);

    const[getotp,setotp] = useState("");
    const [user,setUser] = useState({});
    const[GotoOtppage,setGotoOtppage] = useState(false);
    const[verified , setVerified] = useState(false);
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


    var firebaseConfig = {
      apiKey: "AIzaSyB0jHNMjt5JhaiDMNY5zyVLemZ85IpsdxU",
      authDomain: "otp-function-f1bf6.firebaseapp.com",
      databaseURL: "https://otp-function-f1bf6-default-rtdb.firebaseio.com",
      projectId: "otp-function-f1bf6",
      storageBucket: "otp-function-f1bf6.appspot.com",
      messagingSenderId: "158018589085",
      appId: "1:158018589085:web:87b6692eadbf138d215f74"
    };
    


  

    useEffect(() => {

      const getuserprofile = async()=>{
          await axiosPrivate.get("http://localhost:4000/getuserprofile",
          {
           withCredentials:true
          }).then((response) => {
           console.log("user")
             console.log(response.data.recordset[0]);
             setUser(response.data.recordset[0]);
             setVerified(response.data.recordset[0].verified)
           }); 
       }
  
       getuserprofile();
  
      },[axiosPrivate]);

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


    const configurecaptcha = () => 
      {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                handleSubmit();
              },
              "expired-callback": () => {},
            });
        }
    }

  const handleSubmit = async () =>{
    
    configurecaptcha();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + user.number;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setGotoOtppage(true);
        //toast.success("OTP sent successfully!",{styles});
      })
      .catch((error) => {
        console.log(error);
      });
     
    }

   
  

 const handleOTPsubmit = (e)=>{
   e.preventDefault();
   console.log(otpfinal)
  window.confirmationResult
  .confirm(otpfinal)
  .then(async (res) => {
   handleSuccess();
   //toast.success("OTP Verified !",{styles})
   setVerified(true);
   setTimeout(() => {     
    setGotoOtppage(false);
  }, 3000);

  })
  .catch((err) => {
    console.log(err);
    alert("error")
  });
 }



    const handleSuccess = async()=>{

      // e.preventDefault();

      const res = await axiosPrivate.post(`${baseUrl}/sendemail`, {
        email:"neel",
      }, 
      {
        withCredentials:true
      });
      if(res.data.success)
        toast.success("OTP Verified !",{styles})
     }
    
    
    const handleClear = async(e)=>{
      e.preventDefault();
      setOtp1("")
      setOtp2("")
      setOtp3("")
      setOtp4("")
      setOtp5("")
      setOtp6("")
      setotp("")
      num1.current.focus()
  }

  return (

    
    <section class="bg-gray-200 ">
      <div id="recaptcha-container"></div>
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
      
        {/* Modal */}
        <div id="default-modal" tabindex="-1"  class={`${!GotoOtppage && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0  h-full`}>
    <div class="relative  p-4 w-full max-w-2xl max-h-full">

        <div class="relative  bg-white rounded-lg shadow  pb-3" >
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            
                <button 
                onClick={()=>{setGotoOtppage(false)}}
                type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                    <svg 
                    class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="relative bg-white px-6 pt-10 pb-9 mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Enter OTP</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a 6-digit code to your contact number </p>
        </div>
      </div>

      <div>
        <form action="" method="post">
          <div class="flex flex-col space-y-16">
            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-md">
              <div class="w-16 h-16 ">
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
              </div>
              <div class="w-16 h-16 ">
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
              </div>
              <div class="w-16 h-16 ">
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
              </div>
              <div class="w-16 h-16 ">
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
              </div>
              <div class="w-16 h-16 ">
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
              </div>
              <div class="w-16 h-16 ">
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
              </div>
            </div>

            <div class="flex flex-col space-y-10 w-full">
              <div>
                <button 
                onClick={handleOTPsubmit}
                class="items-center  justify-center text-center w-1/3 border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify 
                </button>
                <button class=" items-center justify-center text-center w-1/6 ">
                  
                </button>
                <button 
                onClick={handleClear}
                class=" items-center justify-center text-center w-1/3 border rounded-xl outline-none py-5 bg-gray-700 border-none text-white text-sm shadow-sm">
                  Clear
                </button>
              </div>

              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
        </div>
    </div>
</div>

{/* Modal End */}

      {verified ==="false"||!verified?
       <div class="flex flex-col items-center justify-center px-6  mx-auto h-[calc(91dvh)]">
      <div class="w-full p-6 bg-gray-100 rounded-lg shadow-xl
       md:mt-0 sm:max-w-lg  sm:p-8">
        <div class="md:flex hidden -mt-4 mb-2">
        <svg 
        className='mx-[180px] my-4 w-20 h-20'
        xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" id="phone"><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#86FC6F"></stop><stop offset="100%" stop-color="#0CD419"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="url(#a)"></circle><path fill="#FFF" d="M23.1179863,24.9844003 C22.7849875,25.1958537 22.3681546,25.2262713 22.0079863,25.0654003 C21.2939863,24.6694003 19.9919863,23.7244003 18.1859863,21.9184003 C16.3799863,20.1124003 15.3509863,18.7234003 14.9519863,18.0184003 C14.7911153,17.658232 14.8215329,17.2413991 15.0329863,16.9084003 L16.0709863,15.0904003 C16.4429863,14.4454003 16.5269863,14.0374003 16.1219863,13.4104003 L13.4549863,9.32740033 C12.6959863,8.12740033 12.3089863,8.18140033 11.6549863,8.48140033 C8.25298626,10.0294003 6.92398626,12.2194003 11.7509863,19.8424003 C13.0529863,21.8974003 17.0309863,26.2474003 20.4239863,28.4494003 C27.6899863,33.1684003 30.0809863,31.7494003 31.4999863,28.4494003 C31.7999863,27.7834003 31.9319863,27.3964003 30.7889863,26.6494003 L26.6609863,24.0244003 C26.0339863,23.6224003 25.7279863,23.5174003 25.0799863,23.8924003 L23.1179863,24.9844003 Z"></path></g></svg>
            </div>
          <h2 class=" text-center mb-3 text-2xl font-bold
           font-sans
           leading-tight tracking-tight text-gray-900 md:text-3xl ">
              Number Verification
          </h2>
            {clicked?
            <div class="text-cyan-900 text-lg font-sans mt-4">
            An OTP has been sent to your registered number !
            </div>
            :
            <div class="text-gray-500 text-lg font-sans mt-4 text-center">
            Thank you for signing up with JobDekho !
            </div>  
            }
            {clicked?
             <div
             class="text-cyan-900 text-lg font-sans  ">
             Enter OTP.
             </div>
             :
            <div
            class="text-gray-500 text-lg font-sans text-center">
            Click on the button below to verify your Contact Number.
            </div>
            }
             
            {clicked?
            <div></div>
            :
          <div class="mt-4">
            {!loading?
          <button 
            onClick={handleSubmit}
              class="w-full text-white bg-blue-700 hover:bg-[#002D74]
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              font-medium rounded-lg text-lg px-5 py-2 text-center">Click here</button>
              :
              <button type="button"
        class=" w-full  flex gap-2 text-center text-white bg-blue-700 items-center px-5 py-2 text-sm font-semibold leading-6  transition duration-150 ease-in-out  rounded-md shadow cursor-not-allowed hover:bg-indigo-400"
        disabled="">
        <svg class="w-5 h-5 mx-40 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <span class="-mx-40 text-lg">Loading...</span>
       
    </button>
            }
          </div>
            }


      </div>
  </div>
  :
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[calc(91dvh)] lg:py-20 ">
      <div class="w-full p-6 bg-gray-100 rounded-lg shadow-xl
       md:mt-0 sm:max-w-lg  sm:p-8">
        <div class="md:flex hidden -mt-4 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className='mx-[180px] my-4 w-20 h-20' viewBox="0 0 40 40" id="phone"><defs><linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%"><stop offset="0%" stop-color="#86FC6F"></stop><stop offset="100%" stop-color="#0CD419"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="url(#a)"></circle><path fill="#FFF" d="M23.1179863,24.9844003 C22.7849875,25.1958537 22.3681546,25.2262713 22.0079863,25.0654003 C21.2939863,24.6694003 19.9919863,23.7244003 18.1859863,21.9184003 C16.3799863,20.1124003 15.3509863,18.7234003 14.9519863,18.0184003 C14.7911153,17.658232 14.8215329,17.2413991 15.0329863,16.9084003 L16.0709863,15.0904003 C16.4429863,14.4454003 16.5269863,14.0374003 16.1219863,13.4104003 L13.4549863,9.32740033 C12.6959863,8.12740033 12.3089863,8.18140033 11.6549863,8.48140033 C8.25298626,10.0294003 6.92398626,12.2194003 11.7509863,19.8424003 C13.0529863,21.8974003 17.0309863,26.2474003 20.4239863,28.4494003 C27.6899863,33.1684003 30.0809863,31.7494003 31.4999863,28.4494003 C31.7999863,27.7834003 31.9319863,27.3964003 30.7889863,26.6494003 L26.6609863,24.0244003 C26.0339863,23.6224003 25.7279863,23.5174003 25.0799863,23.8924003 L23.1179863,24.9844003 Z"></path></g></svg>

            </div>
          <h2 class=" text-center mb-1 text-3xl font-bold
           font-sans
           leading-tight tracking-tight text-gray-900 md:text-3xl ">
              Number Verification
          </h2>
            {clicked?
            <div class="text-cyan-900 text-lg font-sans mt-4">
            An OTP has been sent to your registered number !
            </div>
            :
            <div class="text-gray-500 text-lg font-sans mt-4 text-center">
            Thank you for signing up with JobDekho !
            </div>  
            }
     
             <div
             class="text-cyan-900 text-lg font-sans text-center ">
             Your number has been verified !
             </div>
           
      </div>
  </div>
}
</section>


  )
}

export default Emailverification
