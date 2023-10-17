import "./App.css";
import { useEffect, useState, createContext } from "react";
import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import Home from "./pages/homePage/Home";
import { NextUIProvider } from "@nextui-org/system";
import OtpVerification from "../src/components/joinus/components/OtpVerification";
import Signin from "./components/joinus/components/Signin";
import Signup from "./components/joinus/components/Signup";
import Profile from "./components/profile/Profile";
import Cookies from "js-cookie";
import { userLoginAction } from "./redux/actions/UserActions";
import { loadUser } from "./redux/actions/UserActions";
import { useSelector, useDispatch } from "react-redux";
import MyProfile from "./pages/profilePage/MyProfile";
import Upload from "./pages/upload/Upload";


export const authContext = createContext();

function App() {
  const { auth } = useSelector((state) => state.loginReducer);
  const { logoutAuth } = useSelector((state) => state.logoutReducer);


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authToken = Cookies.get("token")


  useEffect(() => {
    if (authToken) {
      setIsAuthenticated(true);
    }

    // if (!authToken) {
    //   setIsAuthenticated(false)
    // }

  }, [auth, logoutAuth])


  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Signin />,
    },

    {
      path: "/signin",
      element: <Signin />
    },

    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/user_varify",
      element: <OtpVerification />,
    },

    {
      path: "/myprofile",
      element: <MyProfile />,
    },

    {
      path: '/upload',
      element: <Upload />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
