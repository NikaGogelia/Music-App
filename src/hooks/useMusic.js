import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRootContext } from "../context/RootContextProvider";

export function useMusicQuery(queryKey, id, apiPath, dataKey) {
  const { baseApi, accessToken, fetchData, handleDataKey } = useRootContext();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEnabled(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return useQuery([queryKey, id], () => fetchData(`${baseApi}${apiPath}`), {
    select: (data) => handleDataKey(dataKey, data),
    enabled: !!accessToken && enabled,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
}
