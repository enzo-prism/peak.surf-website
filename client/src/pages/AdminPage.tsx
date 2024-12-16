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
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, Key, ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

interface Session {
  id: number;
  userId: number;
  date: string;
  location: string;
  highlight?: string;
  user: {
    username: string;
  };
}

interface PasswordDialogState {
  isOpen: boolean;
  userId: number | null;
  username: string;
}

export default function AdminPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState<PasswordDialogState>({
    isOpen: false,
    userId: null,
    username: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const { data: sessions = [] } = useQuery<Session[]>({
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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-8 lg:px-12 h-14 max-w-[800px] mx-auto relative flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-medium">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-8 lg:px-12 py-8 max-w-[800px] mx-auto">
        <div className="space-y-4">
          {selectedSessions.length > 0 && (
            <Button
              variant="destructive"
              onClick={bulkDeleteSessions}
              disabled={bulkDeleting}
              className="w-full"
            >
              {bulkDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected ({selectedSessions.length})
            </Button>
          )}

          {sessions.map((session) => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <Checkbox
                      checked={selectedSessions.includes(session.id)}
                      onCheckedChange={() => toggleSession(session.id)}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {session.user.username}'s Session
                      </h2>
                      <p className="text-sm text-muted-foreground">
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
                    >
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteSession(session.id)}
                      disabled={deleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {sessions.length === 0 && (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">No sessions found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Dialog 
        open={passwordDialog.isOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setPasswordDialog({ isOpen: false, userId: null, username: "" });
            setNewPassword("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Set a new password for {passwordDialog.username}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={updateUserPassword}
              disabled={changingPassword || !newPassword}
              className="w-full"
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
  );
}
