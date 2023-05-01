import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { config } from "dotenv";

const emailF = document.getElementById("email")
const pswdF = document.getElementById("pswd")
const loginBtn = document.getElementById("login")

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

loginBtn.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, emailF.nodeValue, pswdF.nodeValue)
  console.log(auth)
})