const routes = [
  {
    title: "Home",
    to: "/home",
    exact: true,
    isPrivate: false,
    footerActions: [],
    component: "Homepage",
  },
  {
    title: "Login",
    to: "/login",
    exact: false,
    isPrivate: false,
    footerActions: [
      {
        title: "Sign Up",
        action: "/sign-up",
      },
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: "Login",
  },
  {
    title: "User Registration",
    to: "/sign-up",
    exact: false,
    isPrivate: false,
    footerActions: [
      {
        title: "Login",
        action: "/login",
      },
    ],
    component: "Register",
  },
  {
    title: "My Locations",
    to: "/locations",
    exact: false,
    isPrivate: false,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: "Locations",
  },
  {
    title: "My Alerts",
    to: "/alerts",
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: "Alerts",
  },
  {
    title: "Log a Covid",
    to: "/log-case",
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: "Logger",
  },
  {
    title: "Page Not Found",
    to: "/404-not-found",
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: '404'
  }
]

export default routes;
