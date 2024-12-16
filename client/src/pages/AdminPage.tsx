import { useEffect, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h1 className="text-xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">
              You do not have permission to access this page.
            </p>
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

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h1>
        <div className="grid gap-4">
          {sessions.map((session) => (
            <Card key={session.id} className="bg-black/50 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {session.user.username}'s Session
                    </h2>
                    <p className="text-sm text-muted-foreground">
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
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
