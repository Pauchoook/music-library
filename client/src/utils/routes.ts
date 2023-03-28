import Album from "../pages/Album";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { ALBUM, HOME, PROFILE } from "./path";

export const publicRoutes = [
  {
    path: HOME,
    Component: Home
  },
  {
    path: `${ALBUM}/:id`,
    Component: Album
  }
]

export const authRoutes = [
  {
    path: PROFILE,
    Component: Profile
  }
]