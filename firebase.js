import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
  apiKey: 'AIzaSyAxfGqKRH6faCw4KwPrFEeTGwRGY3KVDtg',
  authDomain: 'pr-v9-cf490.firebaseapp.com',
  projectId: 'pr-v9-cf490',
  storageBucket: 'pr-v9-cf490.appspot.com',
  messagingSenderId: '1519311020',
  appId: '1:1519311020:web:3b936455b46fc8e55c6709'
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()
const auth = getAuth()
const provider = new GoogleAuthProvider()
export { app, db, storage, auth, provider }
