import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Choices from './Components/Choices'
import Attendance from './Components/Attendance'
import Feedback from './Components/Feedback'
import Search from './Components/Search'
import Student_Info from './Components/Student_Info'

const firebaseConfig = {
  apiKey: "AIzaSyA_hLvWBiTkdKZ-0_9GER4YGCdWt4lXrno",
  authDomain: "noteattendance.firebaseapp.com",
  projectId: "noteattendance",
  storageBucket: "noteattendance.appspot.com",
  messagingSenderId: "52025186092",
  appId: "1:52025186092:web:c57eafa99ec56794453e89",
  measurementId: "G-G3KCVZMNLG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

const provider = new GoogleAuthProvider()

// Function to handle sign-in
const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then(result => {
    // console.log(result)
  }).catch(err => {
    console.log("error signing in")
  })
}

// Function to handle sign-out
const signOutWithGoogle = () => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful!");
    })
    .catch(error => {
      console.error("Error signing out:", error);
    });
};

export const AppContext = createContext()

function App() {
  const [students, setStudents] = useState([
    { "rollNo": "SCOA01", "fullName": "Michael Isabella Williams" },
    { "rollNo": "SCOA02", "fullName": "Daniel Grace Garcia" },
    { "rollNo": "SCOA03", "fullName": "Emma Christopher Johnson" },
    { "rollNo": "SCOA04", "fullName": "Olivia Grace Davis" },
    { "rollNo": "SCOA05", "fullName": "Shreedhar Deodatta Urawane" },
    { "rollNo": "SCOA06", "fullName": "Michael Ava Martinez" },
    { "rollNo": "SCOA07", "fullName": "Olivia Joseph Wilson" },
    { "rollNo": "SCOA08", "fullName": "Yash Sudhakar Jawale" },
    { "rollNo": "SCOA09", "fullName": "John William Brown" },
    { "rollNo": "SCOA10", "fullName": "Emily Thomas Johnson" },
    { "rollNo": "SCOA11", "fullName": "Daniel Grace Davis" },
    { "rollNo": "SCOA12", "fullName": "Krutika Mahesh Ahire" },
    { "rollNo": "SCOA13", "fullName": "Michael Sophia Martinez" },
    { "rollNo": "SCOA14", "fullName": "Gaurav Vijay Gorane" },
    { "rollNo": "SCOA15", "fullName": "Sarah Grace Garcia" },
    { "rollNo": "SCOA16", "fullName": "James Ava Johnson" },
    { "rollNo": "SCOA17", "fullName": "Alice Christopher Davis" },
    { "rollNo": "SCOA18", "fullName": "Michael Elizabeth Smith" },
    { "rollNo": "SCOA19", "fullName": "Daniel Grace Williams" },
    { "rollNo": "SCOA20", "fullName": "Olivia Mark Brown" },
    { "rollNo": "SCOA21", "fullName": "David Ava Garcia" },
    { "rollNo": "SCOA22", "fullName": "Emma Joseph Davis" },
    { "rollNo": "SCOA23", "fullName": "John Isabella Miller" },
    { "rollNo": "SCOA24", "fullName": "Sarah William Wilson" },
    { "rollNo": "SCOA25", "fullName": "Daniel Mark Smith" },
    { "rollNo": "SCOA26", "fullName": "Michael Sophia Davis" },
    { "rollNo": "SCOA27", "fullName": "Emma Christopher Martinez" },
    { "rollNo": "SCOA28", "fullName": "Olivia Joseph Johnson" },
    { "rollNo": "SCOA29", "fullName": "David Isabella Williams" },
    { "rollNo": "SCOA30", "fullName": "Sarah Grace Davis" },
    { "rollNo": "SCOA31", "fullName": "James Thomas Smith" },
    { "rollNo": "SCOA32", "fullName": "Daniel Grace Garcia" },
    { "rollNo": "SCOA33", "fullName": "Emma Joseph Johnson" },
    { "rollNo": "SCOA34", "fullName": "Michael Grace Davis" },
    { "rollNo": "SCOA35", "fullName": "Olivia Christopher Smith" },
    { "rollNo": "SCOA36", "fullName": "David William Johnson" },
    { "rollNo": "SCOA37", "fullName": "Emma Mark Martinez" },
    { "rollNo": "SCOA38", "fullName": "Olivia Sophia Wilson" },
    { "rollNo": "SCOA39", "fullName": "Daniel Isabella Brown" },
    { "rollNo": "SCOA40", "fullName": "Michael Grace Johnson" },
    { "rollNo": "SCOA41", "fullName": "David Mark Davis" },
    { "rollNo": "SCOA42", "fullName": "Emma Grace Garcia" },
    { "rollNo": "SCOA43", "fullName": "Olivia Christopher Smith" },
    { "rollNo": "SCOA44", "fullName": "James Joseph Johnson" },
    { "rollNo": "SCOA45", "fullName": "Daniel Ava Wilson" },
    { "rollNo": "SCOA46", "fullName": "Sarah William Davis" },
    { "rollNo": "SCOA47", "fullName": "Emma Mark Miller" },
    { "rollNo": "SCOA48", "fullName": "Michael Grace Wilson" },
    { "rollNo": "SCOA49", "fullName": "David Isabella Davis" },
    { "rollNo": "SCOA50", "fullName": "Emma Ava Smith" },
    { "rollNo": "SCOA51", "fullName": "Olivia Christopher Johnson" },
    { "rollNo": "SCOA52", "fullName": "James Sophia Brown" },
    { "rollNo": "SCOA53", "fullName": "Daniel Joseph Johnson" },
    { "rollNo": "SCOA54", "fullName": "Emma Grace Wilson" },
    { "rollNo": "SCOA55", "fullName": "Sarah Christopher Garcia" },
    { "rollNo": "SCOA56", "fullName": "Michael Isabella Davis" },
    { "rollNo": "SCOA57", "fullName": "David Ava Smith" },
    { "rollNo": "SCOA58", "fullName": "Olivia Joseph Martinez" },
    { "rollNo": "SCOA59", "fullName": "Daniel William Johnson" },
    { "rollNo": "SCOA60", "fullName": "Emma Grace Wilson" },
    { "rollNo": "SCOA61", "fullName": "Sarah Thomas Davis" },
    { "rollNo": "SCOA62", "fullName": "James Grace Smith" },
    { "rollNo": "SCOA63", "fullName": "Michael Ava Garcia" },
    { "rollNo": "SCOA64", "fullName": "David Joseph Davis" },
    { "rollNo": "SCOA65", "fullName": "Emma Grace Smith" },
    { "rollNo": "SCOA66", "fullName": "Olivia Mark Martinez" },
    { "rollNo": "SCOA67", "fullName": "Daniel Joseph Johnson" },
    { "rollNo": "SCOA68", "fullName": "Emma Isabella Brown" },
    { "rollNo": "SCOA69", "fullName": "Michael Mark Johnson" },
    { "rollNo": "SCOA70", "fullName": "Olivia Ava Wilson" },
    { "rollNo": "SCOA71", "fullName": "David Christopher Davis" },
    { "rollNo": "SCOA72", "fullName": "Sarah Joseph Smith" },
    { "rollNo": "SCOA73", "fullName": "Michael Sophia Martinez" },
    { "rollNo": "SCOA74", "fullName": "Daniel Grace Johnson" },
    { "rollNo": "SCOA75", "fullName": "Emma Ava Davis" },
    { "rollNo": "SCOA76", "fullName": "Olivia Joseph Smith" },
    { "rollNo": "SCOA77", "fullName": "David Isabella Brown" },
    { "rollNo": "SCOA78", "fullName": "Emma Mark Garcia" },
    { "rollNo": "SCOA79", "fullName": "James Ava Davis" }
  ])
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [user, setUser] = useState('')
  const checkAuthState = () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsLoggedIn(true)
        setUser(user.displayName)
      } else {
        setIsLoggedIn(false)
      }
    });
  };


  useEffect(() => {
    checkAuthState()
    // console.log(process.env.REACT_APP_FB_apiKey)
  }, [])
  return (
    <AppContext.Provider value={{ students, isLoggedIn, signInWithGoogle, signOutWithGoogle, user }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Choices /> : <Login />}></Route>
          <Route path='/selection' element={isLoggedIn ? <Choices /> : <Login />}></Route>
          <Route path='/attendance' element={isLoggedIn ? <Attendance /> : <Login />}></Route>
          <Route path='/feedback' element={isLoggedIn ? <Feedback /> : <Login />}></Route>
          <Route path='/search' element={isLoggedIn ? <Search /> : <Login />}></Route>
          <Route path='/student-info/:roll' element={isLoggedIn ? <Student_Info /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
