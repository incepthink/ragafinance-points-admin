import { BackendUrl, clientAxios } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

const useChartData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: async () => {
      const res = await clientAxios.get(`${BackendUrl}/platform/chart`);

      return res.data;
    },
  });

  return { data, isLoading };
};

export default useChartData;
