import { Bug, Droplets, Wallet, ClipboardCheck, Leaf, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TodayTasks } from "@/components/dashboard/TodayTasks";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { BottomNav } from "@/components/layout/BottomNav";

const Index = () => {
  const today = new Date().toLocaleDateString('ar-DZ', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="gradient-farm text-primary-foreground p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">مزرعتي 🌿</h1>
            <p className="text-sm opacity-90">{today}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="bg-white/10 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">15</p>
              <p className="text-xs opacity-80">حيوان</p>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs opacity-80">محصول</p>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs opacity-80">مهام</p>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="text-center flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <p className="text-sm font-bold">+15%</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6 -mt-4">
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="الحيوانات"
            value="15"
            subtitle="5 ماعز • 8 دجاج • 2 بط"
            icon={Bug}
            variant="green"
          />
          <StatCard
            title="استهلاك الماء"
            value="450"
            subtitle="لتر اليوم"
            icon={Droplets}
            variant="blue"
          />
          <StatCard
            title="الدخل الشهري"
            value="25,000"
            subtitle="دج"
            icon={Wallet}
            variant="gold"
          />
          <StatCard
            title="المهام المتبقية"
            value="3"
            subtitle="من 7 مهام"
            icon={ClipboardCheck}
            variant="brown"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold text-lg mb-3">إجراءات سريعة</h3>
          <QuickActions />
        </div>

        {/* Today's Tasks */}
        <TodayTasks />

        {/* Recent Activity */}
        <RecentActivity />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
