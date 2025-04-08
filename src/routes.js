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
import Settings from "views/Pages/Account/Settings";
import ManageUsers from "views/Pages/Account/Settings/indexManageUsers";
import RetentionRateGraphs from "views/Pages/Graphs/RetentionRateGraphs";
import ReasonsGraphs from "views/Pages/Graphs/Reasons";
import Payment from "views/Pages/Account/Payment/Payment.js";
import CompanyReports from "views/Pages/Summary/CompanyReports";
import RetentionRateReport from "views/Pages/Summary/RetentionRate";
import ReasonsReport from "views/Pages/Summary/Reasons";
import Survey from "views/Survey/Survey";
import MySurvey from "views/Survey/mysurveys";

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
    name: "PAGES",
    category: "pages",
    items: [
      {
        name: "Survey",
        path: "/survey",
        collapse: false,
        icon: <DocumentIcon color="inherit" />,
        component: Survey,
        layout: "/admin",
      },
      {
        name: "My Surveys",
        path: "/Mysurveys",
        collapse: false,
        authIcon: <HomeIcon color="inherit" />,
        component: MySurvey,
        layout: "/admin",
        items: [
          {
            name: "My Surveys",
            path: "/survey/manage",
            component: MySurvey,
            layout: "/admin",
          },
          {
            name: "Survey",
            path: "/survey/viewSurvey/:id",
            component: Survey,
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
    name: "Users",
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
            layout: "/admin",
          },
          {
            name: "Manage Users",
            path: "/manage-users",
            component: ManageUsers,
            layout: "/admin",
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
            layout: "/admin",
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
            path: "/summary/companyreport",
            authIcon: <HomeIcon color="inherit" />,
            component: CompanyReports,
            layout: "/admin",
          },
          {
            name: "Retention Rate",
            path: "/summary/rrate",
            authIcon: <HomeIcon color="inherit" />,
            component: RetentionRateReport,
            layout: "/admin",
          },
          {
            name: "Reasons",
            path: "/summary/reasons",
            authIcon: <HomeIcon color="inherit" />,
            component: ReasonsReport,
            layout: "/admin",
          },
          {
            name: "Payment",
            path: "/Account/Payment",
            component: Payment,
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
            name: "Retention Rate",
            path: "/companiesreport/rrate",
            authIcon: <PersonIcon color="inherit" />,
            component: RetentionRateGraphs,
            layout: "/admin",
          },
          {
            name: "Reasons",
            path: "/reasons",
            authIcon: <PersonIcon color="inherit" />,
            component: ReasonsGraphs,
            layout: "/admin",
          },
        ],
      },
    ],
  },
];

export default dashRoutes;
