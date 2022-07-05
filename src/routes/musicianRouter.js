const express = require('express')
const musicianController = require('../controllers/musicianController')
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/peopleBodyValidator')

const router = (Musician) => {
  const musicianRouter = express.Router()

  const {
    getAllMusician,
    getMusicianById,
    postMusician,
    putMusicianById,
    deleteMusicianById
  } = musicianController(Musician)

  musicianRouter
    .route('/musician')
    .get(getAllMusician)
    .post(validator.body(bodySchema), postMusician)

  musicianRouter
    .route('/musician/:id')
    .get(getMusicianById)
    .put(validator.body(bodySchema), putMusicianById)
    .delete(deleteMusicianById)

  return musicianRouter
}

module.exports = router
