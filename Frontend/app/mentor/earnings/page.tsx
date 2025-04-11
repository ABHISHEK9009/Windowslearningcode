"use client"

import type React from "react"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  ChartContainer,
  ChartTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "@/components/ui/chart"
import { Download, CreditCard, BanknoteIcon as Bank } from "lucide-react"

// Mock data for earnings
const earningsData = [
  { month: "Jan", amount: 15000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 22000 },
  { month: "Apr", amount: 12000 },
]

// Mock data for sessions
const sessionsData = [
  { month: "Jan", sessions: 10 },
  { month: "Feb", sessions: 12 },
  { month: "Mar", sessions: 15 },
  { month: "Apr", sessions: 8 },
]

// Mock data for transactions
const transactions = [
  {
    id: 1,
    type: "earning",
    description: "Session with Priya Sharma",
    amount: 1500,
    date: "2025-04-05",
    status: "completed",
  },
  {
    id: 2,
    type: "earning",
    description: "Session with Rahul Gupta",
    amount: 1200,
    date: "2025-04-03",
    status: "completed",
  },
  {
    id: 3,
    type: "withdrawal",
    description: "Withdrawal to bank account",
    amount: -5000,
    date: "2025-04-01",
    status: "completed",
  },
  {
    id: 4,
    type: "earning",
    description: "Session with Ananya Patel",
    amount: 1300,
    date: "2025-03-28",
    status: "completed",
  },
  {
    id: 5,
    type: "earning",
    description: "Session with Vikram Singh",
    amount: 1800,
    date: "2025-03-25",
    status: "completed",
  },
  {
    id: 6,
    type: "withdrawal",
    description: "Withdrawal to bank account",
    amount: -8000,
    date: "2025-03-20",
    status: "completed",
  },
]

export default function MentorEarningsPage() {
  const { toast } = useToast()
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate total earnings and available balance
  const totalEarnings = transactions.filter((t) => t.type === "earning").reduce((sum, t) => sum + t.amount, 0)

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const availableBalance = totalEarnings - totalWithdrawals

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()

    const amount = Number(withdrawalAmount)

    if (!withdrawalAmount || isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (amount > availableBalance) {
      toast({
        title: "Insufficient balance",
        description: "Your withdrawal amount exceeds your available balance.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Withdrawal initiated!",
        description: `₹${amount} will be transferred to your ${withdrawalMethod === "bank" ? "bank account" : "card"} within 2-3 business days.`,
      })
      setIsSubmitting(false)
      setIsWithdrawModalOpen(false)
      setWithdrawalAmount("")
    }, 1500)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Earnings</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsWithdrawModalOpen(true)}>Withdraw Funds</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{availableBalance.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Available for withdrawal</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setIsWithdrawModalOpen(true)}>
              Withdraw
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{earningsData[3].amount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">From {sessionsData[3].sessions} sessions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Earnings Overview</CardTitle>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip formatter={(value) => [`₹${value}`, "Earnings"]} />
                  <Legend />
                  <Line type="monotone" dataKey="amount" name="Earnings" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sessions Overview</CardTitle>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer>
                <BarChart data={sessionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="sessions" name="Sessions" fill="#82ca9d" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 font-medium border-b">
                <div>Description</div>
                <div className="text-right">Amount</div>
                <div className="text-right">Date</div>
                <div className="text-right">Status</div>
              </div>
              {transactions.map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-4 p-4 border-b last:border-0 items-center">
                  <div>{transaction.description}</div>
                  <div
                    className={`text-right ${transaction.type === "withdrawal" ? "text-destructive" : "text-green-600"}`}
                  >
                    {transaction.type === "withdrawal" ? "-" : "+"}₹{Math.abs(transaction.amount).toLocaleString()}
                  </div>
                  <div className="text-right text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="capitalize">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Withdrawal Modal */}
      <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>Enter the amount you want to withdraw from your available balance.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (₹)</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Available balance: ₹{availableBalance.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Withdrawal Method</label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border rounded-md p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted ${withdrawalMethod === "bank" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setWithdrawalMethod("bank")}
                >
                  <Bank className="h-4 w-4" />
                  <span>Bank Account</span>
                </div>
                <div
                  className={`border rounded-md p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted ${withdrawalMethod === "card" ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setWithdrawalMethod("card")}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Credit/Debit Card</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Withdraw Funds"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
