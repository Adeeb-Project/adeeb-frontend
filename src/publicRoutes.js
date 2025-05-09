import Survey from "views/Survey/Survey";
import Pricing from "views/Pages/Pricing";
import SignUp from "views/Authentication/SignUp/SignUpCover";
import FillSurvey from "views/Survey/FillSurvey";
import SurveySuccess from "views/Survey/SurveySuccess";
import SignIn from "views/Authentication/SignIn/SignInCover";
import LandingPage from "views/Pages/LandingPage";


const publicRoutes = [
  {
    name: "Landing Page",
    path: "/",
    component: LandingPage,
    layout: "",
  },
  {
    name: "Survey",
    path: "/survey/:userId",
    component: Survey,
    layout: "",
  },
  {
    name: "Fill Survey",
    path: "/fill-survey/:id",
    component: FillSurvey,
    layout: "",
  },
  {
    name: "Survey Success",
    path: "/survey-success",
    component: SurveySuccess,
    layout: "",
  },
  {
    name: "Sign in",
    path: "/sign-in",
    component: SignIn,
    layout: "",
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    component: SignUp,
    layout: "",
  },
  {
    name: "Authentication Sign In",
    path: "/authentication/sign-in/cover",
    component: SignIn,
    layout: "",
  },
  {
    name: "Authentication Sign Up",
    path: "/authentication/sign-up/cover",
    component: SignUp,
    layout: "",
  },
];

export default publicRoutes;