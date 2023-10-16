import { initializeApp } from 'firebase/app'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA1T_vP5CYn4pqd4GeRd0JTK6WvSXqGd38',
  authDomain: 'imperiummanagmentpayroll.firebaseapp.com',
  projectId: 'imperiummanagmentpayroll',
  storageBucket: 'imperiummanagmentpayroll.appspot.com',
  messagingSenderId: '656612595064',
  appId: '1:656612595064:web:938c60ffd400a5cd19e48d',
  measurementId: 'G-442XZ04NG1',
}

const app = initializeApp(firebaseConfig)

export { app }
