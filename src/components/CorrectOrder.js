import { db } from '../firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
} from 'firebase/firestore'

export default function CorrectOrder(ageGroup, waitlist, order) {
  waitlist.map((child) => {
    if (child.order <= order) {
      return child
    }

    const childRef = doc(db, ageGroup, child.id)

    const updateOrder = async () => {
      await updateDoc(childRef, {
        order: increment(-1),
      })
    }

    try {
      updateOrder()
    } catch (error) {
      console.log(error)
    }

    return child
  })
}
