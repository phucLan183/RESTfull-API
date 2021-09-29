const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashPassword,
    })
    const userData = await user.save()
    res.status(200).json({
      status: 'success',
      userData: userData
    })

  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body
    const checkUser = await User.findOne({ username: username })
    if (!checkUser) {
      return res.status(404).json({
        status: 'false',
        message: 'Username or password incorrect',
      })
    }
    const comparePass = await bcrypt.compare(password, checkUser.password)
    if (!comparePass) {
      return res.status(404).json({
        status: 'false',
        message: 'Username or password incorrect',
      })
    }
    const accessToken = jwt.sign({
      id: checkUser._id,
      username: checkUser.username,
      is_Admin: checkUser.is_Admin
    }, process.env.ACCESS_TOKEN, {
      expiresIn: '30m'
    });

    const refreshToken = jwt.sign({
      id: checkUser._id,
      username: checkUser.username,
    }, process.env.REFRESH_TOKEN, {
      expiresIn: '7d'
    });

    const updateRefreshToken = await User.updateOne({
      _id: checkUser._id
    }, {
      $push: {
        refreshToken: refreshToken
      }
    });

    return res.json({
      status: 'success',
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const userLogout = async (req, res) => {
  try {
    await User.updateOne({
      username: req.user.username
    }, {
      $set: {
        refreshToken: []
      }
    })
    res.status(200).json({
      success: "success",
      response: {},
    })
  } catch (error) {
    res.status(500).json({
      status: 'false',
      message: error.message,
    })
  }
}

const accessToken = async (req, res) => {
  if (req.user.id) {
    res.json({
      status: 'success'
    });
  } else {
    res.json({
      status: 'false'
    });
  };
}

const refreshToken = async (req, res) => {
  const user = {
    username: req.user.username,
    refreshToken: req.user.refreshToken
  }
  if (user.refreshToken == null) {
    return res.sendStatus(401)
  }
  const dataUser = await User.findOne({
    username: user.username
  })
  const storageRefreshToken = dataUser.refreshToken

  if (!storageRefreshToken.includes(user.refreshToken)) {
    return res.sendStatus(403)
  }
  const token = jwt.sign({
    id: dataUser._id,
    username: dataUser.username,
    is_Admin: dataUser.is_Admin
  }, process.env.ACCESS_TOKEN, {
    expiresIn: "10m"
  })

  res.json({
    success: "success",
    message: {
      token
    }
  })
}


module.exports = {
  userRegister: userRegister,
  userLogin: userLogin,
  userLogout: userLogout,
  accessToken: accessToken,
  refreshToken: refreshToken,
}