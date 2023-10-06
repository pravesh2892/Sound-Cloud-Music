import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuGr1tItPhIi_QRL4e1DY8eEX9ptViOAs",
  authDomain: "soundcloud-clone-8942b.firebaseapp.com",
  projectId: "soundcloud-clone-8942b",
  storageBucket: "soundcloud-clone-8942b.appspot.com",
  messagingSenderId: "859578845103",
  appId: "1:859578845103:web:9769c028cc52b553de115a",
  measurementId: "G-8P1D5FDVC7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
