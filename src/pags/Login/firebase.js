// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq3u08LqshMpYAAKVeJrAHuqzHIm0TolU",
  authDomain: "mobiletodolist-2d1fa.firebaseapp.com",
  projectId: "mobiletodolist-2d1fa",
  storageBucket: "mobiletodolist-2d1fa.appspot.com",
  messagingSenderId: "706134887753",
  appId: "1:706134887753:web:7681aa75363c519d9b1e98"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
