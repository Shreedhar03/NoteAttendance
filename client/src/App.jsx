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
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)

const provider = new GoogleAuthProvider()
// permitted users
const permittedUsers = ["urawane03@gmail.com"]
export const AppContext = createContext()

function App() {
  const [formValues, setFormValues] = useState({
    year: "SE",
    div: "A",
    session: "Theory",
    subject: "DSA",
    labSubject: "DSAL",
    batch: "1"
  })
  const [theorySubjects, setTheorySubjects] = useState([])
  const [batches, setBatches] = useState([])
  const [labSubjects, setLabSubjects] = useState([])
  const [students, setStudents] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [user, setUser] = useState('')
  const [userMessage, setUserMessage] = useState('')

  // Function to handle sign-in
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      if (!permittedUsers.includes(result.user.email)) {
        setUserMessage("Access Denied")
      }
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

  const checkAuthState = () => {
    onAuthStateChanged(auth, user => {
      if (user && permittedUsers.includes(user.email)) {
        setIsLoggedIn(true)
        setUser(user.displayName)
      } else {
        setIsLoggedIn(false)
        // setUserMessage("Login to Continue")
      }
    });
  };

  useEffect(() => {
    checkAuthState()
    // console.log(import.meta.env.VITE_apiKey)
  }, [])
  return (
    <AppContext.Provider value={{
      students,
      setStudents,
      formValues,
      setFormValues,
      theorySubjects,
      setTheorySubjects,
      batches,
      setBatches,
      labSubjects,
      setLabSubjects,
      isLoggedIn,
      userMessage,
      signInWithGoogle,
      signOutWithGoogle,
      user
    }}>
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
