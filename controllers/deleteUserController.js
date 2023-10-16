import { Router } from 'express'
let router = Router()

import { db, storage, app } from './addUserController.js'
import { updateDoc, doc, increment, deleteDoc } from 'firebase/firestore'

import { ref, deleteObject } from 'firebase/storage'

router.use('/', async (req, res, next) => {
  let { surname, first_name } = req.body  

  console.log('delete user here', surname, first_name)

  const userRef = doc(db, 'userData', `${surname} ${first_name}`)
  const storageRef = ref(storage, `userImages/${surname}-${first_name}.jpg`)

  // send to file store
  try {
    const res2 = await deleteDoc(userRef)
    const res3 = await deleteObject(storageRef).then((res) => console.log(res))
  } catch (err) {
    console.log('an error')
  }
})

export default router
