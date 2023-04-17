// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDYEHWIfPna5dTuJzRzsQkq1KgpjW_tQMA',
  authDomain: 'pizzaapp-a2032.firebaseapp.com',
  projectId: 'pizzaapp-a2032',
  storageBucket: 'pizzaapp-a2032.appspot.com',
  messagingSenderId: '1071978676697',
  appId: '1:1071978676697:web:3f2dc9394ae9194f5999c8',
  measurementId: 'G-X48J9YCYH0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
