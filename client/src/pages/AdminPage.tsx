import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2, Key } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface PasswordChangeDialog {
  isOpen: boolean;
  userId: number | null;
  username: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState<PasswordChangeDialog>({
    isOpen: false,
    userId: null,
    username: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const { data: sessions = [] } = useQuery({
    queryKey: ["/api/admin/sessions"],
    queryFn: async () => {
      const response = await fetch("/api/admin/sessions");
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    },
  });

  const toggleSession = (sessionId: number) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const deleteSession = async (sessionId: number) => {
    try {
      setDeleting(true);
      const response = await fetch(`/api/admin/sessions/${sessionId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(await response.text());
      
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sessions"] });
      toast({
        title: "Success",
        description: "Session deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete session",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const bulkDeleteSessions = async () => {
    if (selectedSessions.length === 0) return;

    try {
      setBulkDeleting(true);
      const response = await fetch("/api/admin/sessions/bulk-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedSessions }),
      });
      if (!response.ok) throw new Error(await response.text());

      setSelectedSessions([]);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sessions"] });
      toast({
        title: "Success",
        description: "Selected sessions deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete sessions",
        variant: "destructive",
      });
    } finally {
      setBulkDeleting(false);
    }
  };

  const updateUserPassword = async () => {
    if (!passwordDialog.userId || !newPassword) return;

    try {
      setChangingPassword(true);
      const response = await fetch(`/api/admin/users/${passwordDialog.userId}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) throw new Error(await response.text());

      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setPasswordDialog({ isOpen: false, userId: null, username: "" });
      setNewPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container px-4 py-8 mx-auto max-w-[800px] space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {selectedSessions.length > 0 && (
            <Button
              variant="destructive"
              onClick={bulkDeleteSessions}
              disabled={bulkDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {bulkDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedSessions.length})
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {sessions.length === 0 ? (
            <Card className="bg-black/50 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-center py-8">No sessions found</p>
              </CardContent>
            </Card>
          ) : (
            sessions.map((session) => (
              <Card key={session.id} className="bg-black/50 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <Checkbox
                        checked={selectedSessions.includes(session.id)}
                        onCheckedChange={() => toggleSession(session.id)}
                        className="mt-1 border-white"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {session.user.username}'s Session
                        </h2>
                        <p className="text-sm text-primary/60">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-2">
                          Location: {session.location}
                        </p>
                        {session.highlight && (
                          <p className="text-sm mt-1">
                            Highlight: {session.highlight}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPasswordDialog({
                          isOpen: true,
                          userId: session.userId,
                          username: session.user.username
                        })}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteSession(session.id)}
                        disabled={deleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Dialog
          open={passwordDialog.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              setPasswordDialog({ isOpen: false, userId: null, username: "" });
              setNewPassword("");
            }
          }}
        >
          <DialogContent className="bg-black border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-white">Change Password</DialogTitle>
              <DialogDescription className="text-primary/60">
                Set a new password for {passwordDialog.username}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-black/50 border-primary/20 placeholder:text-primary/50 text-white"
              />
              <Button
                onClick={updateUserPassword}
                disabled={changingPassword || !newPassword}
                className="w-full bg-white text-black hover:bg-white/90"
              >
                {changingPassword && (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                )}
                Update Password
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}