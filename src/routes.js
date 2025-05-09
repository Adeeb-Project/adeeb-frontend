// Imports
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
import SurveyManagement from "views/Survey/SurveyManagement";
import EditSurvey from "views/Survey/EditSurvey";
import AddSurvey from "./views/Survey/AddSurvey";
import ViewSurvey from "./views/Survey/ViewSurvey";
import Settings from "views/Pages/Account/Settings";
import ManageUsers from "views/Pages/Account/Settings/indexManageUsers";
import RetentionRateGraphs from "views/Pages/Graphs/RetentionRateGraphs";
import ReasonsGraphs from "views/Pages/Graphs/Reasons";
import CompanyReports from "views/Pages/Summary/CompanyReports";
import RetentionRateReport from "views/Pages/Summary/RetentionRate";
import ReasonsReport from "views/Pages/Summary/Reasons";
import Survey from "views/Survey/Survey";
import MySurvey from "views/Survey/mysurveys";
import ViewSurveyResponses from "views/Survey/ViewSurveyResponses";

// Routes Definition
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
        path: "/survey",
        collapse: true,
        icon: <DocumentIcon color="inherit" />,
        items: [
          {
            name: "Manage Surveys",
            path: "/survey/manage",
            component: SurveyManagement,
            layout: "/admin"
          },
          {
            name: "My Surveys",
            path: "/survey/my-surveys",
            component: MySurvey,
            layout: "/admin"
          },
          {
            name: "Add Surveys",
            path: "/survey/addSurvey/:id",
            component: AddSurvey,
            layout: "/admin",
            hidden: true
          },
          {
            name: "View Surveys",
            path: "/survey/viewSurvey/:id",
            component: ViewSurvey,
            layout: "/admin",
            hidden: true
          },
          {
            name: "View Response",
            path: "/survey/view-responses/:id",
            component: ViewSurveyResponses,
            layout: "/admin",
            hidden: true
          }
        ]
      },
      {
        name: "Departing Employees",
        path: "/demployees",
        icon: <PersonIcon color="inherit" />,
        collapse: true,
        items: [
          {
            name: "Add Employee",
            path: "/demployees/addemployee",
            layout: "/admin"
          },
          {
            name: "Employees Tabel",
            component: DataTables,
            path: "/demployees/employeestable",
            layout: "/admin"
          }
        ]
      }
    ]
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
            name: "Company Report",
            path: "/summary/companyreport",
            authIcon: <HomeIcon color="inherit" />,
            component: CompanyReports,
            layout: "/admin"
          },
          {
            name: "Retension Rate",
            path: "/summary/rrate",
            authIcon: <HomeIcon color="inherit" />,
            component: RetentionRateReport,
            layout: "/admin"
          },
          {
            name: "Reasons",
            path: "/summary/reasons",
            authIcon: <HomeIcon color="inherit" />,
            component: ReasonsReport,
            layout: "/admin"
          }
        ]
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
            authIcon: <PersonIcon color="inherit" />,
            component: RetentionRateGraphs,
            layout: "/admin"
          },
          {
            name: "Reasons",
            path: "/reasons",
            authIcon: <PersonIcon color="inherit" />,
            component: ReasonsGraphs,
            layout: "/admin"
          }
        ]
      }
    ]
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
          }
        ]
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
          }
        ]
      }
    ]
  }
];

export default dashRoutes;
