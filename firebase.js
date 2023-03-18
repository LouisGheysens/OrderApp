import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBz628lZmDYTlhhVfrVFJUTIQJ86y_-48k",
  authDomain: "todoapp-f4140.firebaseapp.com",
  projectId: "todoapp-f4140",
  storageBucket: "todoapp-f4140.appspot.com",
  messagingSenderId: "871699626578",
  appId: "1:871699626578:web:048b5d6f042f30b6027d8b",
  measurementId: "G-JF37RF5ZS0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
    auth,
    db
}