// api.js
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Attach token automatically
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const { token } = JSON.parse(userInfo)
    if (token) req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

const handleError = (err) => {
  console.error(err.response?.data || err.message)
  throw err.response?.data || err
}

// ================== AUTH ==================
export const login = (data) => API.post('/auth/login', data).catch(handleError)
export const signup = (data) =>
  API.post('/auth/register', data).catch(handleError)

// ================== PRODUCTS ==================
export const getItems = (filters = {}) =>
  API.get('/items', { params: filters }).catch(handleError)

// ================== CART ==================
export const getCart = () => API.get('/cart').catch(handleError)

export const addToCart = (itemId, qty = 1) =>
  API.post('/cart/add', { itemId, qty }).catch(handleError)

export const removeFromCart = (itemId) =>
  API.post('/cart/remove', { itemId }).catch(handleError)

export const clearCart = () => API.post('/cart/clear').catch(handleError)

export const mergeCart = (items) =>
  API.post('/cart/merge', { items }).catch(handleError)
