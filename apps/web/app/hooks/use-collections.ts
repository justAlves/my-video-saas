import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreateCollectionDTO {
  name: string;
  description?: string;
  enableDrm?: boolean;
  userId: string;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  organizationId: string | null;
  createdAt: string;
}

export function useCreateCollection() {
  const mutate = useMutation({
    mutationFn: async (data: CreateCollectionDTO) => {
        const { enableDrm, ...rest } = data

        const response = await api.post('/collections', rest, {
          withCredentials: true
        })

        return response.data as Collection;
    }
  })

  return mutate;
}

export function useGetCollections() {
  const query = useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
        const response = await api.get('/collections', {
            withCredentials: true
        });

        return response.data as Collection[]
    }
  })

  return query
}