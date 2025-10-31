'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Globe, Calendar, RefreshCw, Download } from 'lucide-react'

/**
 * Admin Analytics Dashboard
 * View early access signups and conversion metrics
 * Protected by simple auth token
 */

interface Analytics {
  totalSubmissions: number
  byRole: Record<string, number>
  byReferralSource: Record<string, number>
  recentSubmissions: Array<{
    id: string
    email: string
    name: string
    role: string
    referralSource: string
    timestamp: string
  }>
  submissionsByDate: Record<string, number>
}

interface Submission {
  id: string
  email: string
  name: string
  role: string
  shopifyStore?: string
  referralSource: string
  otherSource?: string
  timestamp: string
}

export default function AnalyticsPage() {
  const [authToken, setAuthToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check for saved auth token
  useEffect(() => {
    const savedToken = localStorage.getItem('admin_auth_token')
    if (savedToken) {
      setAuthToken(savedToken)
      fetchAnalytics(savedToken)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetchAnalytics(authToken)
  }

  const fetchAnalytics = async (token: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/early-access', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        setError('Invalid auth token')
        setIsAuthenticated(false)
        localStorage.removeItem('admin_auth_token')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const data = await response.json()
      setAnalytics(data.analytics)
      setSubmissions(data.submissions)
      setIsAuthenticated(true)
      localStorage.setItem('admin_auth_token', token)
    } catch (err) {
      console.error(err)
      setError('Error loading analytics')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAuthToken('')
    setAnalytics(null)
    setSubmissions([])
    localStorage.removeItem('admin_auth_token')
  }

  const exportCSV = () => {
    if (!submissions.length) return

    const headers = ['ID', 'Email', 'Name', 'Role', 'Shopify Store', 'Referral Source', 'Other Source', 'Timestamp']
    const rows = submissions.map(sub => [
      sub.id,
      sub.email,
      sub.name,
      sub.role,
      sub.shopifyStore || '',
      sub.referralSource,
      sub.otherSource || '',
      new Date(sub.timestamp).toLocaleString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dropease-early-access-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-dark-secondary rounded-2xl border border-white/10 p-8"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">
            <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h1>
          <p className="text-gray-400 text-center mb-8">Early Access Tracking</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-300 mb-2">
                Auth Token
              </label>
              <input
                type="password"
                id="token"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark border border-white/10 text-white placeholder-gray-500 focus:border-accent-violet focus:outline-none focus:ring-2 focus:ring-accent-violet/50"
                placeholder="Enter admin auth token"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent-violet to-accent-cyan font-semibold text-white hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-500 text-center">
            Default token: <code className="bg-dark px-2 py-1 rounded">dropease-admin-2025</code>
          </p>
        </motion.div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Analytics Dashboard
              </span>
            </h1>
            <p className="text-gray-400">Dropease Early Access Tracking</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => fetchAnalytics(authToken)}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-dark-surface border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-lg bg-dark-surface border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-secondary rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-accent-cyan" />
                <span className="text-3xl font-bold">{analytics.totalSubmissions}</span>
              </div>
              <p className="text-gray-400 text-sm">Total Signups</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-secondary rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-3xl font-bold">
                  {analytics.recentSubmissions.length > 0 ? '↑' : '-'}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Recent Activity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-secondary rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-8 h-8 text-accent-violet" />
                <span className="text-3xl font-bold">
                  {Object.keys(analytics.byReferralSource).length}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Referral Sources</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-secondary rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-yellow-500" />
                <span className="text-3xl font-bold">
                  {Object.keys(analytics.submissionsByDate).length}
                </span>
              </div>
              <p className="text-gray-400 text-sm">Active Days</p>
            </motion.div>
          </div>
        )}

        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* By Role */}
            <div className="bg-dark-secondary rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Signups by Role</h3>
              <div className="space-y-3">
                {Object.entries(analytics.byRole).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{role.replace('-', ' ')}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                          style={{
                            width: `${(count / analytics.totalSubmissions) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-white font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Referral Source */}
            <div className="bg-dark-secondary rounded-xl border border-white/10 p-6">
              <h3 className="text-xl font-bold mb-4">Referral Sources</h3>
              <div className="space-y-3">
                {Object.entries(analytics.byReferralSource).map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{source}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet"
                          style={{
                            width: `${(count / analytics.totalSubmissions) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-white font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Recent Submissions */}
        {analytics && analytics.recentSubmissions.length > 0 && (
          <div className="bg-dark-secondary rounded-xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Recent Signups</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.recentSubmissions.map((sub) => (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">{sub.name}</td>
                      <td className="py-3 px-4 text-gray-400">{sub.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded bg-accent-violet/20 text-accent-violet text-xs">
                          {sub.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{sub.referralSource}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(sub.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

