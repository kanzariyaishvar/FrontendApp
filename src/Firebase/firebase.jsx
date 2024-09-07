import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Add this to use Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbdOJWlJ2voJLQW0vBB4MUqwvJLLjGa_A",
  authDomain: "myfront-ccc97.firebaseapp.com",
  projectId: "myfront-ccc97",
  storageBucket: "myfront-ccc97.appspot.com",
  messagingSenderId: "123683565606",
  appId: "1:123683565606:web:08d0454375f851a28ef6e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app); // Correctly export Firestore instance as a named export
