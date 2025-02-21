import Survey from "views/Survey/Survey";

const publicRoutes = [
  {
    name: "Survey",
    path: "/survey/:userId",
    component: Survey,
    layout: "",
  },
];

export default publicRoutes;