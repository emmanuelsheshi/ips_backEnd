import { Router } from 'express'
let router = Router()

import { db, storage, app } from './addUserController.js'
import { updateDoc, doc, increment } from 'firebase/firestore'

import { ref, getDownloadURL } from 'firebase/storage'

router.use('/', async (req, res, next) => {
  console.log(req.body)
  console.log('update user here')
  let {
    surname,
    firstname,
    phone,
    address,
    employment_status,
    section,
    department,
    job_description,
    penalty,
    bonus,
    account_number,
    bank_code,
    bank_name,
    gross_pay,
  } = req.body

  surname = surname.trim().toLowerCase()
  firstname = firstname.trim().toLowerCase()
  bonus = Number(bonus)
  penalty = Number(penalty)

  const userRef = doc(db, 'userData', `${surname} ${firstname}`)

  // send to file store
  const res2 = await updateDoc(userRef, {
    surname: surname.toLowerCase(),
    first_name: firstname.toLowerCase(),
    phone: phone,
    address: address,
    employment_status: employment_status,
    section: section,
    department: department,
    job_description: job_description,
    account_number: account_number,
    bank_code: bank_code,
    bank_name: bank_name,
    gross_pay: Number(gross_pay),
    date_of_last_payment: '',
    penalty: increment(penalty),
    bonus: increment(bonus),
    current_months_pay: 0,
    net_pay: increment(bonus - penalty),
    // net_pay: admin.firestore.FieldValue.increment(bonus),
  }).catch((err) => {
    console.log('no document found')
    res.render('error', { message: 'no document found' })
  })

  res.redirect('/homePage?username=admin')
})

export default router
