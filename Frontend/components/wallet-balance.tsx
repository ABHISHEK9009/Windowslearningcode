import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, PlusCircle } from "lucide-react"

interface WalletBalanceProps {
  balance: number
  currency: string
  sessionsAvailable: number
}

export function WalletBalance({ balance, currency, sessionsAvailable }: WalletBalanceProps) {
  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Wallet className="h-4 w-4" />
          Wallet Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {currency}
          {balance.toLocaleString()}
        </div>
        <p className="text-sm text-muted-foreground mt-1">Enough for {sessionsAvailable} sessions</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </CardFooter>
    </Card>
  )
}
