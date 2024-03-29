import "./search.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRootContext } from "../../context/RootContextProvider";
import Loader from "../../components/loader/Loader";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SliderContent from "../../components/slider-content/SliderContent";
import CategoryCard from "../../components/card/CategoryCard";

function Search() {
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState(
    sessionStorage.getItem("searchQ") === null
      ? ""
      : sessionStorage.getItem("searchQ")
  );
  const [selectType, setSelectType] = useState(
    sessionStorage.getItem("selectQ") === null
      ? "all"
      : sessionStorage.getItem("selectQ")
  );

  const { baseApi, accessToken, fetchData } = useRootContext();

  const queryClient = useQueryClient();

  // Loading
  useEffect(() => {
    setTimeout(() => setLoader(false), 1500);
  }, []);

  useEffect(() => {
    if (search === "") {
      queryClient.removeQueries(["search"]);
    }

    return () => {
      queryClient.removeQueries(["search", search]);
    };
  }, [search, queryClient]);

  const {
    data: searchedItems,
    isError: searchItemsError,
    refetch,
  } = useQuery(
    ["search", search],
    () =>
      fetchData(
        `${baseApi}/search?q=${search}&type=${
          selectType === "all" ? "album,playlist,artist,track" : selectType
        }&market=GE&limit=50`
      ),
    {
      enabled: search !== "" && !!accessToken,
      keepPreviousData: false,
    }
  );

  const { data: categoriesList } = useQuery(
    ["category-playlist-list"],
    () =>
      fetchData(`${baseApi}/browse/categories?country=GE&offset=0&limit=50`),
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
      staleTime: 3000000,
      select: (res) => res.categories.items,
    }
  );

  const handleSearchChange = (event) => {
    sessionStorage.setItem("searchQ", event.target.value);
    setSearch(event.target.value);
  };

  const handleSelectType = (event) => {
    if (search.length > 0) {
      sessionStorage.setItem("selectQ", event.target.value);
      setSelectType(event.target.value);
      setTimeout(() => refetch(), 1000);
    } else {
      sessionStorage.setItem("selectQ", event.target.value);
      setSelectType(event.target.value);
    }
  };

  if (loader) return <Loader />;
  return (
    <div className="search">
      <div className="search-header d-flex justify-content-between align-items-center">
        <h1>Search</h1>
        <div className="d-flex justify-content-between align-items-center">
          <div className="search-search-bar">
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2ZM1.13461e-07 6C-0.00012039 5.0557 0.222642 4.12471 0.650171 3.28274C1.0777 2.44077 1.69792 1.7116 2.4604 1.15453C3.22287 0.597453 4.10606 0.228212 5.03815 0.0768326C5.97023 -0.0745466 6.92488 -0.00378925 7.82446 0.28335C8.72404 0.570489 9.54315 1.0659 10.2152 1.7293C10.8872 2.39269 11.3931 3.20533 11.6919 4.10113C11.9906 4.99693 12.0737 5.95059 11.9343 6.88455C11.795 7.81851 11.4372 8.7064 10.89 9.476L15.707 14.293C15.8892 14.4816 15.99 14.7342 15.9877 14.9964C15.9854 15.2586 15.8802 15.5094 15.6948 15.6948C15.5094 15.8802 15.2586 15.9854 14.9964 15.9877C14.7342 15.99 14.4816 15.8892 14.293 15.707L9.477 10.891C8.57936 11.5293 7.52335 11.9082 6.42468 11.9861C5.326 12.0641 4.22707 11.8381 3.2483 11.333C2.26953 10.8278 1.44869 10.063 0.875723 9.12235C0.30276 8.18167 -0.000214051 7.10143 1.13461e-07 6Z"
              />
            </svg>
            <input
              className="search-bar"
              type="text"
              name="search"
              autoComplete="off"
              spellCheck="false"
              onChange={handleSearchChange}
              placeholder="What do you want to listen to?"
              value={search}
            />
          </div>
          <Select
            className="search-search-menu"
            value={selectType}
            onChange={handleSelectType}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="artist">Artist</MenuItem>
            <MenuItem value="album">Album</MenuItem>
            <MenuItem value="track">Track</MenuItem>
            <MenuItem value="playlist">Playlist</MenuItem>
          </Select>
        </div>
      </div>
      {search.length > 0 ? (
        <div className="search-content">
          <SliderContent
            content="artist"
            name="artists"
            data={searchedItems?.artists?.items}
            error={searchItemsError}
          />
          <SliderContent
            content="album"
            name="albums"
            data={searchedItems?.albums?.items}
            error={searchItemsError}
          />
          <SliderContent
            content="playlist"
            name="playlists"
            data={searchedItems?.playlists?.items}
            error={searchItemsError}
          />
          <SliderContent
            content="track"
            name="tracks"
            data={searchedItems?.tracks?.items}
            error={searchItemsError}
          />
        </div>
      ) : (
        <div className="category-playlist-list">
          <h3>Browse All</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {categoriesList?.map((category) => (
              <CategoryCard
                data={category}
                content="playlist"
                key={category.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
