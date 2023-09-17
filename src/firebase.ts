
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBzkRtltaUbpt9ctc01l3ojT_texbYXbfU",
  authDomain: "quizapp-d321a.firebaseapp.com",
  projectId: "quizapp-d321a",
  storageBucket: "quizapp-d321a.appspot.com",
  messagingSenderId: "29788668699",
  appId: "1:29788668699:web:b1c7e58f29d3657a8749be",
  measurementId: "G-R7X93SJJLE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
