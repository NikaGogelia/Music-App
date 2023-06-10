import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// Layout
import RootLayout from "../layout/root-layout/RootLayout";
// Page
import NotFound from "../pages/not-found/NotFound";
import Introduction from "../pages/Introduction/Introduction";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Library from "../pages/library/Library";
import Likes from "../pages/likes/Likes";
import ShowAll from "../pages/show-all/ShowAll";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Introduction />} />
        <Route path="player" element={<RootLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
          <Route path="likes" element={<Likes />} />
          <Route path="all/:id" element={<ShowAll />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </>
  )
);
