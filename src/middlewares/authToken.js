const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['x-token']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const authenticateRefreshToken = (req, res, next) => {
  const authHeader = req.headers['x-refresh-token']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)
  jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = {
      ...user,
      refreshToken: token
    }
    next()
  })
}

const isAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.is_Admin) {
      next()
    } else {
      res.status(403).json("You are not allowed to do that")
    }
  })
}

module.exports = {
  authenticateToken,
  authenticateRefreshToken,
  isAdmin
}