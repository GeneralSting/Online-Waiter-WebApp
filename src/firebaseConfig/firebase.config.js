import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAoVrWcYxsi_SrwJ3lE3F0o83SwvqcN8-A",
  authDomain: "online-waiter-db1c0.firebaseapp.com",
  databaseURL: "https://online-waiter-db1c0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "online-waiter-db1c0",
  storageBucket: "online-waiter-db1c0.appspot.com",
  messagingSenderId: "358595572815",
  appId: "1:358595572815:web:09934c388a84843e9e663a",
  measurementId: "G-V24PSTV06X"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);