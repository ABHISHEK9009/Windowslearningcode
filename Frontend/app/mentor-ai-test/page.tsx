"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, AlertCircle } from "lucide-react"

// Mock test data
interface Question {
  id: string
  type: "coding" | "theory"
  prompt: string
}

interface TestData {
  test_id: string
  questions: Question[]
}

export default function MentorAiTestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const webcamRef = useRef<HTMLVideoElement>(null)

  const [testData, setTestData] = useState<TestData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(1200) // 20 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null)
  const [webcamError, setWebcamError] = useState<string | null>(null)

  // Initialize webcam and fetch test
  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setWebcamStream(stream)

        if (webcamRef.current) {
          webcamRef.current.srcObject = stream
        }
      } catch (error) {
        setWebcamError("Unable to access webcam. Please ensure your camera is connected and permissions are granted.")
        console.error("Webcam error:", error)
      }
    }

    const fetchTest = async () => {
      try {
        // Get user expertise from session or local storage
        const expertise = localStorage.getItem("expertise") || "ai"
        const subfield = localStorage.getItem("subfield") || "machine-learning"

        const response = await fetch("/api/mentor/generate-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            field: expertise,
            subfield: subfield,
            difficulty: "Intermediate",
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch test")
        }

        const data = await response.json()
        setTestData(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load test questions. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    initWebcam()
    fetchTest()

    // Cleanup function
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [toast])

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (testData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const captureWebcamFrame = (): string | null => {
    if (!webcamRef.current) return null

    const canvas = document.createElement("canvas")
    canvas.width = webcamRef.current.videoWidth
    canvas.height = webcamRef.current.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height)

    // Get base64 encoded image
    return canvas.toDataURL("image/jpeg")
  }

  const handleSubmitTest = async () => {
    if (!testData) return

    setIsSubmitting(true)

    try {
      // Capture webcam frame for proctoring
      const webcamFrame = captureWebcamFrame()

      const response = await fetch("/api/mentor/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test_id: testData.test_id,
          answers: Object.entries(answers).map(([question_id, value]) => {
            const question = testData.questions.find((q) => q.id === question_id)
            return {
              question_id,
              [question?.type === "coding" ? "code" : "text"]: value,
            }
          }),
          video_proctoring: webcamFrame,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit test")
      }

      const result = await response.json()

      if (result.approved) {
        toast({
          title: "Congratulations!",
          description: `You passed with a score of ${result.score}%. Your mentor profile is now verified.`,
        })
        router.push("/mentor-dashboard")
      } else {
        toast({
          title: "Test not passed",
          description: `Your score was ${result.score}%. You need 80% to pass. ${result.feedback}`,
          variant: "destructive",
        })
        router.push("/mentor-test-failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit test. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your test...</p>
        </div>
      </div>
    )
  }

  if (!testData) {
    return (
      <div className="container mx-auto py-10">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Error Loading Test</CardTitle>
            <CardDescription>We couldn't load your test questions. Please try again later.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/mentor-profile-setup")}>Go Back</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = testData.questions[currentQuestionIndex]

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Expertise Verification Test</CardTitle>
              <CardDescription>Complete all questions to verify your expertise</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className={timeLeft < 60 ? "text-destructive" : ""}>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={((currentQuestionIndex + 1) / testData.questions.length) * 100} className="h-2 mt-4" />
        </CardHeader>
        <CardContent className="space-y-4">
          {webcamError ? (
            <div className="bg-destructive/10 p-4 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Webcam Required</p>
                <p className="text-sm">{webcamError}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">
                    Question {currentQuestionIndex + 1} of {testData.questions.length}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Type: {currentQuestion.type === "coding" ? "Coding Challenge" : "Theory Question"}
                  </p>
                  <div className="p-4 bg-muted rounded-md">
                    <p>{currentQuestion.prompt}</p>
                  </div>
                </div>

                <div>
                  <Textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    placeholder={
                      currentQuestion.type === "coding" ? "Write your code here..." : "Write your answer here..."
                    }
                    className="min-h-[300px] font-mono"
                  />
                </div>
              </div>

              <div className="w-[240px]">
                <div className="rounded-md overflow-hidden bg-black">
                  <video ref={webcamRef} autoPlay muted className="w-full h-auto" />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Webcam proctoring is active</p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>

            {currentQuestionIndex < testData.questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button
                onClick={handleSubmitTest}
                disabled={isSubmitting || Object.keys(answers).length < testData.questions.length}
              >
                {isSubmitting ? "Submitting..." : "Submit Test"}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Tabs defaultValue="questions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="questions">All Questions</TabsTrigger>
                <TabsTrigger value="progress">Your Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="mt-4">
                <div className="grid grid-cols-5 gap-2">
                  {testData.questions.map((question, index) => {
                    const isAnswered = !!answers[question.id]
                    const isCurrent = index === currentQuestionIndex

                    return (
                      <Button
                        key={question.id}
                        variant={isCurrent ? "default" : isAnswered ? "outline" : "ghost"}
                        className={`h-10 ${isCurrent ? "ring-2 ring-primary" : ""}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="mt-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Questions Answered:</span> {Object.keys(answers).length} of{" "}
                    {testData.questions.length}
                  </p>
                  <p>
                    <span className="font-medium">Time Remaining:</span> {formatTime(timeLeft)}
                  </p>
                  <Progress
                    value={(Object.keys(answers).length / testData.questions.length) * 100}
                    className="h-2 mt-2"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
