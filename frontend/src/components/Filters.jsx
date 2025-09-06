/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col relative">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

      {/* Selected Value */}
      <div
        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer flex justify-between items-center shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {options.find((opt) => opt.value === value)?.label ||
            `Select ${label}`}
        </span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown List with Animation */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-20 overflow-hidden"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`px-3 py-2 hover:bg-blue-100 cursor-pointer ${
                  value === opt.value ? 'bg-blue-200 font-semibold' : ''
                }`}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Filters({ setFilters }) {
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')

  const applyFilters = () => {
    let minPrice, maxPrice
    if (price === 'low') maxPrice = 1000
    else if (price === 'high') minPrice = 1000
    setFilters({ category, minPrice, maxPrice })
  }

  const clearFilters = () => {
    setCategory('')
    setPrice('')
    setFilters({})
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4 items-end">
        {/* Category Dropdown */}
        <Dropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'Toys', label: 'Toys' },
            { value: 'Merchandise', label: 'Merchandise' },
          ]}
        />

        {/* Price Dropdown */}
        <Dropdown
          label="Price"
          value={price}
          onChange={setPrice}
          options={[
            { value: '', label: 'Any Price' },
            { value: 'low', label: 'Below ₹1000' },
            { value: 'high', label: 'Above ₹1000' },
          ]}
        />

        {/* Apply button */}
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg
                     hover:bg-blue-600 active:bg-blue-700
                     transition-all duration-200 shadow hover:shadow-md"
        >
          Apply
        </button>

        {/* Clear button */}
        <button
          onClick={clearFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg
                     hover:bg-gray-300 active:bg-gray-400
                     transition-all duration-200"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
