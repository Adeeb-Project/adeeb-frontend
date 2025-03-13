// import
// To be changed
// import Tables from "views/Dashboard/Tables.js";
import { RocketIcon } from "components/Icons/Icons";
import { AuthenticationIcon } from "components/Icons/Icons";
import {
  CartIcon,
  DocumentIcon,
  HomeIcon,
  PersonIcon,
  StatsIcon,
} from "components/Icons/Icons";

import Kanban from "views/Applications/Kanban/index";
import SignInBasic from "views/Authentication/SignIn/SignInBasic.js";
import SignInCover from "views/Authentication/SignIn/SignInCover.js";
import SignInIllustration from "views/Authentication/SignIn/SignInIllustration.js";
import SignUpBasic from "views/Authentication/SignUp/SignUpBasic.js";
import SignUpCover from "views/Authentication/SignUp/SignUpCover.js";
import SignUpIllustration from "views/Authentication/SignUp/SignUpIllustration.js";
import Default from "views/Dashboard/Default";
import Overview from "views/Pages/Profile/Overview/index";
import Projects from "views/Pages/Profile/Projects/index";
import Teams from "views/Pages/Profile/Teams/index";
import NewUser from "views/Pages/Users/NewUser/index";
import Reports from "views/Pages/Users/Reports/index";
import DataTables from "views/Applications/DataTables";
import SurveyManagement from "views/Survey/SurveyManagement";
import EditSurvey from "views/Survey/EditSurvey";
import AddSurvey from "./views/Survey/AddSurvey";
import ViewSurvey from "./views/Survey/ViewSurvey";
import Survey from "views/Survey/Survey";

{/* Side bar routers names */}

const dashRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon color="inherit" />,
    authIcon: <HomeIcon color="inherit" />,
    collapse: true,
    items: [
      {
        name: "Default",
        path: "/dashboard/default",
        component: Default,
        layout: "/admin",
      },
      // {
      //   name: "CRM",
      //   path: "/dashboard/crm",
      //   component: CRM,
      //   layout: "/admin",
      // },
    ],
  },
  {
    name: "PAGES",
    category: "pages",
    items: [
      {
        name: "Survey",
        path: "/survey",
        collapse: true,
        icon: <DocumentIcon color="inherit" />,
        items: [
          {
            name: "Manage Surveys",
            path: "/survey/manage",
            component: SurveyManagement, // Updated to the new Survey Management Page
            layout: "/admin",
          },
          {
            name: "Add Surveys",
            path: "/survey/addSurvey/:id",
            component: AddSurvey, // Updated to the new Survey Management Page
            layout: "/admin",
          },
          {
            name: "View Surveys",
            path: "/survey/viewSurvey/:id",
            component: ViewSurvey, // Updated to the new Survey Management Page
            layout: "/admin",
          },
        ],
      },
      
      
      {
        name: "Departing Employees",
        path: "/demployees",
        icon: <PersonIcon color="inherit" />,
        collapse: true,

        items: [
          {
            name: "Add Employee",
            component: Kanban,
            authIcon: <DocumentIcon color="inherit" />,
            path: "/demployees/addemployee",
            layout: "/admin",
          },
          {
            name: "Employees Table",
            component: DataTables,
            authIcon: <PersonIcon color="inherit" />,
            path: "/demployees/employeestable",
            layout: "/admin",
    
          },
        ],
      },

      {
        name: "Authentication",
        path: "/authentication",
        icon: <AuthenticationIcon color="inherit" />,
        collapse: true,
        items: [
          {
            name: "Users",
            path: "/authentication/users",
             /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: false,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                secondaryNavbar: true,
                component: SignInBasic,
                path: "/authentication/sign-in/basic",
                layout: "/auth",
              },
              {
                name: "Cover",
                component: SignInCover,
                path: "/authentication/sign-in/cover",
                layout: "/auth",
              },
              {
                name: "Illustration",
                component: SignInIllustration,
                path: "/authentication/sign-in/illustration",
                layout: "/auth",
              },
            ],
          },
          {
            name: "New User",
            path: "/authentication/newuser",
             /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: false,
            authIcon: <DocumentIcon color="inherit" />,
            items: [
              {
                name: "Basic",
                secondaryNavbar: true,
                component: SignUpBasic,
                path: "/authentication/sign-up/basic",
                layout: "/auth",
              },
              {
                name: "Cover",
                component: SignUpCover,
                path: "/authentication/sign-up/cover",
                layout: "/auth",
              },
              {
                name: "Illustration",
                component: SignUpIllustration,
                path: "/authentication/sign-up/illustration",
                layout: "/auth",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "DOCS",
    category: "docs",
    items: [
      {
        name: "Summary",
        path: "/summary",
        collapse: true,
        icon: <RocketIcon color="inherit" />,
        items: [
          {
            name: "Company Report",
            path: "/companyreport",
            /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: false,
            authIcon: <HomeIcon color="inherit" />,
            items: [
              {
                name: "Profile Overview",
                secondaryNavbar: true,
                path: "/pages/profile/overview",
                component: Overview,
                layout: "/admin",
              },
            ],
          },
          {
            name: "Retension Rate",
            path: "/companiesreport/rrate",
             /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: true,
            authIcon: <PersonIcon color="inherit" />,
            items: [
              {
                name: "Company",
                path: "/companiesreport/rrate/company",
                component: Reports,
                layout: "/admin",
              },
              {
                name: "Departments",
                path: "/companiesreport/rrate/departments",
                component: NewUser,
                layout: "/admin",
              },
              {
                name: "Gender",
                path: "/companiesreport/rrate/gender",
                component: NewUser,
                layout: "/admin",
              },
            ],
          },
          {
            name: "Reasons",
            path: "/reasons",
             /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: true,
            authIcon: <PersonIcon color="inherit" />,
            items: [
              {
                name: "Company",
                path: "/reasons/company",
                component: Reports,
                layout: "/admin",
              },
              {
                name: "Departments",
                path: "/reasons/departments",
                component: NewUser,
                layout: "/admin",
              },
              {
                name: "Gender",
                path: "/reasons/gender",
                component: NewUser,
                layout: "/admin",
              },
            ],
          },
        ],
      },
      {
        name: "Graphs",
        path: "/graphs",
        collapse: true,
        icon: <StatsIcon color="inherit" />,
        items: [
          {
            name: "Retension Rate",
            path: "/companiesreport/rrate",
             /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: true,
            authIcon: <PersonIcon color="inherit" />,
            items: [
              {
                name: "Company",
                path: "/companiesreport/rrate/company",
                component: Reports,
                layout: "/admin",
              },
              {
                name: "Departments",
                path: "/companiesreport/rrate/departments",
                component: NewUser,
                layout: "/admin",
              },
              {
                name: "Gender",
                path: "/companiesreport/rrate/gender",
                component: NewUser,
                layout: "/admin",
              },
            ],
          },
          {
            name: "Reasons",
            path: "/reasons",
             /* 
            I should remove item but removing it cause an error 
            so I change collapse to false
            */
            collapse: true,
            authIcon: <PersonIcon color="inherit" />,
            items: [
              {
                name: "Company",
                path: "/reasons/company",
                component: Reports,
                layout: "/admin",
              },
              {
                name: "Departments",
                path: "/reasons/departments",
                component: NewUser,
                layout: "/admin",
              },
              {
                name: "Gender",
                path: "/reasons/gender",
                component: NewUser,
                layout: "/admin",
              },
            ],
          },
        ],
      },
     ],
    },
];

export default dashRoutes;
