import "./category-playlist.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRootContext } from "../../context/RootContextProvider";
import Loader from "../../components/loader/Loader";
import MusicCard from "../../components/card/MusicCard";

function CategoryPlaylist() {
  const params = useLocation();
  const { data: propsData, content } = params?.state;

  const { baseApi, accessToken, fetchData } = useRootContext();

  const requestConfig = {
    refetchOnWindowFocus: false,
    staleTime: 3000000,
  };

  const {
    data: categoryPlaylists,
    isLoading,
    isError,
  } = useQuery(
    ["category-playlist", propsData.id],
    () => fetchData(`${baseApi}/browse/categories/${propsData.id}/playlists`),
    {
      enabled: !!accessToken && !!propsData,
      select: (res) => res.playlists.items,
      ...requestConfig,
    }
  );

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="category-playlist">
        <h1>Category Playlists Not Found</h1>
      </div>
    );
  return (
    <div className="category-playlist">
      <h1>{propsData.name}</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {categoryPlaylists?.map((categoryPlaylist, index) => (
          <MusicCard
            data={categoryPlaylist}
            content={content}
            key={categoryPlaylist?.id + index}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryPlaylist;
