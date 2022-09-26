import Login from "../page/Login";
import Signup from "../page/Signup";
import Main from "../page/Main";
import Post from "../page/Post";
import PostDetail from '../page/PostDetail'
import Randing from "../page/Randing";
import PuppyAuthentication from "../page/PuppyAuthentication";
import PuppyInfo from "../page/PuppyInfo";
import PpAuthDoneMdl from "../components/Modal/PpAuthDoneMdl";
import PpAuthFailMdl from "../components/Modal/PpAuthFailMdl";
import PpAuthOvlMdl from "../components/Modal/PpAuthOvlMdl";

const RouteModule = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/post",
    element: <Post />,
  },
  {
    path: "/main/:id",
    element: <PostDetail/>,
  },
  {
    path: "/",
    element: <Randing />,
  },
  {
    path: "/puppyauthentication",
    element: <PuppyAuthentication />,
  },
  {
    path: "/puppyinfo",
    element: <PuppyInfo />,
  },
  {
    path: "/ppauthdonemdl",
    element: <PpAuthDoneMdl />,
  },
  {
    path: "/ppauthfailmdl",
    element: <PpAuthFailMdl />,
  },
  {
    path: "/ppauthovlmdl",
    element: <PpAuthOvlMdl />,
  },
];

export default RouteModule;
