import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// Layouts
import RootLayout from "../layout/root-layout/RootLayout";
// Pages
import NotFound from "../pages/not-found/NotFound";
import Introduction from "../pages/Introduction/Introduction";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Library from "../pages/library/Library";
import Likes from "../pages/likes/Likes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Introduction />} />
      <Route path="home" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="likes" element={<Likes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);
