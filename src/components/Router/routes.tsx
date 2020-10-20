const routes = [
  {
    title: "Home",
    to: "/home",
    exact: true,
    isPrivate: true,
    footerActions: [
      {
        title: 'Check-in',
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
    title: "Register",
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
    isPrivate: true,
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
    isPrivate: true,
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
    isPrivate: true,
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
    isPrivate: true,
    footerActions: [
      {
        title: "Home",
        action: "/home",
      },
    ],
    component: 'SavedLocations'
  },
  {
    title: "Location Alerts",
    to: "/locationalerts",
    exact: true,
    isPrivate: true,
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
