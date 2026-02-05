import { LucideIcon } from "lucide-react";

interface AnimalCardProps {
  name: string;
  count: number;
  icon: LucideIcon;
  todayProduction?: string;
  feedInfo?: string;
  onClick?: () => void;
}

export function AnimalCard({ name, count, icon: Icon, todayProduction, feedInfo, onClick }: AnimalCardProps) {
  return (
    <div 
      className="card-farm p-4 cursor-pointer hover:shadow-md transition-all animate-fade-in"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-farm-green-light flex items-center justify-center">
          <Icon className="w-7 h-7 text-farm-green" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-2xl font-bold text-primary">{count}</p>
        </div>
      </div>
      
      {(todayProduction || feedInfo) && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          {todayProduction && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">إنتاج اليوم</span>
              <span className="font-medium">{todayProduction}</span>
            </div>
          )}
          {feedInfo && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">العلف</span>
              <span className="font-medium text-xs">{feedInfo}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
