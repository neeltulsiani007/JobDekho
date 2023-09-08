import React from 'react'
import { useNavigate } from 'react-router-dom';
 

function Title()
{
const navigate = useNavigate();
  return (
    <div className = "page1"  class ="flex font-sans py-64  h-screen w-screen items-center justify-center  bg-no-repeat bg-cover bg-zinc-200">
    <br/> 
    <div class="box-content py-24 px-7  shadow-md shadow-zinc-400 lg:p-48 mt-12  bg-zinc-50">
    <h3 id="title" class = " text-center md:text-4xl text-2xl md:mb-16 mb-10 font-bold">What are you looking for ?<br></br>
    </h3>
    <div class="flex-row flex  my-4  space-x-7   md:space-x-36 ">
     <button id = "recruitbutton"
     class=" text-blue-800 hover:bg-blue-950 rounded-lg hover:text-white md:w-40 w-32 h-14 font-serif text-lg md:text-2xl border-2 border-neutral-900"
     onClick={() => {navigate('/Recruitmentformmultistep1');}}>Recruitment</button>
     <button id = "button_intern" 
     class=" text-blue-900  hover:bg-blue-950 rounded-lg hover:text-white md:w-40 w-32 h-14 font-serif text-lg md:text-2xl border-2 border-neutral-900"
      onClick={() => {navigate('/Internformmultistep');}}>Internship</button>
      </div>
      {/* <div class="flex-1 py-4 ">
     <p id = "alreadyuser"
     class="text-base text-center"
     >Already a user? <span id = "clicklogin" 
     class="  hover:underline hover:text-gray-500 cursor-pointer"
     onClick={() => {navigate('/loginpage')}}>Click here to login.</span></p>
     </div> */}
    </div> 
    <footer class="bg-white w-screen dark:bg-gray-800  top-0 absolute  shadow ">
    <div class="w-full mx-auto w-screen-xl p-3 md:flex dark:text-gray-400 md:items-center md:justify-center">
 <span 
 onClick = {()=>{navigate('/')}}
 class="font-semibold text-lg cursor-pointer">JobDekho</span>
    </div>
</footer>
    </div>
  )
}
 export default Title
