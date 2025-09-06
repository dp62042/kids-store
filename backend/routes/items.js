const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const protect = require('../middleware/authMiddleware')

// Create item
router.post('/', protect, async (req, res) => {
  const { title, description, price, category, image } = req.body
  try {
    const item = await Item.create({
      title,
      description,
      price,
      category,
      image,
    })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Read items with filters
// Example: /items?category=Toys&minPrice=500&maxPrice=2000&search=car
router.get('/', async (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query
  const filter = {}

  if (category) filter.category = category
  if (minPrice || maxPrice) filter.price = {}
  if (minPrice) filter.price.$gte = Number(minPrice)
  if (maxPrice) filter.price.$lte = Number(maxPrice)
  if (search) filter.title = { $regex: search, $options: 'i' }

  try {
    const items = await Item.find(filter).sort({ createdAt: -1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (e) {
    res.status(404).json({ message: 'Not found' })
  }
})

// Update item
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(item)
  } catch (e) {
    res.status(400).json({ message: 'Update error' })
  }
})

// Delete item
router.delete('/:id', protect, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id)
    res.json({ message: 'deleted' })
  } catch (e) {
    res.status(400).json({ message: 'Delete error' })
  }
})

module.exports = router
