import React, { useState } from 'react'
import NavbarRecruiter from './NavbarRecruiter'
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MiniatureApplicantsTemplate from './MiniatureApplicantsTemplate';
import { useParams } from 'react-router-dom';

function Applicants() {

    const axiosPrivate = useAxiosPrivate();
    const[applicants,setApplicants] = useState({});
    const { postid } = useParams();

    useEffect(() => {

       
        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("gethiredbutton").style.color = "rgb(156 163 175)"
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "white"
        document.getElementById("projectsbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"



        const getapplicantsdata = async() =>{
            try {
                const response = await axiosPrivate.post('/getapplicantsbyid',
                    {
                        postid:postid,
                    } ,
                    {
                    withCredentials:true
                });
                console.log("here",(response.data.recordset));
                setApplicants(response.data.recordset);
            } catch (err){
                console.error(err);
            }
        }

        getapplicantsdata();
      },[axiosPrivate , postid]);

  return (
    <div class="min-h-screen bg-gray-200 ">
      <NavbarRecruiter />
      <div className='  items-center justify-center'>
      {applicants?.length
                ?(
                    <ul>
                        {applicants.map((x, i) =>
                       <li className='py-8'>
                        <MiniatureApplicantsTemplate applicants={x} />
                       </li>
                        )}
                    </ul>
                ): <p></p>
            }
      </div>
    </div>
  )
}

export default Applicants
