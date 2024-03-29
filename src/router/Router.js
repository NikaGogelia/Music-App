import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// Layout
import RootLayout from "../layout/root-layout/RootLayout";
// Page
import NotFound from "../pages/not-found/NotFound";
import Login from "../pages/Login/Login";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Library from "../pages/library/Library";
import Likes from "../pages/likes/Likes";
import ShowAll from "../pages/show-all/ShowAll";
import Playlist from "../pages/playlist/Playlist";
import Album from "../pages/album/Album";
import Artist from "../pages/artist/Artist";
import Profile from "../pages/profile/Profile";
import TrackDetails from "../pages/track-details/TrackDetails";
import CategoryPlaylist from "../pages/category-playlist/CategoryPlaylist";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="player" element={<RootLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="likes" element={<Likes />} />
        <Route path="show-all/:id" element={<ShowAll />} />
        <Route path="playlist/:id" element={<Playlist />} />
        <Route path="category-playlist/:id" element={<CategoryPlaylist />} />
        <Route path="album/:id" element={<Album />} />
        <Route path="artist/:id" element={<Artist />} />
        <Route path="track/:id" element={<TrackDetails />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
