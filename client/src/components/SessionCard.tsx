import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Session } from "@db/schema";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type SessionCardProps = {
  session: Session & { 
    user?: { username: string };
    surfboard?: { name: string; description?: string };
    userSessionCount?: number;
  };
  isPublicFeed?: boolean;
};

export default function SessionCard({ session, isPublicFeed }: SessionCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Check if surfFriends exists and is an array
  const hasFriends = Array.isArray(session.surfFriends) && session.surfFriends.length > 0;
  
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/sessions/${session.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(await response.text());
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/sessions/public"] });
      toast({
        title: "Success",
        description: "Session deleted successfully",
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
    <>
      <Card className="overflow-hidden w-full max-w-[800px]">
        {session.photoUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={session.photoUrl}
              alt="Session photo"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardHeader className="flex flex-row items-center justify-between p-6">
          <div className="flex flex-row items-center gap-5">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg">
                {session.user?.username?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium mb-1">{session.location}</h3>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span>{format(new Date(session.date), "PPP")}</span>
                {isPublicFeed && session.userSessionCount !== undefined && (
                  <>
                    <span>•</span>
                    <span>{session.userSessionCount} total sessions</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {user?.id === session.userId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="px-6 pb-6 space-y-4">
          {session.waveConditions && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-20">Conditions:</span>
              <span className="text-sm text-muted-foreground">{session.waveConditions}</span>
            </div>
          )}
          {session.waveHeight && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-20">Wave Height:</span>
              <span className="text-sm text-muted-foreground">{session.waveHeight}ft</span>
            </div>
          )}
          {session.surfboard && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-20">Board:</span>
              <span className="text-sm text-muted-foreground">{session.surfboard.name}</span>
            </div>
          )}
          {hasFriends && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-20">Friends:</span>
              <span className="text-sm text-muted-foreground">
                {session.surfFriends!.join(", ")}
              </span>
            </div>
          )}
          {session.highlight && (
            <p className="text-muted-foreground mt-6 pt-4 border-t border-border/40">{session.highlight}</p>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your surf session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteMutation.mutate()}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
