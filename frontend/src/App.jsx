import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProductsPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import Nav from './components/Nav'

function App() {
  const [theme, setTheme] = useState('toys')
  const [cartCount, setCartCount] = useState(0)

  return (
    <BrowserRouter>
      <div
        className={
          theme === 'toys'
            ? 'bg-pink-100 min-h-screen'
            : 'bg-blue-100 min-h-screen'
        }
      >
        <Nav theme={theme} setTheme={setTheme} cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/products"
            element={<ProductsPage theme={theme} setCartCount={setCartCount} />}
          />
          <Route
            path="/cart"
            element={<CartPage setCartCount={setCartCount} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
