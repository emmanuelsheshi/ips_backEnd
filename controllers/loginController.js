import { Router } from 'express'
let router = Router()

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth'

const auth = getAuth()
setPersistence(auth, browserSessionPersistence)

router.use('/', async (req, res, next) => {
  const { email, password } = req.body

  console.log(req.body)

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log('successfully signed in')
      res.json({ login: true })
    })
    .catch((error) => {
      res.json({ login: false })
      console.log('this is an error')
    })
})
export default router
