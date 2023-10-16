import { Router } from 'express'
var router = Router()

/* GET users listing. */
router.use('/', async (req, res, next) => {
  res.render('login')
})

export default router
