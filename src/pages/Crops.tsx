import { Plus, TreeDeciduous, Carrot, Wheat, Flower2, Sprout } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "trees", name: "أشجار", icon: TreeDeciduous, count: 12, color: "green" },
  { id: "vegetables", name: "خضروات", icon: Carrot, count: 5, color: "brown" },
  { id: "fodder", name: "أعلاف", icon: Wheat, count: 3, color: "gold" },
  { id: "herbs", name: "أعشاب عطرية", icon: Flower2, count: 4, color: "blue" },
  { id: "nursery", name: "مشتل", icon: Sprout, count: 20, color: "green" },
];

const crops = [
  { id: "1", name: "زيتون", category: "أشجار", area: "500 م²", status: "نمو", plantDate: "2023-01-15" },
  { id: "2", name: "طماطم", category: "خضروات", area: "100 م²", status: "حصاد", plantDate: "2024-03-01" },
  { id: "3", name: "برسيم", category: "أعلاف", area: "200 م²", status: "نمو", plantDate: "2024-09-01" },
  { id: "4", name: "نعناع", category: "أعشاب", area: "20 م²", status: "حصاد", plantDate: "2024-06-01" },
  { id: "5", name: "فلفل حار", category: "خضروات", area: "50 م²", status: "نمو", plantDate: "2024-04-15" },
];

const statusColors: Record<string, string> = {
  "نمو": "bg-farm-green-light text-farm-green",
  "حصاد": "bg-farm-gold-light text-farm-gold",
  "مخطط": "bg-farm-blue-light text-farm-blue",
};

const Crops = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="p-4">
        <PageHeader
          title="🌱 الزراعة"
          subtitle="متابعة المحاصيل والأراضي"
          action={
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              إضافة
            </Button>
          }
        />

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 card-farm p-3 min-w-[100px] text-center cursor-pointer hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                <cat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Crops List */}
        <h3 className="font-semibold mb-3">المحاصيل الحالية</h3>
        <div className="space-y-3">
          {crops.map((crop) => (
            <div key={crop.id} className="card-farm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{crop.name}</h4>
                  <p className="text-sm text-muted-foreground">{crop.category} • {crop.area}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[crop.status]}`}>
                  {crop.status}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  تاريخ الزراعة: {new Date(crop.plantDate).toLocaleDateString('ar-DZ')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Compost Section */}
        <div className="mt-6 card-farm p-4">
          <h3 className="font-semibold mb-3">♻️ الكومبوست</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-farm-brown-light rounded-lg">
              <p className="text-xs text-muted-foreground">في التحضير</p>
              <p className="text-xl font-bold">50 كغ</p>
            </div>
            <div className="p-3 bg-farm-green-light rounded-lg">
              <p className="text-xs text-muted-foreground">جاهز للاستخدام</p>
              <p className="text-xl font-bold">120 كغ</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            آخر تقليب: منذ 3 أيام • الجاهزية المتوقعة: 2 أسبوع
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Crops;
