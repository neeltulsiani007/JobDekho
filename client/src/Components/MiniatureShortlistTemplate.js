 import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import moment from 'moment';
import logo from './def.png'
import axios from '../api/axios';
import { toast , ToastContainer} from 'react-toastify';
import baseUrl from '../baseUrl';

function MiniatureShortlistTemplate({postid , applicants}) {

const navigate = useNavigate();
const[listexp,setListexp] = useState({});
const[listedu , setListedu] = useState({});
const [profile,setProfile] = useState({});
const[offer , setOffer] = useState([])
const[modalopen , setModalOpen] = useState(false)
const[skills,setSkills] = useState({});
const[shortlisted , setShortlisted] = useState([])
const[bio , setBio] = useState("New User")
const axiosPrivate = useAxiosPrivate();

useEffect(() => {
const getuserexperience = async()=>{
await axiosPrivate.post(`http://localhost:4000/getprofileexperience/${applicants.useremail}`,{email:applicants.useremail},
{
 withCredentials:true
}).then((response) => {
   console.log(response.data.recordset);
    setListexp(response.data.recordset)
    if(response.data.recordset.length !== 0){
    setBio(response.data.recordset[response.data.recordset.length-1].experience)
    }
 }); 
}

const getuserprofile = async()=>{
    await axiosPrivate.post(`http://localhost:4000/internprofile`,{email:applicants.useremail},
    {
     withCredentials:true
    }).then((response) => {
       console.log(response.data.recordset[0]);
        setProfile(response.data.recordset[0])
     }); 
    }

const getuserskills =async()=>{
  await axiosPrivate.post(`http://localhost:4000/getuserskills/${applicants.useremail}`,{email:applicants.useremail},
{
 withCredentials:true
}).then((response) => {
   console.log(response.data.recordset);
    setSkills(response.data.recordset)
 }); 
}

const getusereducation = async()=>{
await axiosPrivate.post(`http://localhost:4000/getprofileeducation/${applicants.useremail}`,{ email:applicants.useremail},
{
 withCredentials:true
}).then((response) => {
   console.log(response.data.recordset);
    setListedu(response.data.recordset)
 }); 
}

const getshortlisted = async()=>{
  await axios.post(`http://localhost:4000/getshortlistbyid`,{ postid:applicants.postid},
    {
     withCredentials:true
    }).then((response) => {
       console.log(response.data.recordset);
       setShortlisted(response.data.recordset.map(function (obj) {
        return obj.useremail;
      }
      ));
     }); 
}
const getoffered = async()=>{
    await axios.post(`http://localhost:4000/getofferbyid`,{postid:postid},
      {
       withCredentials:true
      }).then((response) => {
         console.log(response.data.recordset);
         setOffer(response.data.recordset.map(function (obj) {
          return obj.useremail;
        }
        ));
       }); 
  }

getoffered();
getuserprofile();
getuserskills();
getusereducation();
getuserexperience();
getshortlisted();

},[applicants,axiosPrivate]);


const getRandomColor = (i) => {
  const colors = 
    ['#80cbc4',
    '#9FA8DA',
    '#fca5a5',
    '#DDD6FE',
   
    ];
  return colors[i];
};
const getRandomText = (i) => {
  const text = 
    ['#204140',
    '#321d95',
    '#7f1d1d',
    '#43446c',
    
    ];
  return text[i];
};


const handleOffer = async()=>
    {
      if(!offer.includes(applicants.useremail))
        {
          setOffer([...offer , applicants.useremail])
          toast.success("Offer Sent !")
          setModalOpen(false)
        }
  
      const res = await axiosPrivate.post(`${baseUrl}/handleoffer`, {
      postid:postid,
      useremail : applicants.useremail,
    }, 
    {
      withCredentials:true
    });
    }


  return(
   
    <div class=" max-w-md  mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
      <ToastContainer 
         position='top-center'
         autoClose = '1500'
         />
  <div class="relative">
    {/* Modal Open */}
    <div id="default-modal" tabindex="-1" aria-hidden="true" class={`${!modalopen && "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center flex w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow ">
            <div class="p-4 md:p-5 space-y-4">
              
                <p class="text-base leading-relaxed text-gray-500 ">
                    Are you sure you want to send an offer
                </p>
            </div>
            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                <button
                onClick={handleOffer}
                data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Yes</button>
                <button 
                onClick={()=>{setModalOpen(false)}}
                data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-600 focus:outline-none  rounded-lg border border-gray-200 hover:bg-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No</button>
            </div>
        </div>
    </div>
</div>
{/* Modal End */}
    <img class="w-full h-60 object-cover" src={profile.profilephoto?profile.profilephoto:logo} alt="Profile Image" />
  </div>
  <div class="px-6 py-4">
    <div class="text-xl font-semibold text-gray-800">{profile.name}</div>
    <p class="text-gray-600">{bio}</p>
  </div>
  <div class="px-6 py-4">
  {skills?.length
                ?(
                    <ul className='md:list-disc font-medium text-base pl-5'>
                        {skills.slice(0,4).map((x, i) =>
                        <span
                        style={{backgroundColor:getRandomColor(i%4) , color:getRandomText(i%4) }}
                        class="inline-block px-4 py-1 font-semibold  rounded-full">{x.skill}</span>
                      )
                        }
                    </ul>
                ): <p></p>
            }
   
  </div>
  <div class="px-4 pt-10 pb-6 flex w-full justify-between space-x-2">
    <button
        onClick={()=>{navigate(`/internprofile/${applicants.useremail}`)}}
    class="text-blue-900 w-52 rounded-xl hover:border-none hover:text-white hover:bg-blue-900 border-blue-900 border-[1px] p-2">View Profile</button>
    {!offer.includes(applicants.useremail)?
    <button 
    onClick={()=>{setModalOpen(true)}}
    class="  text-blue-900 w-52 rounded-xl border-blue-900 border-[1px] p-2"
    >Send Offer</button>
    :
    <button 
    class="w-52  rounded-xl  text-white bg-blue-900  p-2 "
    disabled
    >{profile.Bio === 'true'?"Hired":"Offer Sent"}</button>
}
  </div>
</div>
  )
}

export default MiniatureShortlistTemplate

