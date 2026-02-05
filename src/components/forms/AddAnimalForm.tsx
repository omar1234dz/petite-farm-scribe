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

const animalSchema = z.object({
  type: z.enum(["goat", "chicken", "duck", "bee"], {
    required_error: "اختر نوع الحيوان",
  }),
  name: z.string().trim().min(1, "أدخل اسم أو وصف").max(50, "الاسم طويل جداً"),
  count: z.coerce.number().min(1, "العدد يجب أن يكون 1 على الأقل").max(1000, "العدد كبير جداً"),
  notes: z.string().trim().max(200, "الملاحظات طويلة جداً").optional(),
});

type AnimalFormData = z.infer<typeof animalSchema>;

interface AddAnimalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: AnimalFormData) => void;
}

const animalTypes = [
  { value: "goat", label: "🐐 ماعز" },
  { value: "chicken", label: "🐔 دجاج" },
  { value: "duck", label: "🦆 بط" },
  { value: "bee", label: "🐝 نحل" },
];

export function AddAnimalForm({ open, onOpenChange, onSubmit }: AddAnimalFormProps) {
  const form = useForm<AnimalFormData>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      type: undefined,
      name: "",
      count: 1,
      notes: "",
    },
  });

  const handleSubmit = (data: AnimalFormData) => {
    onSubmit?.(data);
    toast({
      title: "تمت الإضافة",
      description: `تم إضافة ${data.count} ${animalTypes.find(t => t.value === data.type)?.label}`,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة حيوان جديد</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نوع الحيوان</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم / الوصف</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: قطيع الماعز الجديد" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العدد</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
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
                إضافة
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
