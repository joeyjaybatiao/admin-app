import Index from "views/Index.js";
import Profile from "views/Profile";
import Login from "views/Login";
import Register from "views/Register";
import JobPost from "views/JobPost";
import LandD from "views/LandD";
import RandR from "views/RandR";
import PM from "views/PM";
import Applicant from "views/Applicant";
import Personnel from "views/Personnel";
import Role from "views/Role";
import Office from "views/Office";
import ICTRepairRequest from "views/ICTRepairRequest";
import ItemType from "views/ItemType";
import Item from "views/Item";
import Dar from "views/Dar";
import Timestamp from "views/Timestamp";
import StaffDashboard from "views/StaffDashboard";

import PageNotFound404 from "views/PageNotFound404";

import Maps from "views/examples/Maps.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    display: true,
  },
  {
    path: "/staff/index",
    name: "Staff Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: StaffDashboard,
    layout: "/admin",
    display: true,
  },
  {
    path: "/admin/user",
    name: "Admin",
    icon: "ni ni-badge text-primary",
    layout: "/admin",
    component: Personnel,
    display: true,
    subroutes: [
      {
        path: "/admin/user",
        name: "Users",
        icon: "ni ni-circle-08 text-primary",
        component: Personnel,
        layout: "/admin",
        display: true,
      },
      {
        path: "/admin/role",
        name: "Roles",
        icon: "ni ni-key-25 text-primary",
        component: Role,
        layout: "/admin",
        display: true,
      },
      {
        path: "/admin/office",
        name: "Office",
        icon: "ni ni-building text-primary",
        component: Office,
        layout: "/admin",
        display: true,
      },
    ]
  },
  {
    path: "/hr/user",
    name: "Human Resource",
    icon: "ni ni-circle-08 text-primary",
    layout: "/admin",
    component: Personnel,
    display: true,
    subroutes: [
      {
        path: "/hr/user",
        name: "Personnel",
        icon: "ni ni-circle-08 text-primary",
        component: Personnel,
        layout: "/admin",
        display: true,
      },
      {
        path: "/hr/applicants",
        name: "Applicant",
        icon: "ni ni-single-02 text-primary",
        component: Applicant,
        layout: "/admin",
        display: true,
      },
      {
        path: "/hr/job-post",
        name: "Hiring",
        icon: "ni ni-collection text-primary",
        component: JobPost,
        layout: "/admin",
        display: true,
      },
      {
        path: "/hr/rewards-and-recognition",
        name: "R&R",
        icon: "ni ni-trophy text-primary",
        component: RandR,
        layout: "/admin",
        display: true,
      },
      {
        path: "/hr/performance-management",
        name: "PM",
        icon: "ni ni-user-run text-primary",
        component: PM,
        layout: "/admin",
        display: true,
      },
      {
        path: "/hr/learning-and-development",
        name: "L&D",
        icon: "ni ni-paper-diploma text-primary",
        component: LandD,
        layout: "/admin",
        display: true,
      },
    ]
  },

  {
    path: "/admin/ict",
    name: "ICT",
    icon: "ni ni-vector text-primary",
    layout: "/admin",
    component: ICTRepairRequest,
    display: true,
    subroutes: [
      {
        path: "/admin/ict",
        name: "ICT Repair Request",
        icon: "ni ni-settings text-primary",
        layout: "/admin",
        component: ICTRepairRequest,
        display: true,
      },
      {
        path: "/admin/ict-types",
        name: "ICT Item Type",
        icon: "ni ni-box-2 text-primary",
        layout: "/admin",
        component: ItemType,
        display: true,
      },
      {
        path: "/admin/ict-items",
        name: "ICT Item",
        icon: "ni ni-laptop text-primary",
        layout: "/admin",
        component: Item,
        display: true,
      },
    ]
  },
  {
    path: "/dar",
    name: "DAR",
    icon: "ni ni-collection text-primary",
    component: Dar,
    layout: "/admin",
    display: true,
  },

  {
    path: "/timestamp",
    name: "Timestamp",
    icon: "ni ni-collection text-primary",
    component: Timestamp,
    layout: "/admin",
    display: true,
  },


  {
    path: "/404",
    name: "PageNotFound404",
    icon: "ni ni-bullet-list-67 text-red",
    component: PageNotFound404,
    layout: "/admin",
    common: true,
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },



  
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-single-02 text-blue",
    component: Icons,
    layout: "/admin",
    // display: true
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/my-profile",
    name: "My Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    common: true,
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
    // display: true,
  },
];
export default routes;
