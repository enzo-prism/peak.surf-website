import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

type FormData = {
  location: string;
  highlight: string;
  photo: FileList;
  isPublic: boolean;
};

type CreateSessionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateSessionDialog({ open, onOpenChange }: CreateSessionDialogProps) {
  const form = useForm<FormData>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append("location", data.location);
      formData.append("highlight", data.highlight);
      formData.append("isPublic", String(data.isPublic));
      if (data.photo?.[0]) {
        formData.append("photo", data.photo[0]);
      }

      const res = await fetch("/api/sessions", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/public"] });
      onOpenChange(false);
      form.reset();
      toast({
        title: "Success",
        description: "Session created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Session</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...form.register("location", { required: true })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="highlight">Highlight</Label>
            <Textarea
              id="highlight"
              {...form.register("highlight")}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo">Photo</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              {...form.register("photo")}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              checked={form.watch("isPublic") || false}
              onCheckedChange={(checked) => form.setValue("isPublic", checked)}
            />
            <Label htmlFor="isPublic">Make public</Label>
          </div>
          
          <Button type="submit" className="w-full">
            Create Session
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
