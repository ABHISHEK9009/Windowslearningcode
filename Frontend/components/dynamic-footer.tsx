"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface FooterMetrics {
  mentors: number
  successRate: number
  activeLearners: number
}

export function DynamicFooter() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [metrics, setMetrics] = useState<FooterMetrics>({
    mentors: 0,
    successRate: 0,
    activeLearners: 0,
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics")
        if (response.ok) {
          const data = await response.json()
          setMetrics(data)
        }
      } catch (error) {
        console.error("Failed to fetch metrics:", error)
      }
    }

    fetchMetrics()
  }, [])

  return (
    <footer className="bg-[#004d40] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Windows Learning</h3>
            <p className="text-sm text-gray-300 mb-4">
              Connect with expert mentors and accelerate your learning journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">For Learners</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/find-mentors" className="text-gray-300 hover:text-white hover:underline">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link href="/skill-assessment" className="text-gray-300 hover:text-white hover:underline">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link href="/learner/dashboard" className="text-gray-300 hover:text-white hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/learner/sessions" className="text-gray-300 hover:text-white hover:underline">
                  My Sessions
                </Link>
              </li>
              <li>
                <Link href="/learner/wallet" className="text-gray-300 hover:text-white hover:underline">
                  Wallet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">For Mentors</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/become-mentor" className="text-gray-300 hover:text-white hover:underline">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link href="/mentor/earnings" className="text-gray-300 hover:text-white hover:underline">
                  Earnings
                </Link>
              </li>
              <li>
                <Link href="/mentor/sessions" className="text-gray-300 hover:text-white hover:underline">
                  Sessions
                </Link>
              </li>
              <li>
                <Link href="/mentor/resources" className="text-gray-300 hover:text-white hover:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/mentor/dashboard" className="text-gray-300 hover:text-white hover:underline">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Live Metrics</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-teal-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="font-bold">{metrics.mentors.toLocaleString()}+</span>
                </div>
                <span>Active Mentors</span>
              </li>
              <li className="flex items-center">
                <div className="bg-teal-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="font-bold">{metrics.successRate}%</span>
                </div>
                <span>Success Rate</span>
              </li>
              <li className="flex items-center">
                <div className="bg-teal-600 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="font-bold">{metrics.activeLearners.toLocaleString()}+</span>
                </div>
                <span>Active Learners</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-teal-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">© 2025 Windows Learning Platform. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/about" className="text-sm text-gray-300 hover:text-white hover:underline">
                About
              </Link>
              <Link href="/privacy" className="text-sm text-gray-300 hover:text-white hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white hover:underline">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-gray-300 hover:text-white hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
