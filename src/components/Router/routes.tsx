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
  },
  {
    title: 'Test login',
    to: '/test-login',
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: 'Homepage',
        action: '/test-homepage'
      }
    ],
    component: 'TestLogin'
  },
  {
    title: 'Test homepage',
    to: '/test-homepage',
    exact: true,
    isPrivate: false,
    footerActions: [
      {
        title: 'Home',
        action: '/home'
      }
    ],
    component: 'TestHomepage'
  }
]

export default routes;
