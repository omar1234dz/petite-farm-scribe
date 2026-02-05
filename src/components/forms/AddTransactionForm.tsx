import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "اختر نوع المعاملة",
  }),
  category: z.string().min(1, "اختر الفئة"),
  amount: z.coerce.number().min(1, "المبلغ يجب أن يكون أكبر من 0").max(100000000, "المبلغ كبير جداً"),
  description: z.string().trim().min(1, "أدخل وصف المعاملة").max(100, "الوصف طويل جداً"),
  notes: z.string().trim().max(200, "الملاحظات طويلة جداً").optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface AddTransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: TransactionFormData) => void;
}

const incomeCategories = [
  { value: "milk", label: "🥛 حليب" },
  { value: "eggs", label: "🥚 بيض" },
  { value: "honey", label: "🍯 عسل" },
  { value: "vegetables", label: "🥬 خضر" },
  { value: "seedlings", label: "🌱 شتلات" },
  { value: "other_income", label: "💰 أخرى" },
];

const expenseCategories = [
  { value: "feed", label: "🌾 علف" },
  { value: "medicine", label: "💊 أدوية" },
  { value: "maintenance", label: "🔧 صيانة" },
  { value: "electricity", label: "⚡ كهرباء" },
  { value: "water", label: "💧 ماء" },
  { value: "seeds", label: "🌰 بذور" },
  { value: "other_expense", label: "📦 أخرى" },
];

export function AddTransactionForm({ open, onOpenChange, onSubmit }: AddTransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: undefined,
      category: "",
      amount: 0,
      description: "",
      notes: "",
    },
  });

  const selectedType = form.watch("type");
  const categories = selectedType === "income" ? incomeCategories : expenseCategories;

  const handleSubmit = (data: TransactionFormData) => {
    onSubmit?.(data);
    toast({
      title: data.type === "income" ? "تم تسجيل الدخل" : "تم تسجيل المصروف",
      description: `${data.amount.toLocaleString()} دج - ${data.description}`,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة معاملة مالية</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع المعاملة</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("category", "");
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">
                        <span className="flex items-center gap-2">
                          <span className="text-farm-green">↑</span> دخل
                        </span>
                      </SelectItem>
                      <SelectItem value="expense">
                        <span className="flex items-center gap-2">
                          <span className="text-farm-red">↓</span> مصروف
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedType && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفئة</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المبلغ (دج)</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: بيع 10 لتر حليب" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="ملاحظات إضافية..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className={`flex-1 ${selectedType === 'income' ? 'bg-farm-green hover:bg-farm-green/90' : selectedType === 'expense' ? 'bg-farm-red hover:bg-farm-red/90' : ''}`}
              >
                {selectedType === "income" ? "تسجيل دخل" : selectedType === "expense" ? "تسجيل مصروف" : "تسجيل"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
