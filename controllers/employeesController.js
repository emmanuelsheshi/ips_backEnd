import { Router } from 'express'
import { db } from './addUserController.js'
import { query, where, getDocs, collection, limit } from 'firebase/firestore'

let router = Router()
let searchResults = []

router.use('/', async (req, res, next) => {
  const q = query(collection(db, 'userData'))
  const querySnapshot = await getDocs(q).then((querySnapshot) => {
    if (!querySnapshot.empty) {
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let user = querySnapshot.docs[i].data()
        searchResults.push(user)
      }
    } else {
      res.render('error', { message: 'no user found' })
    }

    res.json({
      searchResults: searchResults,
      totalSearches: searchResults.length,
    })

    searchResults = []
  })
})

export default router
