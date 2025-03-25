import { BackendUrl, clientAxios } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await clientAxios.get(`${BackendUrl}/user/data`);

      return res.data.users;
    },
  });

  return { data, isLoading };
};

export default useUsers;
