import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
  const [presentStudents, setPresentStudents] = useState([])
  // const [isLoggedIn, setIsLoggedIn] = useState()
  const [checkLoggedIn,setCheckLoggedIn]=useState(false)
  const [user, setUser] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const goto = useNavigate()


  const checkAuthState = () => {
    onAuthStateChanged(auth, user => {
      if (user && permittedUsers.includes(user.email)) {
        // setIsLoggedIn(true)
        setCheckLoggedIn(true)
        setUser(user.displayName)
        setUserMessage("")
      } else {
        goto('/')
        setCheckLoggedIn(false)
        // setIsLoggedIn(false)
        // setUserMessage("Login to Continue")
      }
    });
  };

  // Function to handle sign-in
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      if (!permittedUsers.includes(result.user.email)) {
        setUserMessage("Access Denied")
        return
      }
      goto('/selection')
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

  useEffect(() => {
    checkAuthState()
    // console.log(import.meta.env.VITE_apiKey)
  }, [])
  return (
    <AppContext.Provider value={{
      goto,
      checkAuthState,
      checkLoggedIn,
      students,
      presentStudents,
      setPresentStudents,
      setStudents,
      formValues,
      setFormValues,
      theorySubjects,
      setTheorySubjects,
      batches,
      setBatches,
      labSubjects,
      setLabSubjects,
      userMessage,
      signInWithGoogle,
      signOutWithGoogle,
      user
    }}>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/selection' element={<Choices />}></Route>
        <Route path='/attendance' element={<Attendance />}></Route>
        <Route path='/feedback' element={<Feedback />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/student-info/:roll' element={<Student_Info />}></Route>
      </Routes>
    </AppContext.Provider>
  )
}

export default App
