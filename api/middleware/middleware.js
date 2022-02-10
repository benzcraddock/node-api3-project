const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`${timestamp} ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    let id = req.params.id
    let user = await User.getById(id)
    if(!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  }
  catch(err) {
    next(err)
  }
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  let name = req.body
  if(!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
