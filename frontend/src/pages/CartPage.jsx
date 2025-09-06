/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { getCart, removeFromCart } from '../api'
import { motion, AnimatePresence } from 'framer-motion'

// skeleton card (loading state)
const Skeleton = () => (
  <div className="flex items-center justify-between bg-white shadow p-3 rounded animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 bg-gray-200 rounded" />
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="h-6 w-16 bg-gray-200 rounded" />
  </div>
)

export default function CartPage({ setCartCount }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🔹 Load cart from backend if logged in, otherwise from localStorage
  const fetchCart = async () => {
    try {
      setLoading(true)
      setError('')
      const userInfo = localStorage.getItem('userInfo')

      if (userInfo) {
        // Logged in → backend cart
        const { data } = await getCart()
        const cartItems = Array.isArray(data.items) ? data.items : data
        setItems(cartItems)
        setCartCount(cartItems.length)
        localStorage.setItem('cart', JSON.stringify(cartItems)) // sync locally
      } else {
        // Guest → localStorage cart
        const savedCart = JSON.parse(localStorage.getItem('cart')) || []
        setItems(savedCart)
        setCartCount(savedCart.length)
      }
    } catch (e) {
      console.error(e)
      setError('Failed to load cart. Please login again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // 🔹 Remove item from cart
  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem('token')

      if (token) {
        await removeFromCart(itemId)
        fetchCart()
      } else {
        // Guest remove
        const updated = items.filter((i) => i.item._id !== itemId)
        setItems(updated)
        setCartCount(updated.length)
        localStorage.setItem('cart', JSON.stringify(updated))
      }
    } catch (e) {
      console.error(e)
      setError('Failed to remove item.')
    }
  }

  const total = items.reduce(
    (t, i) => t + (i.item?.price || 0) * (i.qty || 1),
    0
  )

  if (loading) {
    return (
      <div className="p-4 max-w-3xl mx-auto space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">{error}</p>
  }

  if (!items.length) {
    return (
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mb-4">
          Add some products to continue shopping.
        </p>
        <a
          href="/products"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded transition"
        >
          Shop Now
        </a>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-3">
        <AnimatePresence>
          {items.map((line) => (
            <motion.div
              key={line._id || line.item._id} // fallback for guest cart
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-between bg-white shadow p-3 rounded hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={line.item?.image}
                  alt={line.item?.title}
                  className="w-14 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{line.item?.title}</p>
                  <p className="text-sm text-gray-600">
                    ₹{line.item?.price} × {line.qty || 1}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(line.item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 bg-white shadow p-4 rounded"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Items ({items.length})</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">₹{total}</span>
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition">
          Proceed to Checkout
        </button>
      </motion.div>
    </div>
  )
}
