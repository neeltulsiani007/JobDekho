import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDHgFU60IUK9mBVez96QM04NrymBXFNcg",
  authDomain: "otp-for-jd.firebaseapp.com",
  projectId: "otp-for-jd",
  storageBucket: "otp-for-jd.appspot.com",
  messagingSenderId: "260384390385",
  appId: "1:260384390385:web:18a1a2327274d832f7bd50",
  measurementId: "G-TFSQ2YPJSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);