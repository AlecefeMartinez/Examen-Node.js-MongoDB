const mongoose = require('mongoose')

const { Schema } = mongoose

const musicianModel = new Schema({
  firstName: { type: String, required: true, minLength: 3, maxLength: 30 },
  lastName: { type: String, required: true, minLength: 3, maxLength: 30 },
  instrument: { type: String, required: true },
  orchestra: { type: String, required: true }
})

module.exports = mongoose.model('Musician', musicianModel)
