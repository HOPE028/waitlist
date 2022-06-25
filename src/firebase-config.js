import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAY5Q0wuMneH3qa5XUHo5PYLKe_1d0Nu4I',
  authDomain: 'daycare-a6fe2.firebaseapp.com',
  projectId: 'daycare-a6fe2',
  storageBucket: 'daycare-a6fe2.appspot.com',
  messagingSenderId: '476464804852',
  appId: '1:476464804852:web:b79b17b327cc37cde23fa1',
  measurementId: 'G-QZGY3GW58W',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const auth = getAuth(app)

export const db = getFirestore(app)
