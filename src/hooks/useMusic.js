import { useQuery } from "react-query";
import { useRootContext } from "../context/RootContextProvider";

export function useMusicQuery(queryKey, id, apiPath, dataKey, favGenres) {
  const { baseApi, accessToken, fetchData, handleDataKey } = useRootContext();

  const query = useQuery(
    [queryKey, id],
    () => fetchData(`${baseApi}${apiPath}`),
    {
      select: (data) => handleDataKey(dataKey, data),
      enabled:
        id === "recommends-for-you"
          ? !!accessToken && favGenres?.length > 0
          : !!accessToken,
      refetchOnWindowFocus: false,
      // onSuccess: (data) => {
      //   if (id === "recommends-for-you" && data.length === 0) {
      //     query.refetch();
      //   }
      // },
      staleTime: 3000000,
    }
  );

  return query;
}
