import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NavbarIntern from "./NavbarIntern";
import logo from "./def.png"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast ,ToastContainer } from "react-toastify";


const Userdata = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const[posts,setPosts] = useState({});
    const[user , setUser] = useState({});
    const [accepted , setAccepted] = useState(false)
    const navigate = useNavigate();
    
    useEffect(() => {


        document.getElementById("gethiredbutton").style.backgroundColor = ""
        document.getElementById("gethiredbutton").style.color = ""
        document.getElementById("homebutton").style.backgroundColor = ""
        document.getElementById("projectsbutton").style.color = "white"
        document.getElementById("projectsbutton").style.backgroundColor = "rgb(17 24 39)"
        document.getElementById("postbutton").style.color = "rgb(156 163 175)"
        document.getElementById("postbutton").style.backgroundColor = ""
        document.getElementById("homebutton").style.color = "rgb(156 163 175)"



        const getoffersdata = async() =>{
            try {
                const response = await axiosPrivate.get('/getoffers', {
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
               setAccepted(user.Bio)
                 
             }); 
         }

        getuserprofile();
        getoffersdata();
      },[axiosPrivate]);



      const handlereject = async(x) =>{
  

        console.log(x.postid)
        let newlikedpost = posts.filter((num) => num.postid !== x.postid);
        setPosts(newlikedpost)
          

        try {
            const response = await axiosPrivate.post('/handlerejectoffer',
                {
                    postid : x.postid[0]
                },
                {
                withCredentials:true
            });
        } catch (err){
            console.error(err);
        }

        toast.success("Offer Rejected !")
    }

    const handleaccept = async(x) =>{
  

        console.log(x.postid)
        let newlikedpost = posts.filter((num) => num.postid === x.postid);
        setPosts(newlikedpost)

        try {
            const response = await axiosPrivate.post('/handleacceptoffer',
                {
                    postid : x.postid[0]
                },
                {
                withCredentials:true
            });
        } catch (err){
            console.error(err);
        }
         
        toast.success("Offer Accepted !")
    }


    return (

        <div>
            <ToastContainer 
         position='top-center'
         autoClose = '1500'
         />
            <NavbarIntern />
            <div className=' mt-12 h-[calc(91dvh)] '>
      {posts?.length
                ?(
                    <ul className='items-center flex flex-col justify-center space-y-12'>
                        {posts.map((x, i) =>
                         

<div class=" lg:w-2/5 w-full  bg-white border border-gray-200 rounded-lg shadow-md ">
    <div class="flex justify-end px-4 pt-4">
    <button
    onClick={()=>{navigate(`/rpost/${x.postid[0]}`)}}
    id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500   focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <IoMdInformationCircleOutline  
            className='w-6 h-6  text-gray-700  hover:text-red-500'
            />
        </button>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={x.profilephoto?x.profilephoto:logo} alt="Bonnie image"/>
        <h5 class="mb-1 text-xl font-medium text-gray-900 ">{x.info}</h5>
        <span class="text-sm text-gray-500 ">{x.cname}</span>
        <div class="flex w-full items-center justify-center  mt-4 md:mt-6 space-x-4">
        <button 
        onClick={()=>{handleaccept(x)}}
        disabled={user.Bio === "true"}
        class="w-36 md:w-48 items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">{user.Bio==="true"?"Accepted":"Accept"}</button>
        <button 
         disabled={user.Bio === "true"}
        onClick={()=>{handlereject(x)}}
        class="w-36 md:w-48 items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Reject</button>   
        </div>
    </div>
</div>

                        )}
                    </ul>
                ): <h3>You have no offers</h3>
            }
      </div>
        </div>
    );
};

export default Userdata;