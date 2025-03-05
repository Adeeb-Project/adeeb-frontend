import Survey from "views/Survey/Survey";
import Pricing from "views/Pages/Pricing";
import SignUp from "views/Authentication/SignUp/SignUpCover";
const publicRoutes = [
  {
    name: "Survey",
    path: "/survey/:userId",
    component: Survey,
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
];

export default publicRoutes;