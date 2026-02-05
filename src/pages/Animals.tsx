import { useState } from "react";
import { Plus, Bug, Milk } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { AnimalCard } from "@/components/animals/AnimalCard";
import { Button } from "@/components/ui/button";
import { AddAnimalForm } from "@/components/forms/AddAnimalForm";
import { AddProductionForm } from "@/components/forms/AddProductionForm";

// Using Bug as a generic animal icon since lucide doesn't have specific farm animals
const GoatIcon = Bug;
const ChickenIcon = Bug;
const DuckIcon = Bug;
const BeeIcon = Bug;

const animals = [
  {
    id: "1",
    name: "ماعز",
    count: 5,
    icon: GoatIcon,
    todayProduction: "12 لتر حليب",
    feedInfo: "أزولا + شعير مستنبت",
  },
  {
    id: "2",
    name: "دجاج",
    count: 8,
    icon: ChickenIcon,
    todayProduction: "15 بيضة",
    feedInfo: "علف + بقايا خضر",
  },
  {
    id: "3",
    name: "بط",
    count: 2,
    icon: DuckIcon,
    todayProduction: "4 بيضات",
    feedInfo: "أزولا + حبوب",
  },
  {
    id: "4",
    name: "نحل",
    count: 3,
    icon: BeeIcon,
    todayProduction: "—",
    feedInfo: "3 خلايا نشطة",
  },
];

const Animals = () => {
  const [showAddAnimal, setShowAddAnimal] = useState(false);
  const [showAddProduction, setShowAddProduction] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <PageHeader
          title="🐐 الحيوانات"
          subtitle="إدارة ومتابعة حيوانات المزرعة"
          action={
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2" onClick={() => setShowAddProduction(true)}>
                <Milk className="w-4 h-4" />
                إنتاج
              </Button>
              <Button size="sm" className="gap-2" onClick={() => setShowAddAnimal(true)}>
                <Plus className="w-4 h-4" />
                إضافة
              </Button>
            </div>
          }
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card-green text-center p-3">
            <p className="text-2xl font-bold">15</p>
            <p className="text-xs text-muted-foreground">إجمالي</p>
          </div>
          <div className="stat-card-gold text-center p-3">
            <p className="text-2xl font-bold">12L</p>
            <p className="text-xs text-muted-foreground">حليب اليوم</p>
          </div>
          <div className="stat-card-brown text-center p-3">
            <p className="text-2xl font-bold">19</p>
            <p className="text-xs text-muted-foreground">بيض اليوم</p>
          </div>
        </div>

        {/* Animals List */}
        <div className="space-y-4">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              name={animal.name}
              count={animal.count}
              icon={animal.icon}
              todayProduction={animal.todayProduction}
              feedInfo={animal.feedInfo}
            />
          ))}
        </div>

        {/* Feed Info */}
        <div className="mt-6 card-farm p-4">
          <h3 className="font-semibold mb-3">🌿 إنتاج الأعلاف</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-farm-green-light rounded-lg">
              <div>
                <p className="font-medium">الأزولا</p>
                <p className="text-xs text-muted-foreground">إنتاج يومي</p>
              </div>
              <p className="text-lg font-bold text-farm-green">5 كغ</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-farm-gold-light rounded-lg">
              <div>
                <p className="font-medium">الشعير المستنبت</p>
                <p className="text-xs text-muted-foreground">إنتاج يومي</p>
              </div>
              <p className="text-lg font-bold text-farm-gold">8 كغ</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />

      <AddAnimalForm open={showAddAnimal} onOpenChange={setShowAddAnimal} />
      <AddProductionForm open={showAddProduction} onOpenChange={setShowAddProduction} />
    </div>
  );
};

export default Animals;
