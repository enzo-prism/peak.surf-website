import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type Session } from "@db/schema";
import { format } from "date-fns";

type SessionCardProps = {
  session: Session & { user?: { username: string } };
};

export default function SessionCard({ session }: SessionCardProps) {
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
      
      {session.highlight && (
        <CardContent>
          <p className="text-muted-foreground">{session.highlight}</p>
        </CardContent>
      )}
    </Card>
  );
}
