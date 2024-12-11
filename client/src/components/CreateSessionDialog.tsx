import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSurfboards } from "@/hooks/use-surfboards";
import { useSessions } from "@/hooks/use-sessions";
import { useToast } from "@/hooks/use-toast";
import CreateSurfboardDialog from "./CreateSurfboardDialog";
import { useState } from "react";

type FormData = {
  location: string;
  highlight: string;
  photo: FileList;
  isPublic: boolean;
  waveConditions: string;
  waveHeight: number;
  surfboardId?: number;
};

type CreateSessionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateSessionDialog({ open, onOpenChange }: CreateSessionDialogProps) {
  const form = useForm<FormData>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { surfboards, createSurfboard } = useSurfboards();
  const { userSessions } = useSessions();
  const lastLocation = userSessions?.[0]?.location;
  const [isCreateSurfboardOpen, setIsCreateSurfboardOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();
      formData.append("location", data.location);
      formData.append("highlight", data.highlight);
      formData.append("isPublic", String(data.isPublic));
      formData.append("waveConditions", data.waveConditions || "");
      formData.append("waveHeight", String(data.waveHeight || ""));
      if (data.surfboardId) {
        formData.append("surfboardId", String(data.surfboardId));
      }
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
              defaultValue={lastLocation}
              {...form.register("location", { required: true })}
            />
            {lastLocation && (
              <p className="text-sm text-muted-foreground">Last session location: {lastLocation}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="waveConditions">Wave Conditions</Label>
            <Input
              id="waveConditions"
              placeholder="e.g., Clean, Choppy, Glassy"
              {...form.register("waveConditions")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waveHeight">Wave Height (ft)</Label>
            <Input
              id="waveHeight"
              type="number"
              step="0.5"
              min="0"
              {...form.register("waveHeight", { 
                valueAsNumber: true,
                min: { value: 0, message: "Wave height must be positive" }
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="surfboard">Surfboard</Label>
            <Select
              value={form.watch("surfboardId")?.toString()}
              onValueChange={(value) => form.setValue("surfboardId", parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a surfboard" />
              </SelectTrigger>
              <SelectContent>
                {surfboards?.map((board) => (
                  <SelectItem key={board.id} value={board.id.toString()}>
                    {board.name}
                  </SelectItem>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsCreateSurfboardOpen(true)}
                >
                  + Add New Surfboard
                </Button>
              </SelectContent>
            </Select>
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
      
      <CreateSurfboardDialog
        open={isCreateSurfboardOpen}
        onOpenChange={setIsCreateSurfboardOpen}
        onSubmit={async (data) => {
          const newBoard = await createSurfboard(data);
          form.setValue("surfboardId", newBoard.id);
          setIsCreateSurfboardOpen(false);
        }}
      />
    </Dialog>
  );
}
