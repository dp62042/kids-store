const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Item', itemSchema)
