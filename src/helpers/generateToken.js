const jwt = require('jsonwebtoken')

const generateToken = () => {
  const token = jwt.sign(
    {
      data: 'alexis1215'
    },
    process.env.SECRET
    //{ expiresIn: '1m' }
  )

  return token
}

module.exports = generateToken
