import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Nav({ theme, setTheme, cartCount }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null)

  // ✅ Sync user state with localStorage on route change
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null)
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setDropdownOpen(false)
    navigate('/login')
  }

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null
  }

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/products" className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-pink-600 mr-2">
              Kids Store
            </h1>
            <span className="text-lg sm:text-xl">
              {theme === 'toys' ? '🎁' : '👕'}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/products"
              className="hover:text-pink-600 transition-colors font-medium"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-pink-50 rounded-full transition-colors"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Theme Switch */}
            <button
              onClick={() => setTheme(theme === 'toys' ? 'merch' : 'toys')}
              className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white px-4 py-2 rounded-full shadow-md transition-all flex items-center"
            >
              {theme === 'toys' ? 'Toys 🌈' : 'Merch 🎨'}
              <span className="ml-2 text-sm">Switch</span>
            </button>

            {/* User / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 bg-pink-100 hover:bg-pink-200 rounded-full font-medium text-pink-700"
                >
                  {user.name || 'User'}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-pink-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-pink-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-4 space-y-2">
              <Link
                to="/products"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-pink-50 font-medium"
              >
                Products
              </Link>

              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-pink-50 relative"
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-pink-500 text-white rounded-full text-xs px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => {
                  setTheme(theme === 'toys' ? 'merch' : 'toys')
                  setIsOpen(false)
                }}
                className="w-full text-left px-3 py-2 rounded-md bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-md"
              >
                Switch to {theme === 'toys' ? 'Merch 🎨' : 'Toys 🌈'}
              </button>

              {user ? (
                <div className="border-t pt-2">
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-pink-50"
                  >
                    Logout ({user.name || 'User'})
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md bg-pink-500 text-white text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
