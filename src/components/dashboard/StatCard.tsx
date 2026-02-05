import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant: "green" | "brown" | "gold" | "blue";
  onClick?: () => void;
}

const variantStyles = {
  green: "stat-card-green",
  brown: "stat-card-brown",
  gold: "stat-card-gold",
  blue: "stat-card-blue",
};

const iconStyles = {
  green: "icon-circle-green",
  brown: "icon-circle-brown",
  gold: "icon-circle-gold",
  blue: "icon-circle-blue",
};

export function StatCard({ title, value, subtitle, icon: Icon, variant, onClick }: StatCardProps) {
  return (
    <div
      className={`${variantStyles[variant]} cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={iconStyles[variant]}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
