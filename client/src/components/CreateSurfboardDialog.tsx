import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormData = {
  name: string;
  description?: string;
};

type CreateSurfboardDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormData) => Promise<void>;
};

export default function CreateSurfboardDialog({ open, onOpenChange, onSubmit }: CreateSurfboardDialogProps) {
  const form = useForm<FormData>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Surfboard</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          
          <Button type="submit" className="w-full">
            Create Surfboard
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
