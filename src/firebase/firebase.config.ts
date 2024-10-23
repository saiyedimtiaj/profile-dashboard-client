import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAO_gcEZ8oM6iTkPiSfZR5k7kVNwLAMuE",
  authDomain: "portfolio-f6665.firebaseapp.com",
  projectId: "portfolio-f6665",
  storageBucket: "portfolio-f6665.appspot.com",
  messagingSenderId: "166463152436",
  appId: "1:166463152436:web:f0199586aa69833fddc561",
  measurementId: "G-WE8YJJ82DH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
