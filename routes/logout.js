import { Router } from 'express'
import { getAuth, signOut } from 'firebase/auth'

const router = new Router()

router.use('/', async (req, res, next) => {
  console.log('logout process')
  const auth = getAuth()

  try {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('sign-out successful')
        res.json({ loggout: true })
      })
      .catch((error) => {
        // An error happened.
        console.log('sign-out failed')
        res.json({ loggout: false })
      })
  } catch (error) {
    console.log(error)
  }

  // res.redirect('/index')
})

export default router
