/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getItems, addToCart } from '../api'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import Confetti from 'react-confetti'

// skeleton card (moved outside to avoid re-render)
const Skeleton = () => (
  <div className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
    <div className="h-40 bg-gray-200 rounded-xl mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/4" />
    <div className="h-9 bg-gray-200 rounded-lg mt-3" />
  </div>
)

function ProductsPage({ theme, setCartCount }) {
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState({})
  const [confetti, setConfetti] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getItems(filters)
      setItems(res.data)
    } catch (err) {
      console.error('Error fetching items', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [filters])

  // cleanup confetti timeout
  useEffect(() => {
    let timer
    if (confetti) {
      timer = setTimeout(() => setConfetti(false), 2000)
    }
    return () => clearTimeout(timer)
  }, [confetti])

  const handleAdd = async (id) => {
    try {
      await addToCart(id)
      setCartCount((prev) => prev + 1)
      setConfetti(true)
    } catch (err) {
      console.error('Error adding to cart', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {confetti && <Confetti />}

      {/* page transition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        <Filters setFilters={setFilters} />

        {/* error state */}
        {error && (
          <div className="text-center mt-20 text-red-500 font-medium">
            {error}
          </div>
        )}

        {/* cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center mt-20">
            <img
              src="/empty.svg"
              alt="No items"
              className="w-48 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700">
              No products found
            </h3>
            <p className="text-gray-500">Try changing the filters.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <ProductCard item={item} theme={theme} onAdd={handleAdd} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ProductsPage
