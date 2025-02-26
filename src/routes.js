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
      // Directly linking Survey to the Survey component
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
            name: "Profile Overview",
            secondaryNavbar: true,
            path: "/pages/profile/overview",
            component: Overview,
            layout: "/admin",
          },
          {
            name: "Teams",
            secondaryNavbar: true,
            path: "/pages/profile/teams",
            component: Teams,
            layout: "/admin",
          },
          {
            name: "All Projects",
            secondaryNavbar: true,
            path: "/pages/profile/profile-projects",
            component: Projects,
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
            name: "Retention Rate",
            path: "/companiesreport/rrate",
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
            name: "Retention Rate",
            path: "/companiesreport/rrate",
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
