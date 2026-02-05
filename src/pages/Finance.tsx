import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { FinanceSummary } from "@/components/finance/FinanceSummary";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: "1", date: "2024-01-15", type: "income", category: "حليب", amount: 3500, description: "بيع 10 لتر حليب" },
  { id: "2", date: "2024-01-14", type: "income", category: "بيض", amount: 1200, description: "بيع 30 بيضة" },
  { id: "3", date: "2024-01-13", type: "expense", category: "علف", amount: 5000, description: "شراء علف شهري" },
  { id: "4", date: "2024-01-12", type: "income", category: "خضر", amount: 2500, description: "بيع طماطم وفلفل" },
  { id: "5", date: "2024-01-11", type: "expense", category: "كهرباء", amount: 1500, description: "فاتورة الكهرباء" },
  { id: "6", date: "2024-01-10", type: "expense", category: "صيانة", amount: 800, description: "إصلاح مضخة الماء" },
];

const categories = [
  { name: "حليب", income: 15000, color: "bg-farm-green" },
  { name: "بيض", income: 8000, color: "bg-farm-gold" },
  { name: "خضر", income: 12000, color: "bg-farm-brown" },
  { name: "شتلات", income: 5000, color: "bg-farm-blue" },
];

const Finance = () => {
  const monthlyIncome = 40000;
  const monthlyExpenses = 15300;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <PageHeader
          title="💰 التكاليف والدخل"
          subtitle="الميزانية الشهرية"
          action={
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة
            </Button>
          }
        />

        {/* Summary */}
        <FinanceSummary income={monthlyIncome} expenses={monthlyExpenses} />

        {/* Income by Category */}
        <div className="mt-6 card-farm p-4">
          <h3 className="font-semibold mb-4">توزيع الدخل</h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="flex-1 text-sm">{cat.name}</span>
                <span className="font-semibold">{cat.income.toLocaleString()} دج</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <h3 className="font-semibold mt-6 mb-3">آخر المعاملات</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="card-farm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'income' ? 'bg-farm-green-light' : 'bg-farm-red-light'
                  }`}>
                    {tx.type === 'income' ? (
                      <TrendingUp className="w-5 h-5 text-farm-green" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-farm-red" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} • {new Date(tx.date).toLocaleDateString('ar-DZ')}</p>
                  </div>
                </div>
                <p className={`font-bold ${tx.type === 'income' ? 'text-farm-green' : 'text-farm-red'}`}>
                  {tx.type === 'income' ? '+' : '-'}{tx.amount.toLocaleString()} دج
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAO Tip */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground">
            📊 <strong>إحصائية FAO:</strong> المزارع الصغيرة التي توثق بياناتها تزيد أرباحها بنسبة 15-25%.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Finance;
