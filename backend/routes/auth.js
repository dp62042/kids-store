const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function genToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

// register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'User exists' })
    const user = await User.create({ name, email, password })
    res.json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await user.matchPassword(password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })
    res.json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
