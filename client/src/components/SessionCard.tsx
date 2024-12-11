import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Session } from "@db/schema";
import { format } from "date-fns";

type SessionCardProps = {
  session: Session & { 
    user?: { username: string };
    surfboard?: { name: string; description?: string };
  };
};

export default function SessionCard({ session }: SessionCardProps) {
  // Check if surfFriends exists and is an array
  const hasFriends = Array.isArray(session.surfFriends) && session.surfFriends.length > 0;
  
  return (
    <Card className="overflow-hidden">
      {session.photoUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={session.photoUrl}
            alt="Session photo"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback>
            {session.user?.username?.[0] ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{session.location}</h3>
          <p className="text-sm text-muted-foreground">
            {format(new Date(session.date), "PPP")}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {session.waveConditions && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Conditions:</span>
            <span className="text-sm text-muted-foreground">{session.waveConditions}</span>
          </div>
        )}
        {session.waveHeight && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Wave Height:</span>
            <span className="text-sm text-muted-foreground">{session.waveHeight}ft</span>
          </div>
        )}
        {session.surfboard && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Board:</span>
            <span className="text-sm text-muted-foreground">{session.surfboard.name}</span>
          </div>
        )}
        {hasFriends && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Friends:</span>
            <span className="text-sm text-muted-foreground">
              {session.surfFriends.join(", ")}
            </span>
          </div>
        )}
        {session.highlight && (
          <p className="text-muted-foreground mt-4">{session.highlight}</p>
        )}
      </CardContent>
    </Card>
  );
}
