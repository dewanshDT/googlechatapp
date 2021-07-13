import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB-X3XnKK8O_jHQDIBFELtuZHD2o4s1SgM",
  authDomain: "chat-app-ebc42.firebaseapp.com",
  projectId: "chat-app-ebc42",
  storageBucket: "chat-app-ebc42.appspot.com",
  messagingSenderId: "834413258",
  appId: "1:834413258:web:9cda8ba0913d9fd044ca33",
});

export default app;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();