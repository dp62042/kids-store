const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const Cart = require('../models/Cart')
const mongoose = require('mongoose')
const Item = require('../models/Item')

// Get cart for current user
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.item')
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] })

    // 🧹 remove ghosts (items where item=null after populate)
    const cleanedItems = cart.items.filter((i) => i.item)
    if (cleanedItems.length !== cart.items.length) {
      cart.items = cleanedItems
      await cart.save()
    }

    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Add item
router.post('/add', protect, async (req, res) => {
  console.log('ADD body ➜', req.body)
  const { itemId, qty = 1 } = req.body

  if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).json({ message: 'Invalid or missing itemId' })
  }

  try {
    // ✅ check if Item really exists
    const itemExists = await Item.findById(itemId)
    if (!itemExists) {
      return res.status(404).json({ message: 'Item not found' })
    }

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] })

    // 🧹 clean invalid ghost items before adding
    cart.items = cart.items.filter(
      (i) => i.item && mongoose.Types.ObjectId.isValid(i.item)
    )

    const idx = cart.items.findIndex((i) => i.item.toString() === itemId)
    if (idx > -1) {
      cart.items[idx].qty += qty
    } else {
      cart.items.push({ item: itemId, qty })
    }

    await cart.save()
    cart = await cart.populate('items.item')

    res.json(cart)
  } catch (err) {
    console.error('ADD ERR ➜', err)
    res.status(500).json({ message: err.message })
  }
})

// Remove item
router.post('/remove', protect, async (req, res) => {
  const { itemId } = req.body
  try {
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return res.json({ items: [] })
    cart.items = cart.items.filter((i) => i.item.toString() !== itemId)
    await cart.save()
    cart = await cart.populate('items.item')
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Clear cart
router.post('/clear', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] })
    cart.items = []
    await cart.save()
    res.json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/merge', protect, async (req, res) => {
  try {
    const { items } = req.body
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid cart items' })
    }

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] })
    }

    // Merge logic
    for (const guestItem of items) {
      if (
        !guestItem.item ||
        !mongoose.Types.ObjectId.isValid(guestItem.item) ||
        guestItem.qty <= 0
      ) {
        continue
      }

      const itemExists = await Item.findById(guestItem.item)
      if (!itemExists) continue // skip invalid item

      const idx = cart.items.findIndex(
        (i) => i.item.toString() === guestItem.item
      )
      if (idx > -1) {
        cart.items[idx].qty += guestItem.qty
      } else {
        cart.items.push({ item: guestItem.item, qty: guestItem.qty })
      }
    }

    await cart.save()
    cart = await cart.populate('items.item')

    res.json(cart)
  } catch (err) {
    console.error('MERGE ERR ➜', err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
