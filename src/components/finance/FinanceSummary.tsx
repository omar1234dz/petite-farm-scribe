import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

interface FinanceSummaryProps {
  income: number;
  expenses: number;
}

export function FinanceSummary({ income, expenses }: FinanceSummaryProps) {
  const profit = income - expenses;
  const isProfit = profit >= 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="stat-card-green p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-farm-green" />
            <span className="text-sm text-muted-foreground">الدخل</span>
          </div>
          <p className="text-xl font-bold text-farm-green">
            {income.toLocaleString()} دج
          </p>
        </div>
        
        <div className="stat-card bg-farm-red-light border-farm-red/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-farm-red" />
            <span className="text-sm text-muted-foreground">المصاريف</span>
          </div>
          <p className="text-xl font-bold text-farm-red">
            {expenses.toLocaleString()} دج
          </p>
        </div>
      </div>
      
      <div className={`card-farm p-4 ${isProfit ? 'bg-farm-green-light' : 'bg-farm-red-light'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className={`w-6 h-6 ${isProfit ? 'text-farm-green' : 'text-farm-red'}`} />
            <span className="font-medium">صافي الربح</span>
          </div>
          <p className={`text-2xl font-bold ${isProfit ? 'text-farm-green' : 'text-farm-red'}`}>
            {isProfit ? '+' : ''}{profit.toLocaleString()} دج
          </p>
        </div>
      </div>
    </div>
  );
}
