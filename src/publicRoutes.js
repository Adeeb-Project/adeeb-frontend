import Survey from "views/Survey/Survey";
import Pricing from "views/Pages/Pricing";
import SignUp from "views/Authentication/SignUp/SignUpCover";
import Settings from "views/Pages/Account/Settings";
import SignIn from "views/Authentication/SignIn/SignInCover";
const publicRoutes = [
  {
    name: "Survey",
    path: "/survey/:userId",
    component: Survey,
    layout: "",
  },
  {
    name: "Sign in",
    path: "/sign-in",
    component: SignIn,
    layout: "",
  },
  {
    name: "Land Page",
    path: "/land-page",
    component: Pricing,
    layout: "",
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    component: SignUp,
    layout: "/admin",
  },
  {
    name: "Settings",
    path: "/settings",
    component: Settings,
    layout: "/admin",
  },
];

export default publicRoutes;