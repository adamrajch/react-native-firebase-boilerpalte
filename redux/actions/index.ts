import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { USER_STATE_CHANGE } from '../constants'

export function fetchUser() {
  return (dispatch: any) => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then(snapshot => {
      if (snapshot.exists()) {
        dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
      } else {
        console.log('does not exist')
      }
    })
  }
}
