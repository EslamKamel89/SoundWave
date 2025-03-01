// Import the functions you need from the SDKs you need
import fb from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBPZXxj-4LrXBCqOXqntGMpoIdYjyYV6ZM',
  authDomain: 'soundwave-3964a.firebaseapp.com',
  projectId: 'soundwave-3964a',
  storageBucket: 'soundwave-3964a.firebasestorage.app',
  // messagingSenderId: '658883628082',
  appId: '1:658883628082:web:84444c160dbd685bfa002b',
};

// Initialize Firebase
export const fbApp = fb.initializeApp(firebaseConfig);
export const fbAuth = getAuth(fbApp);
