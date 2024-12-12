import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/user/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
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

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      await updateProfileMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-medium">Profile</h1>
        </div>
      </header>

      <main className="container px-6 md:px-8 lg:px-12 py-8 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user?.profilePhotoUrl || undefined} />
              <AvatarFallback className="text-4xl">
                {user?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 text-center">
              <Label htmlFor="photo" className="text-base">Profile Photo</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full max-w-xs"
              />
              <p className="text-sm text-muted-foreground">
                Upload a new profile photo
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">Username</Label>
              <p className="text-muted-foreground">{user?.username}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Phone Number</Label>
              <p className="text-muted-foreground">{user?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
