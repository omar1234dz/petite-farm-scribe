import { Plus, Droplets, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";

const waterLogs = [
  { id: "1", date: "2024-01-15", hours: 3, liters: 450, notes: "سقي عام" },
  { id: "2", date: "2024-01-14", hours: 2.5, liters: 375, notes: "سقي الخضروات" },
  { id: "3", date: "2024-01-13", hours: 4, liters: 600, notes: "سقي كامل + ملء الخزان" },
  { id: "4", date: "2024-01-12", hours: 2, liters: 300, notes: "سقي الأشجار" },
];

const Water = () => {
  const avgDaily = 430;
  const todayUsage = 450;
  const weeklyTotal = waterLogs.reduce((sum, log) => sum + log.liters, 0);
  
  const isHighUsage = todayUsage > avgDaily * 1.2;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <PageHeader
          title="💧 إدارة الماء"
          subtitle="مصدر: بئر • متابعة الاستهلاك"
          action={
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              تسجيل
            </Button>
          }
        />

        {/* Today's Usage */}
        <div className={`card-farm p-5 mb-6 ${isHighUsage ? 'bg-farm-red-light border-farm-red/30' : 'bg-farm-blue-light border-farm-blue/30'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">استهلاك اليوم</p>
              <p className="text-3xl font-bold">{todayUsage} لتر</p>
              <p className="text-sm mt-1">
                {isHighUsage ? (
                  <span className="text-farm-red flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    أعلى من المعدل بـ {Math.round((todayUsage / avgDaily - 1) * 100)}%
                  </span>
                ) : (
                  <span className="text-farm-green flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    ضمن المعدل الطبيعي
                  </span>
                )}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-farm-blue/20 flex items-center justify-center">
              <Droplets className="w-8 h-8 text-farm-blue" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card-blue text-center p-3">
            <p className="text-xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">ساعات ضخ</p>
          </div>
          <div className="stat-card-blue text-center p-3">
            <p className="text-xl font-bold">{avgDaily}</p>
            <p className="text-xs text-muted-foreground">معدل يومي</p>
          </div>
          <div className="stat-card-blue text-center p-3">
            <p className="text-xl font-bold">{weeklyTotal}</p>
            <p className="text-xs text-muted-foreground">أسبوعي</p>
          </div>
        </div>

        {/* Alert */}
        {isHighUsage && (
          <div className="bg-farm-gold-light border border-farm-gold/30 rounded-xl p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-farm-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">تنبيه: استهلاك مرتفع</p>
              <p className="text-xs text-muted-foreground mt-1">
                الاستهلاك اليوم أعلى من المعتاد. تحقق من وجود تسريبات أو احتياجات استثنائية.
              </p>
            </div>
          </div>
        )}

        {/* Water Logs */}
        <h3 className="font-semibold mb-3">سجل الضخ</h3>
        <div className="space-y-3">
          {waterLogs.map((log) => (
            <div key={log.id} className="card-farm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{log.notes}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(log.date).toLocaleDateString('ar-DZ')}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold text-farm-blue">{log.liters} لتر</p>
                  <p className="text-xs text-muted-foreground">{log.hours} ساعات</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-sm text-muted-foreground">
            💡 <strong>نصيحة:</strong> في بوسعادة، الماء ثمين. استخدم الري بالتنقيط وأعد تدوير مياه الغسيل للأشجار.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Water;
