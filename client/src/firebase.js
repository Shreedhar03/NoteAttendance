// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup,signOut,onAuthStateChanged, setPersistence,browserLocalPersistence } from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyA_hLvWBiTkdKZ-0_9GER4YGCdWt4lXrno",
//     authDomain: "noteattendance.firebaseapp.com",
//     projectId: "noteattendance",
//     storageBucket: "noteattendance.appspot.com",
//     messagingSenderId: "52025186092",
//     appId: "1:52025186092:web:c57eafa99ec56794453e89",
//     measurementId: "G-G3KCVZMNLG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// setPersistence(auth,browserLocalPersistence)

// const provider = new GoogleAuthProvider()

// // Function to handle sign-in
// export const signInWithGoogle = () => {
//     signInWithPopup(auth, provider).then(result => {
//         // console.log(result)
//     }).catch(err=>{
//         console.log("error signing in")
//     })
// }

// // Function to handle sign-out
// export const signOutWithGoogle = () => {
//     signOut(auth)
//         .then(() => {
//             console.log("Sign-out successful!");
//         })
//         .catch(error => {
//             console.error("Error signing out:", error);
//         });
// };

// export const checkAuthState = () => {
//     onAuthStateChanged(auth, user => {
//         if (user) {
//             // console.log("User is signed in:", user);
//             return true
//         } else {
//             // console.log("User is signed out.");
//             return false
//         }
//     });
// };