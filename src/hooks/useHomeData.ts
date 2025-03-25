import { fetchDeposits } from "@/utils/dataFetch";
import { useQuery } from "@tanstack/react-query";

const useHomeData = (address: string) => {
  const shouldFetch = Boolean(address !== "");

  const { data, isLoading } = useQuery({
    queryKey: ["homeData", address],
    queryFn: async () => {
      const res = await fetchDeposits(address);

      return res;
    },
  });

  return { data, isLoading };
};

export default useHomeData;
