import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQz_YvX5PTIMiLmfi7Np3HYJYAB-k2rg8",
  authDomain: "videovault-491e4.firebaseapp.com",
  projectId: "videovault-491e4",
  storageBucket: "videovault-491e4.firebasestorage.app",
  messagingSenderId: "Y351269351075",
  appId: "1:351269351075:web:c69819191ac1d4d294d916",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
