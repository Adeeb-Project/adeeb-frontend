import Survey from "views/Survey/Survey";
import Pricing from "views/Pages/Pricing";
import SignUp from "views/Authentication/SignUp/SignUpCover";
import FillSurvey from "views/Survey/FillSurvey";
import SurveySuccess from "views/Survey/SurveySuccess";

const publicRoutes = [
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