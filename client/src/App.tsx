import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login.tsx'
import SignUp from './pages/auth/Signup.tsx'
import EmailSend from './pages/auth/EmailSend.tsx'
import OtpVerfication from './pages/auth/OtpVerfication.tsx'
import ResetPassword from './pages/auth/ResetPassword.tsx'
function App() {
const [authUser,setAuthUser] = useState(false)

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* {authUser && <Sidebar />} */}
      <Routes>
        {/* <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} /> */}
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path='/emailverfication' element={!authUser ? <EmailSend /> : <Navigate to="/" />} />
        <Route path='/otpverfication' element={!authUser ? <OtpVerfication /> : <Navigate to="/" />} />
        <Route path='/resetpassword' element={!authUser ? <ResetPassword /> : <Navigate to="/" />} />
        {/* <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
      </Routes>
      {/* {authUser && <RightPanel />} */}
      {/* <Toaster /> */}
    </div>
  )
}

export default App
