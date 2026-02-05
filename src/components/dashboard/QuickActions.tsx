import { Plus, Droplets, Egg, Wheat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickAction {
  icon: typeof Plus;
  label: string;
  onClick: () => void;
}

const actions: QuickAction[] = [
  { icon: Plus, label: "إضافة حيوان", onClick: () => {} },
  { icon: Droplets, label: "تسجيل ماء", onClick: () => {} },
  { icon: Egg, label: "تسجيل إنتاج", onClick: () => {} },
  { icon: Wheat, label: "إضافة محصول", onClick: () => {} },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary/30"
          onClick={action.onClick}
        >
          <action.icon className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
