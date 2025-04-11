"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard, DollarSign, Download, Plus, Wallet } from "lucide-react"
import { ChartContainer, ChartTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "@/components/ui/chart"

// Mock data
const transactions = [
  {
    id: 1,
    type: "payment",
    description: "Session with Dr. Sarah Chen",
    amount: -1500,
    date: "2025-04-02",
    status: "completed",
  },
  {
    id: 2,
    type: "deposit",
    description: "Wallet top-up",
    amount: 5000,
    date: "2025-04-01",
    status: "completed",
  },
  {
    id: 3,
    type: "payment",
    description: "Session with Raj Patel",
    amount: -1200,
    date: "2025-03-25",
    status: "completed",
  },
  {
    id: 4,
    type: "payment",
    description: "Session with Maria Rodriguez",
    amount: -1300,
    date: "2025-03-18",
    status: "completed",
  },
  {
    id: 5,
    type: "deposit",
    description: "Wallet top-up",
    amount: 3000,
    date: "2025-03-15",
    status: "completed",
  },
]

// Spending data
const spendingData = [
  { month: "Jan", amount: 2500 },
  { month: "Feb", amount: 3200 },
  { month: "Mar", amount: 4500 },
  { month: "Apr", amount: 1500 },
]

export default function WalletPage() {
  const [amount, setAmount] = useState("")
  const [addFundsDialogOpen, setAddFundsDialogOpen] = useState(false)

  const walletBalance = transactions.reduce((total, transaction) => total + transaction.amount, 0)

  const formatCurrency = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and transactions</p>
          </div>
          <Dialog open={addFundsDialogOpen} onOpenChange={setAddFundsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Funds to Wallet</DialogTitle>
                <DialogDescription>Enter the amount you want to add to your wallet.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount (₹)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Card</span>
                    </div>
                    <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted">
                      <DollarSign className="h-4 w-4" />
                      <span>UPI</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setAddFundsDialogOpen(false)}>Proceed to Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Wallet className="h-12 w-12 mx-auto text-primary" />
                  <div className="mt-4 text-4xl font-bold">{formatCurrency(walletBalance)}</div>
                  <p className="text-sm text-muted-foreground mt-1">Available for sessions</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="w-full" onClick={() => setAddFundsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip formatter={(value) => [`₹${value}`, "Amount"]} />
                    <Bar dataKey="amount" name="Spending" fill="#8884d8" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Transaction History</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
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
                    <div className={`text-right ${transaction.amount < 0 ? "text-destructive" : "text-green-600"}`}>
                      {transaction.amount < 0 ? "-" : "+"}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-right text-muted-foreground">{formatDate(transaction.date)}</div>
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
      </div>
    </DashboardShell>
  )
}
