import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSurfboards } from "@/hooks/use-surfboards";
import { useSessions } from "@/hooks/use-sessions";
import { useToast } from "@/hooks/use-toast";
import CreateSurfboardDialog from "@/components/CreateSurfboardDialog";
import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

type FormData = {
  location: string;
  highlight: string;
  photo: FileList;
  isPublic: boolean;
  waveConditions: string;
  waveHeight: number;
  surfboardId?: number;
  surfFriends: string[];
};

export default function CreateSessionPage() {
  const form = useForm<FormData>({
    defaultValues: {
      surfFriends: [],
    },
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { surfboards, createSurfboard } = useSurfboards();
  const { userSessions } = useSessions();
  const lastLocation = userSessions?.[0]?.location;
  const [isCreateSurfboardOpen, setIsCreateSurfboardOpen] = useState(false);
  const [, setLocation] = useLocation();

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
      if (data.surfFriends?.length) {
        formData.append("surfFriends", JSON.stringify(data.surfFriends));
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
      setLocation("/");
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-medium">New Session</h1>
        </div>
      </header>

      <main className="container px-6 md:px-8 lg:px-12 py-8 max-w-3xl mx-auto">
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="location" className="text-base">Location</Label>
            <Input
              id="location"
              defaultValue={lastLocation}
              className="h-11"
              {...form.register("location", { required: true })}
            />
            {lastLocation && (
              <p className="text-sm text-muted-foreground mt-2">Last session location: {lastLocation}</p>
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
          
          <div className="space-y-2">
            <Label htmlFor="surfFriends">Friends (Press Enter to add)</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.watch("surfFriends")?.map((friend, index) => (
                <div key={index} className="flex items-center bg-primary/20 px-2 py-1 rounded">
                  <span>{friend}</span>
                  <button
                    type="button"
                    className="ml-2 text-sm hover:text-destructive"
                    onClick={() => {
                      const currentFriends = form.watch("surfFriends");
                      form.setValue("surfFriends", 
                        currentFriends.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              id="surfFriends"
              placeholder="Type a friend's name and press Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = e.currentTarget;
                  const value = input.value.trim();
                  if (value) {
                    const currentFriends = form.watch("surfFriends");
                    const updatedFriends = currentFriends ? [...currentFriends, value] : [value];
                    form.setValue("surfFriends", updatedFriends);
                    input.value = "";
                  }
                }
              }}
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
      </main>

      <CreateSurfboardDialog
        open={isCreateSurfboardOpen}
        onOpenChange={setIsCreateSurfboardOpen}
        onSubmit={async (data) => {
          const newBoard = await createSurfboard(data);
          form.setValue("surfboardId", newBoard.id);
          setIsCreateSurfboardOpen(false);
        }}
      />
    </div>
  );
}
