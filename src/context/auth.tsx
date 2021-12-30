import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { createUser } from '../hooks/createUser'
import { AuthContext } from './context'

type Props = {
  children?: React.ReactNode
}

// const AuthContext = createContext<any>({})

export function AuthProvider({ children }: Props) {
  const Provider = AuthContext.Provider
  const auth = useProvideAuth()

  //@ts-ignore
  return <Provider value={auth}>{children}</Provider>
}

export const useAuth = () => useContext(AuthContext)

function useProvideAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const user = await formatUser(rawUser)
      const { token, ...userWithoutToken } = user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data())
        setUser(docSnap.data())
      } else {
        createUser(user.uid, userWithoutToken)
        setUser(user)
      }

      setLoading(false)
      return user
    } else {
      setUser(false)

      setLoading(false)
      return false
    }
  }

  const createUserWithEmail = async (email: string, password: string) => {
    setLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        handleUser(userCredential.user)

        return user
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage, errorCode)

        // ..
      })
  }

  const signinWithEmail = (email: string, password: string) => {
    setLoading(true)

    return signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        handleUser(userCredential.user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log(errorMessage, errorCode)
      })
  }

  const signinWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        handleUser(response.user)
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage, errorCode)
      })
  }

  const signout = () => {
    return signOut(auth)
      .then(() => {
        console.log('sucessfully logged out')
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
        console.log(error)
      })
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async user => {
      handleUser(user)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    return () => clearInterval(handle)
  }, [])

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGoogle,
    createUserWithEmail,
    signout,
    setUser,
  }
}
const formatUser = async (user: any) => {
  const token = await user.getIdToken(true)
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  }
}
