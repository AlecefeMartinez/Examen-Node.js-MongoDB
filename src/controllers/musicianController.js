const bcrypt = require('bcrypt')
const httpStatus = require('../helpers/httpStatus')

const musicianController = (Musician) => {
  const getAllMusician = async (req, res, next) => {
    try {
      const { query } = req

      const response = await Musician.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const postMusician = async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const musician = await new Musician(encryptedData)

      await musician.save()

      return res.status(httpStatus.CREATED).json(musician)
    } catch (err) {
      next(err)
    }
  }

  const putMusicianById = async (req, res, next) => {
    try {
      const { body, params } = req

      const checkData = await Musician.find({
        _id: params.id
      })

      if (checkData === null) {
        return res
          .status(httpStatus.FORBIDDEN)
          .send('No data found with the provided ID.')
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await Musician.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            instrument: body.instrument,
            orchestra: body.orchestra
          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated.')
    } catch (err) {
      next(err)
    }
  }

  const getMusicianById = async (req, res, next) => {
    try {
      const { params } = req

      const response = await Musician.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const deleteMusicianById = async (req, res, next) => {
    try {
      const { params } = req

      await Musician.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted.')
    } catch (err) {
      next(err)
    }
  }

  return {
    getAllMusician,
    getMusicianById,
    postMusician,
    putMusicianById,
    deleteMusicianById
  }
}

module.exports = musicianController
