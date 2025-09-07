'use client'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('No token found. Please log in.')
      return
    }

    fetch('http://173.212.216.102:5000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile')
        return res.json()
      })
      .then(data => {
        if (data.user) setUser(data.user) // remember your API nests user
      })
      .catch(err => setError(err.message))
  }, [])

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Is Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
        <p><strong>Name:</strong> {user.name}</p>
      </div>
    </div>
  )
}
