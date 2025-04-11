"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

          <div className="prose prose-lg dark:prose-invert">
            <p className="mb-4">Last Updated: April 5, 2025</p>

            <p className="mb-4">
              Please read these Terms of Service ("Terms") carefully before using the Windows Learning platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the Windows Learning platform, you agree to be bound by these Terms. If you do not
              agree to these Terms, you may not access or use the platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. User Accounts</h2>
            <p className="mb-4">
              To access certain features of the platform, you must register for an account. You agree to provide
              accurate, current, and complete information during the registration process and to update such information
              to keep it accurate, current, and complete.
            </p>
            <p className="mb-4">
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Mentorship Services</h2>
            <p className="mb-4">
              Windows Learning provides a platform for connecting learners with mentors. We do not guarantee the
              quality, accuracy, or appropriateness of any mentor's advice or services.
            </p>
            <p className="mb-4">
              Mentors are independent contractors and not employees of Windows Learning. We are not responsible for any
              disputes between mentors and learners.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Payments and Fees</h2>
            <p className="mb-4">
              Learners agree to pay the fees for mentorship services as specified on the platform. Mentors agree to our
              commission structure for facilitating connections with learners.
            </p>
            <p className="mb-4">
              All payments are processed through our secure payment system. We do not store credit card information.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Cancellation Policy</h2>
            <p className="mb-4">
              Learners may cancel scheduled sessions according to the cancellation policy specified by each mentor.
              Refunds will be issued in accordance with this policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              All content on the Windows Learning platform, including but not limited to text, graphics, logos, and
              software, is the property of Windows Learning or its content suppliers and is protected by copyright laws.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. Privacy Policy</h2>
            <p className="mb-4">
              Your use of the Windows Learning platform is also governed by our Privacy Policy, which can be found{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                here
              </Link>
              .
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              Windows Learning shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of or inability to use the platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
              posting the updated Terms on the platform.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at support@windowslearning.com.
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
