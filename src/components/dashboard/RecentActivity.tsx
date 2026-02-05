import { Milk, Egg, Droplets, DollarSign } from "lucide-react";

interface Activity {
  id: string;
  type: "production" | "water" | "income" | "expense";
  title: string;
  value: string;
  time: string;
}

const activities: Activity[] = [
  { id: "1", type: "production", title: "حليب الماعز", value: "12 لتر", time: "منذ ساعة" },
  { id: "2", type: "production", title: "بيض الدجاج", value: "15 بيضة", time: "منذ 2 ساعة" },
  { id: "3", type: "water", title: "ضخ الماء", value: "3 ساعات", time: "منذ 3 ساعات" },
  { id: "4", type: "income", title: "بيع خضروات", value: "+2,500 دج", time: "أمس" },
];

const iconMap = {
  production: Egg,
  water: Droplets,
  income: DollarSign,
  expense: DollarSign,
};

const colorMap = {
  production: "text-farm-gold",
  water: "text-farm-blue",
  income: "text-farm-green",
  expense: "text-farm-red",
};

export function RecentActivity() {
  return (
    <div className="card-farm p-4">
      <h3 className="font-semibold text-lg mb-4">النشاط الأخير</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-2"
            >
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${colorMap[activity.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <span className={`font-semibold text-sm ${activity.type === 'income' ? 'text-farm-green' : ''}`}>
                {activity.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
