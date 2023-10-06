import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../src/components/Home";
import Body from "./components/Body/Body";
import Feed from "./components/Feed";
import Library from "./components/Library";
import Error from "./components/Error/Error";
import Signin from "./components/SignIn/Signin";
import Signup from "./components/SignUp/Signup";
import Upload from "./components/upload/Upload";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Album from "./components/Album/Album";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdatePassword from "./components/UpdatePassword/UpdatePass";
import { Provider } from "react-redux";
import store from "./utils/store";
import Hero from "./components/LandingPage/Hero";
import Search from "./components/Search";
import Profile from "./components/Profile/Profile";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/updatepassword",
        element: <UpdatePassword />,
      },
      {
        path: "/album",
        element: <Album />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <UserAuthContextProvider>
        <RouterProvider router={appRouter} />
      </UserAuthContextProvider>
    </Provider>
  );
}

export default App;
