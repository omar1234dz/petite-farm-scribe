import { Home, Leaf, Droplets, Wallet, ClipboardList } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "الرئيسية", path: "/" },
  { icon: Leaf, label: "الحيوانات", path: "/animals" },
  { icon: Leaf, label: "الزراعة", path: "/crops" },
  { icon: Droplets, label: "الماء", path: "/water" },
  { icon: Wallet, label: "المالية", path: "/finance" },
  { icon: ClipboardList, label: "المهام", path: "/tasks" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
