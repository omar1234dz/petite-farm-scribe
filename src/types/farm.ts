export interface Animal {
  id: string;
  type: 'goat' | 'chicken' | 'duck' | 'bee';
  name: string;
  count: number;
  addedDate: string;
  notes: string;
}

export interface AnimalProduction {
  id: string;
  animalId: string;
  date: string;
  quantity: number;
  unit: string;
  feedUsed: string;
}

export interface Crop {
  id: string;
  name: string;
  area: number;
  areaUnit: string;
  plantDate: string;
  category: 'trees' | 'vegetables' | 'fodder' | 'herbs' | 'nursery';
  status: 'growing' | 'harvested' | 'planned';
  expectedYield: number;
  actualYield?: number;
}

export interface WaterLog {
  id: string;
  date: string;
  pumpHours: number;
  estimatedLiters: number;
  notes: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
}

export interface DailyTask {
  id: string;
  date: string;
  title: string;
  category: 'watering' | 'feeding' | 'harvesting' | 'composting' | 'other';
  completed: boolean;
  notes?: string;
}

export interface FarmSummary {
  totalAnimals: number;
  totalCrops: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  waterUsage: number;
  pendingTasks: number;
}
