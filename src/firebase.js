// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPMCIR7xZNCtAoq2JGbpfzYHsFtASwZGQ",
    authDomain: "demomessage-d3678.firebaseapp.com",
    databaseURL: "https://demomessage-d3678-default-rtdb.firebaseio.com",
    projectId: "demomessage-d3678",
    storageBucket: "demomessage-d3678.appspot.com",
    messagingSenderId: "929993693384",
    appId: "1:929993693384:web:99876fd990e0ac9a28edfd",
    measurementId: "G-TDV8TVNW9Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);