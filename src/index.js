const express = require('express')
const cors = require('cors')
const People = require('./models/peopleModel')
const Musician = require('./models/musicianModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const authRouter = require('./routes/authRouter')(People)
const musicianRouter = require('./routes/musicianRouter')(Musician)
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')
require('dotenv').config()
const { expressjwt } = require('express-jwt')
const PORT = process.env.PORT || 5000

const app = express()

require('./database/db')

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.all(
  '/*',
  expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
    path: ['/auth/login', '/auth/register', '/api/musician', '/api/people']
  })
)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).json({
      error: err.name,
      cause: 'Unauthorized. Missing or invalid token provided.'
    })
  } else {
    next(err)
  }
})

app.use('/api', peopleRouter, musicianRouter)
app.use('/', authRouter)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log('Server is running.')
})
