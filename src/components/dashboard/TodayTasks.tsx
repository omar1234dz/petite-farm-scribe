import { Check, Circle } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: "1", title: "سقي الخضروات", category: "سقي", completed: false },
  { id: "2", title: "إطعام الماعز", category: "تغذية", completed: true },
  { id: "3", title: "جمع البيض", category: "إنتاج", completed: false },
  { id: "4", title: "تقليب الكومبوست", category: "كومبوست", completed: false },
];

export function TodayTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="card-farm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">مهام اليوم</h3>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
              task.completed
                ? "bg-muted/50 opacity-60"
                : "bg-background hover:bg-muted/30"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              task.completed
                ? "bg-primary border-primary"
                : "border-muted-foreground"
            }`}>
              {task.completed && <Check className="w-4 h-4 text-primary-foreground" />}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </p>
              <p className="text-xs text-muted-foreground">{task.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
