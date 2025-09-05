import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHKBcPFYzVK2u0TndEtrOa-h93_hsM_1c",
  authDomain: "sensorlog-8239c.firebaseapp.com",
  projectId: "sensorlog-8239c",
  storageBucket: "sensorlog-8239c.firebasestorage.app",
  messagingSenderId: "689949834073",
  appId: "1:689949834073:web:e26751e7819c6c7a62ea48",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export { app };
export default firebaseConfig;
