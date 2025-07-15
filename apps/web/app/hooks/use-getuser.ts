import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(){
    const query = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await api.get('/me', {
                withCredentials: true
            })

            return res.data
        }
    })

    return query
}