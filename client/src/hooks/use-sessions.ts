import { useQuery } from "@tanstack/react-query";
import type { Session } from "@db/schema";

export function useSessions() {
  const { data: userSessions, isLoading: isLoadingUser } = useQuery<Session[]>({
    queryKey: ["/api/sessions/user"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: publicSessions, isLoading: isLoadingPublic } = useQuery<Session[]>({
    queryKey: ["/api/sessions/public"],
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    userSessions: userSessions || [],
    publicSessions: publicSessions || [],
    isLoading: isLoadingUser || isLoadingPublic,
  };
}
