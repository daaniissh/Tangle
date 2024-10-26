import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login.tsx'
function App() {
const [authUser,setAuthUser] = useState(false)

  return (
    <div className='flex max-w-6xl mx-auto'>
      {/* {authUser && <Sidebar />} */}
      <Routes>
        {/* <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} /> */}
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        {/* <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} /> */}
        {/* <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
      </Routes>
      {/* {authUser && <RightPanel />} */}
      {/* <Toaster /> */}
    </div>
  )
}

export default App
