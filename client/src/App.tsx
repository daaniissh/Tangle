import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Login from './pages/auth/Login.tsx'
import SignUp from './pages/auth/Signup.tsx'
import EmailSend from './pages/auth/EmailSend.tsx'
import OtpVerfication from './pages/auth/OtpVerfication.tsx'
import ResetPassword from './pages/auth/ResetPassword.tsx'
import SideBar from './components/common/Sidebar.tsx'

import Notification from './pages/main/Notification.tsx'

import HomePage from './pages/Home/HomePage.tsx'
import StoryPage from './pages/Home/StoryPage.tsx'
import Explore from './pages/main/Explore.tsx'
// import { Sidebar } from 'lucide-react'

function App() {
  const location = useLocation();
  const [authUser, setAuthUser] = useState(true)
  const [isStory, setIsStory] = useState(!authUser)
  const [showStatusBar, setShowStatusBar] = useState<boolean>(false);
  console.log(showStatusBar)
  useEffect(() => {
    console.log(showStatusBar)
    const st = localStorage.getItem('dark-mode');
    setShowStatusBar(st === 'true')

    const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';
    if (darkModeEnabled) {
      document.documentElement.classList.add('dark');
      setShowStatusBar(true);
    }
  }, []);

  const handleCheckedChange = () => {
    setShowStatusBar(prev => {
      const newStatus = !prev;

      document.documentElement.classList.toggle('dark', newStatus);

      // Save the current state of dark mode in localStorage
      localStorage.setItem('dark-mode', newStatus.toString());
      return newStatus;
    });
  };

  return (
    <div className='flex   dark:bg-black overflow-hidden  '>
      {authUser &&  !location.pathname.includes("/story")  && <SideBar showStatusBar={showStatusBar} handleCheckedChange={handleCheckedChange} />}
       
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path='/emailverfication' element={<EmailSend />} />
          <Route path='/otpverfication' element={<OtpVerfication />} />
          <Route path='/story/:username/:id' element={authUser ? <StoryPage /> : <Navigate to="/login" />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/notifications' element={authUser ? <Notification /> : <Navigate to="/login" />} />
          <Route path='/explore' element={authUser ? <Explore /> : <Navigate to="/login" />} />
          {/* <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />  */}
        </Routes>
      
      
      {/* <Toaster /> */}
    </div>
  )
}

export default App
