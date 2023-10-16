import { Router } from 'express'
import { db } from './addUserController.js'
import { query, where, getDocs, collection } from 'firebase/firestore'
import { reauthenticateWithRedirect } from 'firebase/auth'
import { parse } from 'url'
let router = Router()

let searchResults = []

router.use('/', async (req, res, next) => {
  console.log('in the realtime search')
  let search_key = req.body
  console.log(search_key)

  //   const q = query(
  //     collection(db, 'userData'),
  //     where(`${search_by}`, 'in', [`${search_key}`]),
  //   )

  //   const querySnapshot = await getDocs(q).then((querySnapshot) => {
  //     if (!querySnapshot.empty) {
  //       for (let i = 0; i < querySnapshot.docs.length; i++) {
  //         let user = querySnapshot.docs[i].data()
  //         searchResults.push(user)
  //       }
  //     } else {
  //       res.render('error', { message: 'no user found' })
  //     }

  //     // console.log(searchResults)

  //     res.json({
  //       searchResults: searchResults,
  //       totalSearches: searchResults.length,
  //     })

  //     searchResults = []
  //   })
})

export default router
