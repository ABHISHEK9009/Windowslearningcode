"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Windows Learning</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="mb-4">Last Updated: April 5, 2025</p>

            <p className="mb-4">
              This Privacy Policy describes how Windows Learning ("we", "our", or "us") collects, uses, and shares your
              personal information when you use our platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create an account, update your
              profile, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name, email address, and contact information</li>
              <li>Profile information, such as your photo, bio, and expertise</li>
              <li>Payment information (processed securely through our payment processors)</li>
              <li>Communications with mentors, learners, and our support team</li>
            </ul>
            <p className="mb-4">
              We also automatically collect certain information when you use our platform, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Device information (e.g., IP address, browser type)</li>
              <li>Usage data (e.g., pages visited, time spent on the platform)</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our platform</li>
              <li>Process transactions and manage your account</li>
              <li>Connect learners with mentors</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Personalize your experience on our platform</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address fraud and other illegal activities</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing of Information</h2>
            <p className="mb-4">We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>With mentors or learners to facilitate the mentorship relationship</li>
              <li>With service providers who perform services on our behalf</li>
              <li>In response to legal process or when required by law</li>
              <li>In connection with a merger, sale, or acquisition of all or part of our company</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Your Choices</h2>
            <p className="mb-4">
              You can access and update certain information about your account through your profile settings. You can
              also opt out of receiving promotional emails by following the instructions in those emails.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, and
              unauthorized access.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to, and processed in, countries other than the country in which you
              reside. These countries may have data protection laws that are different from the laws of your country.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
              Our platform is not directed to children under the age of 18, and we do not knowingly collect personal
              information from children under 18.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at privacy@windowslearning.com.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Windows Learning Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
