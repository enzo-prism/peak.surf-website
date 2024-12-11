import { useQuery } from "@tanstack/react-query";
import type { Session } from "@db/schema";

export function useSessions() {
  const { data: userSessions, isLoading: isLoadingUser } = useQuery<Session[]>({
    queryKey: ["/api/sessions/user"],
  });

  const { data: publicSessions, isLoading: isLoadingPublic } = useQuery<Session[]>({
    queryKey: ["/api/sessions/public"],
  });

  return {
    userSessions,
    publicSessions,
    isLoading: isLoadingUser || isLoadingPublic,
  };
}
