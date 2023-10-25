
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBGNH902XvAYsSLQF1g1KBM6DR7j3sz0aw",
  authDomain: "projetotasks-aec60.firebaseapp.com",
  projectId: "projetotasks-aec60",
  storageBucket: "projetotasks-aec60.appspot.com",
  messagingSenderId: "617492570740",
  appId: "1:617492570740:web:dbbb3bca2580a8dc88e721",
  measurementId: "G-WZC3097ZNN"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase;
