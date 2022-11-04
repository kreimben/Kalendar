import firebase from "firebase/compat";
import {getFirestore} from "firebase/firestore";


const app = firebase.initializeApp({
    apiKey: "AIzaSyC9vtG9lonT11N53P95tFp9oo3d5qXclmQ",
    authDomain: "kalendar-a6a87.firebaseapp.com",
    projectId: "kalendar-a6a87",
    storageBucket: "kalendar-a6a87.appspot.com",
    messagingSenderId: "34371345992",
    appId: "1:34371345992:web:94e250389b418c8072827d",
    measurementId: "G-4B30RESNDJ"
});
const db = getFirestore(app);

export {app, db};