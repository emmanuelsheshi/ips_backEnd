import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const port = 3001 // formarly 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(
  cors({
    origin: '*',
  }),
)

import loginRouter from './routes/login.js'
import homePageRouter from './routes/homePage.js'
import usersRouter from './routes/addUser.js'
import searchUserRouter from './routes/searchUser.js'
import searchUserController from './controllers/searchUserController.js'
import searchRealTimeController from './controllers/searchRealTimeController.js'

import logoutRouter from './routes/logout.js'
import updateUserRouter from './routes/updateUser.js'
import updateUserController from './controllers/updateUserController.js'

// //controllers
import { addUserController } from './controllers/addUserController.js'
import loginController from './controllers/loginController.js'
import employeeController from './controllers/employeesController.js'
import deleteController from './controllers/deleteUserController.js'

//satic routes for files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))

// view engine setup
app.set('views', './views')
app.set('view engine', 'pug')

//important
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/index', loginRouter)
app.use('/login', loginController)
app.use('/homePage', homePageRouter)
app.use('/add_user', usersRouter)
app.use('/new_user', addUserController)
app.use('/search_user', searchUserRouter)
app.use('/search', searchUserController)
app.use('searchRealTime',searchRealTimeController)
app.use('/update_user', updateUserRouter)
app.use('/update', updateUserController)
app.use('/employees', employeeController)
app.use('/delete', deleteController)
app.use('/logout', logoutRouter)
app.use('/', loginRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('this is a 404 error')
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
