import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import Logo from './def.png'

function Internprofile() {

 let { number } = useParams();
 const [user,setUser] = useState("");
 const [showinfo,setShowinfo] = useState(false)
 const [showinfotext,setShowinfotext] = useState("Show Full Information")
 const [listexp,setListexp] = useState({});
 const [listedu,setListedu] = useState({});
 const axiosPrivate = useAxiosPrivate();
 const [modalopen,setModalOpen] = useState(false);
 const [modalopenedu,setModalOpenEdu] = useState(false);
 const [modalopenexp,setModalOpenExp] = useState(false);
 const [bio,setBio] = useState("");
 const[skills,setSkills] = useState([]);




 const update = true;
  useEffect(() => {
    const getuserprofile = async()=>{
   console.log(number)
   await axiosPrivate.post("http://localhost:4000/internprofile",{
   email:number
   },
   {
    withCredentials:true
   }).then((response) => {
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
      setSkills(response.data.recordset[0].skills.split(","))
    }); 
}
const getuserexperience = async()=>{
  await axiosPrivate.post(`http://localhost:4000/getprofileexperience/${number}`,{number:number},
  {
   withCredentials:true
  }).then((response) => {
     console.log(response.data.recordset);
      setListexp(response.data.recordset)
   }); 
}

const getusereducation = async()=>{
  await axiosPrivate.post(`http://localhost:4000/getprofileeducation/${number}`,{ number:number},
  {
   withCredentials:true
  }).then((response) => {
     console.log(response.data.recordset);

      setListedu(response.data.recordset)
   }); 
}

getuserprofile();
getusereducation();
getuserexperience();
  },[number,axiosPrivate]);

  const handleclick = ()=>{


    if(showinfotext === "Update")
    {
      
    }
      else if(showinfotext === "Show Full Information")
      {
        setShowinfotext("Show Less Information");
        setShowinfo(true)
      }
      else
      {
        setShowinfotext("Show Full Information");
        setShowinfo(false)
      }
   }


  return (


    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl   w-full bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 border-t border-gray-300">
    
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
        {/* Left Part: Cover Photo and Skills */}
        <div className={`lg:col-span-2 flex flex-col items-center lg:items-start space-y-6 border-r border-gray-300 pr-6`}>
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="relative">
                <LazyLoadImage
                effect='blur'
                 src={user.profilephoto?user.profilephoto:Logo} 
                 class="h-36 w-36 rounded-full  border-black"  alt="" />   
    
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
               <p className="text-sm text-gray-600">{bio?bio.experience.split('at')[0]:"New User"}</p> 
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center mb-2 justify-between">
              <label htmlFor="skills" className=" text-lg font-medium text-gray-700 flex items-center">
                Skills
              
              </label>
            </div>
            {skills?.length
                ?(
                    <ul className='md:list-disc font-medium text-base pl-5'>
                        {skills.slice(0,4).map((x, i) =>
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
        <div className="lg:col-span-7 space-y-8 border-r border-gray-300 pr-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">About</h3>
          <form className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.name}</p>
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.number}</p>
              </div>
              
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                 Gender
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.gender}</p>
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                Country
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.country}</p>
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                 Email
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.email}</p>
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                State
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.state }</p>
              </div>
              
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                Date of Birth
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.dob}</p>
              </div>
            
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                 City
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.city}</p>
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                  Number of posts
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.numberofposts   }</p>
              </div>
              <div>
                <label htmlFor="peers" className="flex text-sm font-medium text-gray-700">
                  Zipcode
                </label>
                <p className="mt-1 flex font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">{user.zipcode}</p>
              </div>
          
            </div>
          </form>
        </div>

        {/* Right Part: Education and Experience */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          <div className=" pr-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              Education
       
            </h3>
            <div className="space-y-4">
            {listedu.length
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

  )
}

export default Internprofile