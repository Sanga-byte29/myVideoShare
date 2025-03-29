import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import UserProfile from "./pages/user/UserProfile";
import Home from "./pages/Home";
import { ProtectedRoute, ProtectedRouteHome } from "./components/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";

export const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/sign-up", element: <ProtectedRoute element={<SignUp />} /> },
    {path: "/sign-in", element: <ProtectedRoute element={<SignIn />} />},
    {path: "/user/profile" , element: <ProtectedRouteHome element={<UserProfile />} />,},
    {path: "/reset-password" , element: <ProtectedRouteHome element={<ResetPassword />} />,},
    {path: "/reset-password/:token" , element: <ProtectedRouteHome element={<UpdatePassword />} />,}

]);