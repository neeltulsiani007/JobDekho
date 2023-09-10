import React, { useState } from 'react'
import moment from "moment";
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth'
import jwt_decode from "jwt-decode";
import defimg from './def.png'


import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import baseUrl from '../baseUrl';

function Postcomments(){  
  let { id } = useParams();
  const {auth} =  useAuth();
  const photo = "defaultuser.png"
  const[newcomment,setNewcomment] = useState("")
  const[comments,setComments] = useState(["comments,now"])
  const[loadingtext, setLoadingText] = useState("Loading ...");
  const [loading , setLoading] = useState(true);
  const [user,setUser] = useState({})
  const axiosPrivate = useAxiosPrivate();
  

  useEffect(() => {
   
      const getuserdata = async() =>{

        await  axiosPrivate.get(`${baseUrl}/getuser`).then((response) => {
          console.log(response.data.recordset[0]);
          setUser(response.data.recordset[0])

        }); 

      }


//     const getindividualpost = async()=>{
//    await  axiosPrivate.get(`http://localhost:4000/post/${id}`).then((response) => {
//       console.log(response.data.recordset[0]);
//       setPost(response.data.recordset[0])
//       setLikes(response.data.recordset[0].countlikes)
//     }); 
// }
const getcomments= async()=>{

  setLoading(true)
  try{
    await  axiosPrivate.get(`${baseUrl}/comments/${id}`).then((response) => {
       console.log(response.data.recordset);
       setComments(response.data.recordset.reverse())
     }); 
    }catch(e){
      console.log(e)
    }
    console.log("loading false")
    setLoading(false)
    setLoadingText("");
 }



 getuserdata();
getcomments();


  },[axiosPrivate,id]);

   

  const addcomment =async()=>{
    console.log("inside addcomment")
    const date = new Date();
     const commentoadd = {
        username : user?.name ,
        comment:newcomment,
        date:date,
        profilephoto:user.profilephoto
    }
    console.log(commentoadd)
     setComments([ commentoadd,...comments ])
    await  axiosPrivate.post(`${baseUrl}/addcomments/${id}`,{
       comment:newcomment,
    },{
        // headers: { accessToken: auth.accessToken },
        withCredentials:true
    });
     
    //  const decoded = jwt_decode(auth.accessToken);
     setNewcomment("")
  }

  return (
<div class="bg-gray-200 min-h-screen  py-8 lg:py-16 flex-col font-sans">
  <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class={`  ${!loading && "hidden"}  text-lg lg:text-2xl font-bold text-gray-900 `}>Comments</h2>
        <h2 class={` ${loading && "hidden"}  text-lg lg:text-2xl font-bold text-gray-900 `}>Comments {" ("+comments.length+")"}</h2>
    </div>
    <form class="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
              value={newcomment}
              onChange={(e)=>{setNewcomment(e.target.value)}}
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none "
                placeholder="Write a comment..." required></textarea>
        </div>
        <div className='w-full flex items-center justify-start'>
        <button type="button"
        onClick={addcomment}
           class="inline-flex justify-start items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg bg-gray-700  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800">
            Post comment
        </button>
        </div>
    </form>
       {comments?.length
       ?(
        <div class = {`${loading && "hidden"}`}>
                    {comments.map((x, i) =>
         <div class="p-6 mb-6 text-base bg-white rounded-lg ">
        <div class="flex justify-between items-center mb-2">
            <div class="flex items-center justify-start">
                <p class="inline-flex justify-start items-center mr-3 text-sm text-gray-900 font-sans font-semibold">
                  {x.profilephoto?
                  <img
                        class="mr-2 w-6 h-6 rounded-full"
                        src={x.profilephoto}
                        alt="loading ..." />
                        :
                        <img
                        class="mr-2 w-6 h-6 rounded-full"
                        src={defimg}
                        alt="loading ..." />
                  }
                        {x.username}</p>
                <p class="text-sm text-gray-600 ">{moment(x.commentdate).format("Do MMM , YYYY")}</p>
            </div>
            <div class="flex items-center justify-end  text-xs">
           { moment(x.commentdate).fromNow()}
              </div>
          
        </div>
        <p class="text-gray-500 text-left ml-8 ">{x.comment}</p>
       </div>)
       }
       </div>
       ):<p></p>
      }
      <div className={ ` w-full h-full text-3xl font-bold items-center text-center justify-center ${loading?"flex":"hidden"}`}></div>
      {loadingtext }
      {/* <svg aria-hidden="true" class={`w-5  h-5 ml-[7px] mt-[2px]  ${!loading && "hidden"}  text-gray-200 animate-spin dark:text-gray-600 fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg> */}
        </div>
   

</div>
  )
}

export default Postcomments