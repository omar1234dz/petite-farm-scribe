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

const productionSchema = z.object({
  animalType: z.enum(["goat", "chicken", "duck", "bee"], {
    required_error: "اختر نوع الحيوان",
  }),
  productType: z.string().min(1, "اختر نوع الإنتاج"),
  quantity: z.coerce.number().min(0.1, "الكمية يجب أن تكون أكبر من 0").max(10000, "الكمية كبيرة جداً"),
  unit: z.string().min(1, "اختر الوحدة"),
  feedUsed: z.string().trim().max(100, "النص طويل جداً").optional(),
  notes: z.string().trim().max(200, "الملاحظات طويلة جداً").optional(),
});

type ProductionFormData = z.infer<typeof productionSchema>;

interface AddProductionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: ProductionFormData) => void;
}

const animalTypes = [
  { value: "goat", label: "🐐 ماعز" },
  { value: "chicken", label: "🐔 دجاج" },
  { value: "duck", label: "🦆 بط" },
  { value: "bee", label: "🐝 نحل" },
];

const productTypes: Record<string, { value: string; label: string; units: string[] }[]> = {
  goat: [{ value: "milk", label: "حليب", units: ["لتر", "كغ"] }],
  chicken: [{ value: "eggs", label: "بيض", units: ["بيضة", "طبق"] }],
  duck: [{ value: "eggs", label: "بيض", units: ["بيضة", "طبق"] }],
  bee: [{ value: "honey", label: "عسل", units: ["كغ", "لتر"] }],
};

export function AddProductionForm({ open, onOpenChange, onSubmit }: AddProductionFormProps) {
  const form = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      animalType: undefined,
      productType: "",
      quantity: 0,
      unit: "",
      feedUsed: "",
      notes: "",
    },
  });

  const selectedAnimalType = form.watch("animalType");
  const availableProducts = selectedAnimalType ? productTypes[selectedAnimalType] : [];
  const selectedProduct = form.watch("productType");
  const availableUnits = availableProducts.find(p => p.value === selectedProduct)?.units || [];

  const handleSubmit = (data: ProductionFormData) => {
    onSubmit?.(data);
    toast({
      title: "تم التسجيل",
      description: `تم تسجيل ${data.quantity} ${data.unit}`,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">تسجيل إنتاج</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="animalType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع الحيوان</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("productType", "");
                      form.setValue("unit", "");
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {animalTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedAnimalType && (
              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الإنتاج</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        const product = availableProducts.find(p => p.value === value);
                        if (product?.units[0]) {
                          form.setValue("unit", product.units[0]);
                        }
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الإنتاج" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableProducts.map((product) => (
                          <SelectItem key={product.value} value={product.value}>
                            {product.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكمية</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوحدة</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="الوحدة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="feedUsed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العلف المستخدم (اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: أزولا + شعير مستنبت" {...field} />
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
              <Button type="submit" className="flex-1">
                تسجيل
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
