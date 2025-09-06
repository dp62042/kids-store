/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'

function ProductCard({ item, theme, onAdd }) {
  // subtle theme accent (border + button) instead of full bg colour
  const accent = theme === 'toys' ? 'border-yellow-400' : 'border-purple-400'

  return (
    <motion.div
      className={`w-full max-w-xs mx-auto sm:max-w-none
                  p-4 rounded-2xl bg-white shadow-md border-2 ${accent}
                  hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* image */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-40 sm:h-48 object-contain rounded-xl mb-3"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.3 }}
      />

      {/* title */}
      <h3 className="font-bold text-gray-800 text-sm sm:text-base">
        {item.title}
      </h3>

      {/* price */}
      <p className="text-gray-700 text-xs sm:text-sm mt-1">₹{item.price}</p>

      {/* CTA */}
      <motion.button
        className="mt-3 w-full bg-green-500 text-white
                   py-2 rounded-lg shadow-md
                   hover:bg-green-600 active:bg-green-700
                   transition-all duration-200
                   transform hover:scale-105 active:scale-95"
        onClick={() => onAdd(item._id)}
        whileTap={{ scale: 0.95 }}
      >
        Add to Cart
      </motion.button>
    </motion.div>
  )
}

export default ProductCard
