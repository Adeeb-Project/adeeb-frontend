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
import NewUser from "views/Pages/Users/NewUser/index";
import Reports from "views/Pages/Users/Reports/index";
import DataTables from "views/Applications/DataTables";
import AssignSurvey from "views/Survey/AssignSurvey";

import Settings from "views/Pages/Account/Settings";
import ManageUsers from "views/Pages/Account/Settings/indexManageUsers";
import RetentionRateGraphs from "views/Pages/Graphs/RetentionRateGraphs";
import { layout } from "@chakra-ui/system";
import SurveySummary from "views/Pages/Summary/SurveySummary";
import Survey from "views/Survey/Survey";
import MySurvey from "views/Survey/mysurveys";
import SurveysList from "views/Survey/SurveysList";
import CreateSurvey from "views/Survey/CreateSurvey";
import EditSurvey from "views/Survey/EditSurvey";

/* Side bar routers names */

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

    ],
  },
  {
    name: "Survey control",
    category: "pages",
    items: [
      {
        name: "Survey",
        path: "/surveys",
        collapse: true,
        icon: <DocumentIcon color="inherit" />,
        items: [
          {
            name: "Surveys",
            path: "/surveys/main",
            component: SurveysList,
            layout: "/admin",
          },
          {
            name: "Create Survey",
            path: "/surveys/create",
            component: CreateSurvey,
            layout: "/admin",
          },
          {
            name: "Edit Survey",
            path: "/surveys/:surveyId/edit",
            component: EditSurvey,
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
            name: "Assign Survey",
            component: AssignSurvey,
            authIcon: <DocumentIcon color="inherit" />,
            path: "/demployees/assignsurvey",
            layout: "/admin",
          },
          {
            name: "Employees Tabel",
            component: DataTables,
            authIcon: <PersonIcon color="inherit" />,
            path: "/demployees/employeestable",
            layout: "/admin",
    
          },
        ],
      },
    ],
  },
  {
    name: "Reports and Analytics",
    category: "docs",
    items: [
      {
        name: "Summary",
        path: "/summary",
        collapse: true,
        icon: <RocketIcon color="inherit" />,
        items: [
          {
            name: "Survey Summary",
            path: "/summary/companyreport",
            authIcon: <HomeIcon color="inherit" />,
            component: SurveySummary,
            layout: "/admin",
            
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
            name: "Company Graphs",
            path: "/companiesreport/graphs",
            authIcon: <PersonIcon color="inherit" />,
            component: RetentionRateGraphs,
            layout: "/admin",
          },
          
        ],
      },
     ],
    },
    {
      name: "Users Management",
      category: "users",
      items: [
        {
          name: "Current Users",
          path: "/current-users",
          collapse: true,
          icon: <DocumentIcon color="inherit" />,
          items: [
            {
              name: "Settings",
              path: "/settings",
              component: Settings,
              layout: "/admin"
            },
            {
              name: "Manage Users",
              path: "/manage-users",
              component: ManageUsers,
              layout: "/admin"
            },
          ],
        },
        
        {
          name: "New Users",
          path: "/new-users",
          collapse: true,
          icon: <DocumentIcon color="inherit" />,
          items: [
            {
              name: "Add User",
              path: "/add-account",
              component: NewUser,
              layout: "/admin"
            },
          ],
        },
      ],
    }
];

export default dashRoutes;
