import { useUser } from "@/hooks/use-user";
import { useSessions } from "@/hooks/use-sessions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionCard from "@/components/SessionCard";
import { Plus, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function HomePage() {
  const { logout, user } = useUser();
  const { userSessions, publicSessions, isLoading } = useSessions();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-[1200px] mx-auto items-center justify-between px-4 md:px-8 lg:px-12">
          <div className="flex items-center gap-8">
            <img src="/Transparent.png" alt="Peak Logo" className="h-7 w-auto transition-transform hover:scale-105" />
            <div className="text-sm text-muted-foreground border-l border-border/40 pl-8">
              {isLoading ? (
                "Loading..."
              ) : userSessions ? (
                `${userSessions.length} sessions`
              ) : (
                "0 sessions"
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/new-session")} className="px-6">
              <Plus className="h-4 w-4 mr-2.5" />
              New Session
            </Button>
            <Button variant="ghost" size="sm" onClick={() => logout()} className="px-6">
              <LogOut className="h-4 w-4 mr-2.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 lg:px-8 py-8">
        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="personal">My Sessions</TabsTrigger>
            <TabsTrigger value="public">Public Feed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            {userSessions?.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </TabsContent>
          
          <TabsContent value="public" className="space-y-6">
            {publicSessions?.map((session) => (
              <SessionCard key={session.id} session={session} isPublicFeed={true} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
