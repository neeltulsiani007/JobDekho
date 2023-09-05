import React from 'react'
import { useNavigate } from 'react-router-dom';
 

function Title()
{
const navigate = useNavigate();
  return (
    <div className = "page1"  class ="flex font-sans py-64 h-screen w-screen items-center justify-center  bg-no-repeat bg-cover bg-zinc-200">
    <br/> 
    <div class="box-content py-20 px-10  shadow-lg shadow-black lg:p-48   bg-zinc-50">
    <h3 id="title" class = " text-center md:text-4xl text-3xl font-bold">What are you looking for ?<br></br>
    </h3>
    <div class="flex-row md:flex-col my-4 space-y-10 space-x-7   md:space-x-44 ">
     <button id = "recruitbutton"
     class=" text-blue-800 hover:bg-blue-950 rounded-lg hover:text-white w-40 h-14 font-serif text-2xl border-2 border-neutral-900"
     onClick={() => {navigate('/Recruitmentform');}}>Recruitment</button>
     <button id = "button_intern" 
     class=" text-blue-900  hover:bg-blue-950 rounded-lg hover:text-white w-40 h-14 font-serif  text-2xl border-2 border-neutral-900"
      onClick={() => {navigate('/Internform');}}>Internship</button>
      </div>
      {/* <div class="flex-1 py-4 ">
     <p id = "alreadyuser"
     class="text-base text-center"
     >Already a user? <span id = "clicklogin" 
     class="  hover:underline hover:text-gray-500 cursor-pointer"
     onClick={() => {navigate('/loginpage')}}>Click here to login.</span></p>
     </div> */}
    </div> 
    </div>
  )
}
 export default Title
