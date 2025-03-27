import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import Login from './pages/auth/Login.tsx'
import SignUp from './pages/auth/Signup.tsx'
import EmailSend from './pages/auth/EmailSend.tsx'
import OtpVerification from './pages/auth/OtpVerfication.tsx'
import ResetPassword from './pages/auth/ResetPassword.tsx'
import SideBar from './components/common/Sidebar.tsx'

import Notification from './pages/main/Notification.tsx'

import HomePage from './pages/Home/HomePage.tsx'
import StoryPage from './pages/Home/StoryPage.tsx'
import Explore from './pages/main/Explore.tsx'

import ProfilePage from './pages/main/Profile.tsx'
import ProfileEdit from './pages/main/ProfileEdit.tsx'

import PostPage from './pages/main/Postpage.tsx'

import { useQuery } from '@tanstack/react-query'
import { QueryKey } from './types/QueryKey/key'

import CirqlG from './logos/Cirql-g.tsx'
import Cirql from './logos/cirql.tsx'
import { PostDetails as post } from './types/QueryTypes/queary'
import { io, Socket } from 'socket.io-client'
import Message from './pages/main/Message.tsx'

// import { Sidebar } from 'lucide-react'


function App() {
  const location = useLocation();
 

  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    setSocket(
      io("https://tangle-nrfd.onrender.com", {
        transports: ["websocket", "polling"], // Ensure WebSocket & polling
        withCredentials: true,
      })
    );
  }, []);

  const [showStatusBar, setShowStatusBar] = useState<boolean>(false);

  const APIURL = import.meta.env.VITE_API_URL;

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }
    },
    retry: false,
  })



  const { } = useQuery<post[]>({
    queryKey: ["posts"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/all`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }
    },
    retry: false

  })

  const { } = useQuery<post[]>({
    queryKey: ["story"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/story`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }
    },
    retry: false

  })
  const {  } = useQuery({
      queryKey: ["notificationsMain"] as QueryKey,
      queryFn: async () => {
        try {
          const response = await fetch(`${APIURL}/notifications`, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch notifications");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching notifications:", error);
          throw error;
        }
      },
      // refetchInterval: 10000,
    })
  const { } = useQuery<post[]>({
    queryKey: ["following"] as QueryKey,
    queryFn: async () => {
      try {
        const res = await fetch(`${APIURL}/posts/following`, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        if (data.error) return null
        if (!res.ok || data.error) {
          throw new Error(data.error || "Something went wrong")
        }
        console.log(data, "===user data")
        return data
      } catch (error) {

      }
    },
    retry: false

  })

  useEffect(() => {

    socket?.emit("addUser", authUser?._id);  // Emit immediately on connect
  }, [authUser,socket]);

  useEffect(() => {



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
  if (isLoading) {
    return (
      <div className="h-screen dark:bg-black flex flex-col justify-between items-center relative">
        {/* CirqlG at the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-blink">
          <CirqlG className="w-20 px-2" />
        </div>

        {/* Cirql at the center-bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Cirql className="dark:fill-white size-14 fill-black" />
        </div>
      </div>

    )
  }

  return (
    <>
  

      <div className="flex dark:bg-black overflow-hidden">

        {authUser && !location.pathname.includes("/story") && (
          <SideBar socket={socket} showStatusBar={showStatusBar} handleCheckedChange={handleCheckedChange} />
        )}

        <Routes>
          <Route path="/" element={authUser ? <HomePage socket={socket} /> : <Navigate to="/login" />} />

          <Route path="/profile/:username" element={authUser ? <ProfilePage socket={socket} /> : <Navigate to="/login" />} />
          <Route path="edit/:username" element={authUser ? <ProfileEdit showStatusBar={showStatusBar} handleCheckedChange={handleCheckedChange} /> : <Navigate to="/login" />} />

          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/emailverification" element={<EmailSend />} />
          <Route path="/otpverification" element={<OtpVerification />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path="/story/:username/:id" element={authUser ? <StoryPage socket={socket} /> : <Navigate to="/login" />} />
          <Route path="post/:username/:postId" element={<PostPage socket={socket} />} />
          <Route path="/notifications" element={authUser ? <Notification /> : <Navigate to="/login" />} />
          <Route path="/message" element={authUser ? <Message /> : <Navigate to="/login" />} />
          <Route path="/explore" element={authUser ? <Explore /> : <Navigate to="/login" />} />
        </Routes>
      </div>

    </>

  )
}

export default App
