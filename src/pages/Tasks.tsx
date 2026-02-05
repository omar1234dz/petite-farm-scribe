import { Plus, Check, Clock, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  dueTime?: string;
}

const initialTasks: Task[] = [
  { id: "1", title: "سقي الخضروات", category: "سقي", priority: "high", completed: false, dueTime: "07:00" },
  { id: "2", title: "إطعام الماعز", category: "تغذية", priority: "high", completed: true, dueTime: "06:00" },
  { id: "3", title: "جمع البيض", category: "إنتاج", priority: "medium", completed: false, dueTime: "10:00" },
  { id: "4", title: "تقليب الكومبوست", category: "كومبوست", priority: "low", completed: false },
  { id: "5", title: "فحص خلايا النحل", category: "حيوانات", priority: "medium", completed: false },
  { id: "6", title: "حصاد النعناع", category: "حصاد", priority: "low", completed: false },
  { id: "7", title: "تسميد الطماطم", category: "تسميد", priority: "medium", completed: true },
];

const priorityColors = {
  high: "bg-farm-red-light text-farm-red border-farm-red/30",
  medium: "bg-farm-gold-light text-farm-gold border-farm-gold/30",
  low: "bg-farm-green-light text-farm-green border-farm-green/30",
};

const priorityLabels = {
  high: "عاجل",
  medium: "متوسط",
  low: "عادي",
};

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const urgentCount = tasks.filter(t => !t.completed && t.priority === "high").length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <PageHeader
          title="📋 المهام اليومية"
          subtitle="ماذا تفعل اليوم؟"
          action={
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              مهمة
            </Button>
          }
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card-blue text-center p-3">
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-xs text-muted-foreground">متبقية</p>
          </div>
          <div className="stat-card-green text-center p-3">
            <p className="text-2xl font-bold">{completedCount}</p>
            <p className="text-xs text-muted-foreground">منجزة</p>
          </div>
          <div className="stat-card bg-farm-red-light border-farm-red/30 text-center p-3">
            <p className="text-2xl font-bold">{urgentCount}</p>
            <p className="text-xs text-muted-foreground">عاجلة</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">التقدم اليومي</span>
            <span className="font-medium">{completedCount}/{tasks.length}</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-farm-green rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { key: "all", label: "الكل" },
            { key: "pending", label: "متبقية" },
            { key: "completed", label: "منجزة" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`card-farm p-4 transition-all ${task.completed ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                    task.completed
                      ? "bg-farm-green border-farm-green"
                      : "border-muted-foreground hover:border-farm-green"
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-primary-foreground" />}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${priorityColors[task.priority]}`}>
                      {priorityLabels[task.priority]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{task.category}</span>
                    {task.dueTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.dueTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alerts Section */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-farm-gold" />
            تنبيهات قادمة
          </h3>
          <div className="space-y-2">
            <div className="p-3 bg-farm-gold-light rounded-lg border border-farm-gold/30">
              <p className="text-sm font-medium">تلقيح الماعز</p>
              <p className="text-xs text-muted-foreground">بعد 5 أيام</p>
            </div>
            <div className="p-3 bg-farm-blue-light rounded-lg border border-farm-blue/30">
              <p className="text-sm font-medium">فحص النحل الشهري</p>
              <p className="text-xs text-muted-foreground">بعد أسبوع</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Tasks;
