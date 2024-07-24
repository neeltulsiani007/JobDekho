
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon , UserCircleIcon , PowerIcon ,CameraIcon , VideoCameraIcon} from '@heroicons/react/24/outline'
import {SlLock,SlUser,SlHome,SlLogout} from "react-icons/sl"
import { AiOutlineMail,AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect , useState} from 'react'

import { useNavigate } from 'react-router-dom'
import baseUrl from '../baseUrl'
import homebaseUrl from '../homebaseUrl'

function classNames(...classes) {

  return classes.filter(Boolean).join('')
}

export default function NavbarIntern(type) {

  const [user,setUser] =  useState([]);
  const[openpost , setOpenPost] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();


    useEffect(() => {

    
    const getuserprofile = async()=>{
   await axiosPrivate.get(`${baseUrl}/getuserprofile`,
   {
    withCredentials:true
   }).then((response) => {
    console.log("user")
      console.log(response.data.recordset[0]);
      setUser(response.data.recordset[0]);
    }); 
}
getuserprofile();
  },[axiosPrivate]);



const navigation = [
    { name: "Home", link: "/home", icon: SlHome ,id:"home"},
    { name: "Profile", link: "/internprofilesetting", icon: SlUser ,id:"profile"},
    { name: "Change Password", link: "/changepasswordsetting", icon: SlLock ,id:"changepassword"},
    { name: "Number Verification", link: "/emailverification", icon: AiOutlineMail , id:"emailverify"},
    { name: "Logout", link: "/logout", icon: SlLogout , id:"logout"},
   
  ];
const postnavigation = [

    { name: 'Photo', href: `${homebaseUrl}/postform`, current:false ,id:"photobutton"},
    { name: 'Video', href: `${homebaseUrl}/videoform`, current:false ,id:"videobutton"},
]

const handlePostClick = ()=>{
  setOpenPost(!openpost);
}
  return (


    <Disclosure as="nav" className={`bg-gray-800 `}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
              
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              
             
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            
                <div className="hidden sm:ml-6 sm:block my-8">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                         to={item.link}
                         id = {item.id}
                         className={classNames(
                          'text-gray-300 font-sans hover:bg-gray-700  hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  
       
                    
                  </div>
                </div>

              </div>
             
              
            </div>
          </div>

          <Disclosure.Panel className={`sm:hidden `}>
            <div className="space-y-2 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.link}
                  id={item.id}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
                
              ))}
             
              
           
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

