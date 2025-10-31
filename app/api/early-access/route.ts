import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

/**
 * API Route: /api/early-access
 * Handles Early Access Form submissions
 * Stores data in JSON file for tracking
 */

// Define the data structure
interface EarlyAccessSubmission {
  id: string
  email: string
  name: string
  role: string
  shopifyStore?: string
  referralSource: string
  otherSource?: string
  timestamp: string
  userAgent?: string
  language?: string
  ip?: string
}

// Path to store submissions
const getDataFilePath = () => {
  return path.join(process.cwd(), 'data', 'early-access-submissions.json')
}

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Read existing submissions
async function readSubmissions(): Promise<EarlyAccessSubmission[]> {
  try {
    const filePath = getDataFilePath()
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    // File doesn't exist yet, return empty array
    return []
  }
}

// Write submissions to file
async function writeSubmissions(submissions: EarlyAccessSubmission[]) {
  const filePath = getDataFilePath()
  await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf-8')
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// POST: Submit Early Access Form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.name || !body.role || !body.referralSource) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Ensure data directory exists
    await ensureDataDirectory()

    // Read existing submissions
    const submissions = await readSubmissions()

    // Check for duplicate email
    const existingSubmission = submissions.find(
      (sub) => sub.email.toLowerCase() === body.email.toLowerCase()
    )

    if (existingSubmission) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email already registered',
          duplicate: true,
          submissionId: existingSubmission.id
        },
        { status: 200 }
      )
    }

    // Get client IP (for analytics, not stored permanently)
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Create new submission
    const newSubmission: EarlyAccessSubmission = {
      id: generateId(),
      email: body.email.toLowerCase().trim(),
      name: body.name.trim(),
      role: body.role,
      shopifyStore: body.shopifyStore?.trim() || undefined,
      referralSource: body.referralSource,
      otherSource: body.otherSource?.trim() || undefined,
      timestamp: body.timestamp || new Date().toISOString(),
      userAgent: body.userAgent || request.headers.get('user-agent') || undefined,
      language: body.language || request.headers.get('accept-language') || undefined,
      ip: ip, // Store temporarily for analytics
    }

    // Add to submissions
    submissions.push(newSubmission)

    // Write back to file
    await writeSubmissions(submissions)

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Submission received successfully',
        submissionId: newSubmission.id,
        totalSubmissions: submissions.length,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Early Access API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET: Retrieve submissions (for analytics dashboard)
// Protected by simple auth check
export async function GET(request: NextRequest) {
  try {
    // Simple auth check - you should implement proper authentication
    const authHeader = request.headers.get('authorization')
    const expectedAuth = process.env.ADMIN_AUTH_TOKEN || 'dropease-admin-2025'
    
    if (authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Read all submissions
    const submissions = await readSubmissions()

    // Calculate analytics
    const analytics = {
      totalSubmissions: submissions.length,
      byRole: {} as Record<string, number>,
      byReferralSource: {} as Record<string, number>,
      recentSubmissions: submissions.slice(-10).reverse(), // Last 10, newest first
      submissionsByDate: {} as Record<string, number>,
    }

    // Process analytics
    submissions.forEach((sub) => {
      // By role
      analytics.byRole[sub.role] = (analytics.byRole[sub.role] || 0) + 1

      // By referral source
      analytics.byReferralSource[sub.referralSource] = 
        (analytics.byReferralSource[sub.referralSource] || 0) + 1

      // By date
      const date = sub.timestamp.split('T')[0]
      analytics.submissionsByDate[date] = (analytics.submissionsByDate[date] || 0) + 1
    })

    return NextResponse.json({
      success: true,
      analytics,
      submissions: submissions.map(sub => ({
        ...sub,
        ip: undefined, // Don't expose IPs
      })),
    })
  } catch (error) {
    console.error('Early Access GET Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

