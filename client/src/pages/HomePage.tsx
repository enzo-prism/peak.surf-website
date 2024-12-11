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
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center gap-4">
            <img src="/Transparent.png" alt="Peak Logo" className="h-6 w-auto transition-transform hover:scale-105" />
            <div className="text-sm text-muted-foreground border-l border-border/40 pl-4">
              {isLoading ? (
                "Loading..."
              ) : userSessions ? (
                `${userSessions.length} sessions`
              ) : (
                "0 sessions"
              )}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/new-session")}>
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </Button>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="h-4 w-4 mr-2" />
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
