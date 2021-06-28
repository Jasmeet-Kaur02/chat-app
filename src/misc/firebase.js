import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAJ4JcOfv7-JEgphK7i5BXyjHhGv58FJwk",
  authDomain: "chat-web-app-567af.firebaseapp.com",
  databaseURL:
    "https://chat-web-app-567af-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-web-app-567af",
  storageBucket: "chat-web-app-567af.appspot.com",
  messagingSenderId: "979200022230",
  appId: "1:979200022230:web:aa252217e6936771eadb77",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
