const routes = [
  {
    title: "Home",
    to: "/home",
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: 'Look up',
        action: '/locations'
      },
      {
        title: "Saved Locations",
        action: "/saved-locations",
      }
    ],
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
      }
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
      {
        title: "Log a Case",
        action: "/log-case"
      }
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
    title: "Saved Locations",
    to: "/saved-locations",
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: 'SavedLocations'
  },
  {
    title: "Location Specific Alerts",
    to: "/locationalerts",
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: "LocationAlerts",
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
