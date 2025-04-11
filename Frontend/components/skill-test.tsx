"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Clock } from "lucide-react"

interface SkillTestComponentProps {
  onComplete: (passed: boolean, score: number) => void
}

// Mock questions for the skill test
const questions = [
  {
    id: 1,
    question: "What is the correct way to create a functional component in React?",
    options: [
      { id: "a", text: "function MyComponent() { return <div>Hello</div>; }" },
      { id: "b", text: "class MyComponent { render() { return <div>Hello</div>; } }" },
      { id: "c", text: "const MyComponent = () => { <div>Hello</div> }" },
      { id: "d", text: "function MyComponent { return <div>Hello</div>; }" },
    ],
    correctAnswer: "a",
  },
  {
    id: 2,
    question: "Which hook is used to perform side effects in a function component?",
    options: [
      { id: "a", text: "useState" },
      { id: "b", text: "useEffect" },
      { id: "c", text: "useContext" },
      { id: "d", text: "useReducer" },
    ],
    correctAnswer: "b",
  },
  {
    id: 3,
    question: "How would you optimize a slow React component?",
    options: [
      { id: "a", text: "Use React.memo" },
      { id: "b", text: "Switch to Angular" },
      { id: "c", text: "Always use class components" },
      { id: "d", text: "Add more state variables" },
    ],
    correctAnswer: "a",
  },
  {
    id: 4,
    question: "What is the purpose of the key prop when rendering lists in React?",
    options: [
      { id: "a", text: "It's required for all JSX elements" },
      { id: "b", text: "It helps React identify which items have changed, been added, or been removed" },
      { id: "c", text: "It's used for styling purposes" },
      { id: "d", text: "It's used to access elements directly from the DOM" },
    ],
    correctAnswer: "b",
  },
  {
    id: 5,
    question: "What is the correct way to update state based on the previous state in React?",
    options: [
      { id: "a", text: "this.state.count = this.state.count + 1" },
      { id: "b", text: "setState({ count: count + 1 })" },
      { id: "c", text: "setState(prevState => ({ count: prevState.count + 1 }))" },
      { id: "d", text: "this.setState({ count: this.state.count++ })" },
    ],
    correctAnswer: "c",
  },
  {
    id: 6,
    question: "Which of the following is NOT a React hook?",
    options: [
      { id: "a", text: "useEffect" },
      { id: "b", text: "useState" },
      { id: "c", text: "useHistory" },
      { id: "d", text: "useComponent" },
    ],
    correctAnswer: "d",
  },
  {
    id: 7,
    question: "What is the purpose of React's useCallback hook?",
    options: [
      { id: "a", text: "To create a memoized callback that only changes if one of the dependencies has changed" },
      { id: "b", text: "To call a function after every render" },
      { id: "c", text: "To create a new function on every render" },
      { id: "d", text: "To replace the useEffect hook" },
    ],
    correctAnswer: "a",
  },
  {
    id: 8,
    question: "What is the correct way to pass data from a parent component to a child component in React?",
    options: [
      { id: "a", text: "Using global variables" },
      { id: "b", text: "Using props" },
      { id: "c", text: "Using the state hook in the child component" },
      { id: "d", text: "Using the context API for all component communication" },
    ],
    correctAnswer: "b",
  },
  {
    id: 9,
    question: "What is the purpose of React's StrictMode?",
    options: [
      { id: "a", text: "To enforce type checking at runtime" },
      { id: "b", text: "To make your application faster" },
      { id: "c", text: "To highlight potential problems in an application" },
      { id: "d", text: "To prevent users from accessing certain features" },
    ],
    correctAnswer: "c",
  },
  {
    id: 10,
    question: "Which method is NOT part of the React component lifecycle?",
    options: [
      { id: "a", text: "componentDidMount" },
      { id: "b", text: "componentWillUpdate" },
      { id: "c", text: "componentDidRender" },
      { id: "d", text: "componentWillUnmount" },
    ],
    correctAnswer: "c",
  },
]

export function SkillTestComponent({ onComplete }: SkillTestComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [testSubmitted, setTestSubmitted] = useState(false)
  const { toast } = useToast()

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || testSubmitted) {
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, testSubmitted])

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && !testSubmitted) {
      handleSubmitTest()
    }
  }, [timeLeft, testSubmitted])

  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    setTestSubmitted(true)

    // Calculate score
    let correctAnswers = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = (correctAnswers / questions.length) * 100
    const passed = score >= 80

    onComplete(passed, score)
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Skill Test</h2>
          <p className="text-sm text-muted-foreground">
            Complete this test to verify your skills. You need 80% to pass.
          </p>
        </div>
        <div className="flex items-center gap-2 text-lg font-mono">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className={timeLeft < 60 ? "text-destructive" : ""}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              {Object.keys(answers).length} of {questions.length} answered
            </span>
          </CardTitle>
          <CardDescription className="text-lg font-medium text-foreground">{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswerSelect(question.id, value)}
          >
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-start space-x-2">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="font-normal cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion < questions.length - 1 ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button onClick={handleSubmitTest} disabled={Object.keys(answers).length < questions.length}>
                Submit Test
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-wrap gap-2 justify-center">
        {questions.map((_, index) => (
          <Button
            key={index}
            variant={answers[questions[index].id] ? "default" : "outline"}
            size="sm"
            className="w-10 h-10 p-0"
            onClick={() => setCurrentQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}
