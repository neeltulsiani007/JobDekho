import React, { useState } from 'react'
import Hire from './Hire'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from './def.png'

function HirewithApplicants() {

    const axiosPrivate = useAxiosPrivate();
    const[posts,setPosts] = useState({});
    const[user , setUser] = useState({});
    const navigate = useNavigate()
   
    useEffect(() => {

        const getoffersdata = async() =>{
            try {
                const response = await axiosPrivate.get('/getrecruiterposts', {
                    withCredentials:true
                });
                console.log("here",(response.data.recordset));
                setPosts(response.data.recordset);
            } catch (err){
                console.error(err);
            }
        }
        const getuserprofile = async()=>{
            await axiosPrivate.get("http://localhost:4000/getuserprofile",
            {
             withCredentials:true
            }).then((response) => {
               setUser(response.data.recordset[0]);    
             }); 
         }

        getuserprofile();
        getoffersdata();
      },[axiosPrivate]);

  return (
    <div className=' '>
      <Hire />
      <div className=' mt-12 h-[calc(91dvh)] '>
      {posts?.length
                ?(
                    <ul className='items-center flex flex-col justify-center space-y-12'>
                        {posts.map((x, i) =>
                         

<div class=" lg:w-2/5 w-full  bg-white border border-gray-200 rounded-lg shadow-md ">
    <div class="flex justify-end px-4 pt-4">
    <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500   focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <AiOutlineDelete  
            className='w-6 h-6  text-gray-700  hover:text-red-500'
            />
        </button>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.profilephoto?user.profilephoto:logo} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 ">{x.info}</h5>
        <span class="text-sm text-gray-500 ">{user.companyname}</span>
        <div class="flex w-full items-center justify-center  mt-4 md:mt-6 space-x-4">
        <button 
        disabled
        class="w-52 py-2 px-4 ms-2 md:w-56 items-center text-sm font-medium text-white focus:outline-none bg-gray-700 rounded-lg border border-gray-700 hover:bg-gray-800  focus:z-10 focus:ring-4 focus:ring-gray-100 ">{x.numberofshortlisted==1?"1 Shortlisted":x.numberofshortlisted+" Shortlisted"}</button>
        <button 
        onClick={()=>{navigate(`/shortlisted/${x.postid}`)}}
        class="w-52 md:w-56 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">See Shortlisted Applicants</button>   
        </div>
    </div>
</div>

                        )}
                    </ul>
                ): <p></p>
            }
      </div>
    </div>
  )
}

export default HirewithApplicants
