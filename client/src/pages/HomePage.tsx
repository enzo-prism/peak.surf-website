import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useSessions } from "@/hooks/use-sessions";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionCard from "@/components/SessionCard";
import CreateSessionDialog from "@/components/CreateSessionDialog";
import { Plus, LogOut } from "lucide-react";

export default function HomePage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { logout, user } = useUser();
  const { userSessions, publicSessions, isLoading } = useSessions();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <h1 className="text-xl font-light">Peak</h1>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button variant="ghost" size="sm" onClick={() => setIsCreateOpen(true)}>
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

      <main className="container py-6">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">My Sessions</TabsTrigger>
            <TabsTrigger value="public">Public Feed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            {userSessions?.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </TabsContent>
          
          <TabsContent value="public" className="space-y-4">
            {publicSessions?.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <CreateSessionDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </div>
  );
}
