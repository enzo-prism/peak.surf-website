import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { surfboardIcons, getSurfboardEmoji } from "@/lib/surfboard-icons";

type FormData = {
  name: string;
  description?: string;
  icon: string;
};

type CreateSurfboardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => Promise<void>;
};

export default function CreateSurfboardDialog({ open, onOpenChange, onSubmit }: CreateSurfboardDialogProps) {
  const form = useForm<FormData>({
    defaultValues: {
      icon: surfboardIcons[0],
      name: "",
      description: ""
    }
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
      form.reset({ icon: surfboardIcons[0], name: "", description: "" });
    } catch (error) {
      console.error("Failed to create surfboard:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Surfboard</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="My favorite shortboard"
              {...form.register("name", { required: true })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Details about your board"
              {...form.register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label>Board Type</Label>
            <div className="grid grid-cols-4 gap-2">
              {surfboardIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => form.setValue("icon", icon)}
                  className={`p-2 border rounded-md text-center hover:bg-accent transition-colors ${
                    form.watch("icon") === icon ? "border-primary bg-accent" : "border-border"
                  }`}
                >
                  <div className="text-2xl mb-1">
                    {getSurfboardEmoji(icon)}
                  </div>
                  <span className="text-xs capitalize">{icon}</span>
                </button>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Create Surfboard
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
