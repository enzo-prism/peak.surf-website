import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";

interface Session {
  id: number;
  userId: number;
  date: string;
  location: string;
  highlight?: string;
  photoUrl?: string;
  isPublic: boolean;
  waveConditions?: string;
  waveHeight?: number;
  user: {
    username: string;
    profilePhotoUrl?: string;
  };
}

export default function AdminPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessions, setSelectedSessions] = useState<number[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/admin/sessions", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSessions(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (sessionId: number) => {
    try {
      const response = await fetch(`/api/admin/sessions/${sessionId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast({
        title: "Success",
        description: "Session deleted successfully",
      });

      setSessions(sessions.filter(session => session.id !== sessionId));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthorized(true);
        setError("");
      } else {
        const errorText = await response.text();
        setError(errorText || "Invalid password");
      }
    } catch (error) {
      setError("Failed to verify password");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md bg-black border-primary/20">
          <CardContent className="pt-6">
            <h1 className="text-xl font-bold mb-4 text-white">Admin Authentication</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-black/50 border-primary/20 placeholder:text-primary/50 text-white"
                />
                {error && <p className="text-sm text-destructive mt-1">{error}</p>}
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                Verify Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const bulkDeleteSessions = async () => {
    if (!selectedSessions.length) return;
    
    setDeleting(true);
    try {
      const response = await fetch("/api/admin/sessions/bulk-delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ids: selectedSessions }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast({
        title: "Success",
        description: `${selectedSessions.length} sessions deleted successfully`,
      });

      setSessions(sessions.filter(session => !selectedSessions.includes(session.id)));
      setSelectedSessions([]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  const toggleSession = (sessionId: number) => {
    setSelectedSessions(prev => 
      prev.includes(sessionId) 
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="px-6 text-white border-white/20 hover:bg-white/10"
            >
              Back to Home
            </Button>
          </div>
          {selectedSessions.length > 0 && (
            <Button
              variant="outline"
              onClick={bulkDeleteSessions}
              disabled={deleting}
              className="flex items-center gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete Selected ({selectedSessions.length})
            </Button>
          )}
        </div>
        <div className="grid gap-4">
          {sessions.length === 0 ? (
            <Card className="bg-black/50 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-white text-center py-8">No sessions found</p>
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
                        <h2 className="text-lg font-semibold text-white">
                          {session.user.username}'s Session
                        </h2>
                        <p className="text-sm text-primary/60">
                          {new Date(session.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-white mt-2">
                          Location: {session.location}
                        </p>
                        {session.highlight && (
                          <p className="text-sm text-white mt-1">
                            Highlight: {session.highlight}
                          </p>
                        )}
                      </div>
                    </div>
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
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
