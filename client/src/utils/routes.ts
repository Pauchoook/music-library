import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { HOME, PROFILE } from "./path";

export const publicRoutes = [
  {
    path: HOME,
    Component: Home
  }
]

export const authRoutes = [
  {
    path: PROFILE,
    Component: Profile
  }
]