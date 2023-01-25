import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyABQSYIZJ5MEMepBxqWy2_9lcBQw1uCrSU",
  authDomain: "crud-react-firebase-8926a.firebaseapp.com",
  projectId: "crud-react-firebase-8926a",
  storageBucket: "crud-react-firebase-8926a.appspot.com",
  messagingSenderId: "102342522356",
  appId: "1:102342522356:web:9ba80e09d42bfdc03175a1",
  measurementId: "G-RFT2Z3LD5B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}
