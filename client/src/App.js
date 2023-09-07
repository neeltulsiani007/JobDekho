import './App.css';
import { lazy, Suspense, useState } from 'react';
import { AuthProvider } from './context/AuthProvider';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuteContext } from './context/MuteProvider';
import { UserContext } from './context/UserProvider';
import ChatProvider from './context/ChatProvider';
import Loginpage from './Components/Loginpage';
import  Title  from './Components/Title';
import  Internform  from './Components/Internform';
import Recruitment from './Components/Recruitment';
import Otpinput from './Components/Otpinput';
import Recruitmentform from './Components/Recruitmentform';
import NavbarIntern from './Components/NavbarIntern';
import Gethired from './Components/Gethired';
import Individualpost from './Components/Individualpost';
import Postform from './Components/Postform';
import Applicants from './Components/Applicants';
import Userdata from './Components/Userdata';
import Gethiredwithpost from './Components/Gethiredwithpost';
import Logout from './Components/Logout';
import Postcomments from './Components/Postcomments';
import Changepasswordsetting from './Components/Changepasswordsetting';
import Internprofile from './Components/Internprofile'
import Profilesetting from './Components/Profilesetting';
import Recruiterhome from './Components/Recruiterhome'
import Hire from './Components/Hire';
import Recruiterpostform from './Components/Recruiterpostform';
import Emailverificationsetting from './Components/Emailverificationsetting';
import Recruiterposttemplate from './Components/Recruiterposttemplate';
import EmailVerify from './Components/Emailverify';
import InternProfiletemplate from './Components/InternProfiletemplate';
import InternProfilesetting from './Components/InternProfilesetting';
import RecruiterChangePasswordsetting from './Components/RecruiterChangePasswordsetting';
import RecruiterEmailVerifysetting from './Components/RecruiterEmailVerifysetting';
import HirewithApplicants from './Components/HirewithApplicants';
// import DisplayVideo from './Components/DisplayVideo';
// import PostVideo from './Components/PostVideo';
import Videoform from './Components/Videoform'
// import Samplevideo from './Components/Samplevideo';
import Post from './Components/Post';
import FilterSidebar from './Components/FilterSidebar';
import MiniatureProfileTemplate from './Components/MiniatureProfileTemplate';
// import Chatting from './Components/Chatting';
// import SearchBar from './Components/SearchBar';
import RecruiterProfiletemplate from './Components/RecruiterProfiletemplate';
import Internformotpstep from './Components/Internformotpstep';
import Internformmultistep from './Components/Internformmultistep';
import Internformlast from './Components/Internformlast';


const Home = lazy(() => import('./Components/Home'));


function App() {

  const [muted,setMuted] = useState(true)
  const [user,setUser] = useState({});

  return (

    <div className='App'>
      <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <AuthProvider>
        <ChatProvider>
        <MuteContext.Provider value={{ muted: muted, setMuted: setMuted }}>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route exact path='/' element={<Loginpage />} />
        <Route exact path='title' element={<Title />} /> 
        <Route exact path='internform' element={<Internform />} />
        <Route exact path='otpinput' element={<Otpinput />} />
        <Route exact path='internformmultistep' element={<Internformmultistep  />} />
        <Route exact path='internformotpstep' element={<Internformotpstep  />} />
        <Route exact path='internformlast' element={<Internformlast  />} />
        <Route exact path='recruitmentform' element={<Recruitmentform />} />
        <Route exact path='recruitment' element={<Recruitment />} />
        <Route exact path='navbarintern' element={<NavbarIntern />} />
        <Route exact path='gethired' element={<Gethired />} />    
        <Route exact path='home' element={<Home />} />
        <Route exact path='postform' element={<Postform />} />
        <Route exact path='post/:id' element={<Individualpost />} />
        <Route exact path='internprofile/:number' element={<Internprofile />} />
        <Route exact path='comments/:id' element={<Postcomments />} />
        <Route exact path='users' element={<Userdata />} />
        <Route exact path='hire' element={<Hire />} />
        <Route exact path='recruiterpostform' element={<Recruiterpostform />} />
        <Route exact path='recruiterhome' element={<Recruiterhome />} />
        <Route exact path='changepasswordsetting' element={<Changepasswordsetting />}/>
        <Route exact path='profilesetting' element={<Profilesetting />}/>
        <Route exact path='applicants' element={<Applicants />}/>
        <Route exact path='logout' element={<Logout />} />
        <Route exact path ='gethiredwithpost'element = {<Gethiredwithpost />} />
        <Route exact path='emailverification' element={<Emailverificationsetting />} />
        <Route exact path='internprofiletemplate' element={<InternProfiletemplate />} />
        <Route exact path='internprofilesetting' element={<InternProfilesetting />} />
        <Route exact path='recruiterchangepasswordsetting' element={<RecruiterChangePasswordsetting />} />
        <Route exact path = 'recruiterposttemplate' element={<Recruiterposttemplate />} />
        <Route exact path="/emailverification/:number/verify/:token" element={<EmailVerify />} />
        <Route exact path='recruiteremailverifysetting' element={<RecruiterEmailVerifysetting />} />
        <Route exact path ='hirewithapplicants'element = {<HirewithApplicants />} />
        {/* <Route exact path ='displayvideo'element = {<DisplayVideo />} />
        <Route exact path ='postvideo'element = {<PostVideo />} /> */}
        <Route exact path ='videoform'element = {<Videoform />} />
        {/* <Route exact path ='sample'element = {<Samplevideo />} /> */}
        <Route exact path ='filtersidebar'element = {<FilterSidebar />} />
        <Route exact path ='post'element = {<Post />} />
        {/* <Route exact path ='searchbar'element = {<SearchBar />} />
        <Route exact path ='chatting'element = {<Chatting />} /> */}
        <Route exact path ='miniatureprofiletemplate'element = {<MiniatureProfileTemplate />} />
        <Route exact path ='recruiterprofile/:number'element = {<RecruiterProfiletemplate />} />
      </Routes>
      </Suspense>
      </MuteContext.Provider>
      </ChatProvider>
      </AuthProvider>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

