const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  qty: { type: Number, default: 1 },
})

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
