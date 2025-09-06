import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, signup } from '../api.js'

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await login(form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Login to Toy Store 🎁
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded p-2 mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded p-2 mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signup(form)
      // After successful signup, try to login automatically
      const res = await login({ email: form.email, password: form.password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/products')
    } catch (err) {
      setError(
        err.response?.data?.message || 'Signup failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Join Toy Store 🎁
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border rounded p-2 mb-2"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded p-2 mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded p-2 mb-4"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded transition disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default { LoginPage, SignupPage }
