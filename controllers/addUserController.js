import { Router, json } from 'express'
import { initializeApp } from 'firebase/app'
import { app } from './firebase-config.js'
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, setDoc, doc } from 'firebase/firestore'
import multer, { memoryStorage } from 'multer'

let router = Router()

const db = getFirestore(app)
const storage = getStorage(app)
const upload = multer({ storage: memoryStorage() })

router.use('/', upload.single('upload'), async (req, res, next) => {
  let {
    file_number,
    surname,
    firstname,
    phone,
    address,
    employment_status,
    section,
    department,
    job_description,
    date_of_employment,
    account_number,
    bank_code,
    bank_name,
    gross_pay,
    uploadPix,
  } = req.body

  let penalty = 0
  let bonus = 0

  surname = surname.trim().toLowerCase()
  firstname = firstname.trim().toLowerCase()

  // create the document
  const userRef = doc(db, 'userData', `${surname} ${firstname}`)

  //send to storage
  const storageRef = ref(storage, `userImages/${surname}-${firstname}.jpg`)
  try {
    uploadBytes(storageRef, req.file.buffer).then((snapshot) => {
      console.log('------------------ --------- ---------')
      // console.log(snapshot)
      getDownloadURL(
        ref(storage, `userImages/${surname}-${firstname}.jpg`),
      ).then((downloadURL) => {
        console.log(downloadURL)

        // send to fire store
        const res2 = setDoc(userRef, {
          // file_number: file_number,
          surname: surname,
          first_name: firstname,
          phone: phone,
          address: address,
          employment_status: employment_status,
          id: Math.random(),
          section: section,
          department: department,
          job_description: job_description,
          account_number: account_number,
          bank_code: bank_code,
          bank_name: bank_name,
          gross_pay: Number(gross_pay),
          date_of_employment: date_of_employment,
          date_of_last_payment: '',
          penalty: 0,
          bonus: 0,
          net_pay: Number(gross_pay) + Number(bonus) - Number(penalty),
          imageUrl: downloadURL,
        })
      })
    })
  } catch (err) {
    console.log(err, 'upload did not work')
  }

  res.redirect('/add_user')
})

export { router as addUserController, db, storage, app }
