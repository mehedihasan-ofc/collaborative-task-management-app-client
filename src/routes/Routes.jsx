import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Auth/Login/Login";
import SignUp from "../pages/Auth/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Home/Profile/Profile";
import CreateTask from "../pages/Home/CreateTask/CreateTask";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><MainLayout /></PrivateRoute>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/create-task",
                element: <CreateTask />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "signup",
        element: <SignUp />
    }
]);

export default router;