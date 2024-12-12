import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Surfboard } from "@db/schema";

type CreateSurfboardData = {
  name: string;
  description?: string;
  icon: string;
};

export function useSurfboards() {
  const queryClient = useQueryClient();

  const { data: surfboards, isLoading } = useQuery<Surfboard[]>({
    queryKey: ["/api/surfboards"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateSurfboardData) => {
      const response = await fetch("/api/surfboards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          icon: data.icon,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create surfboard');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/surfboards"] });
    },
  });

  return {
    surfboards,
    isLoading,
    createSurfboard: createMutation.mutateAsync,
  };
}
