const routes = [
  {
    title: 'Home',
    to: '/home',
    exact: true,
    isPrivate: true,
    footerActions: [],
    component: 'Homepage'
  },
  {
    title: 'Login',
    to: '/login',
    exact: false,
    isPrivate: false,
    footerActions: [],
    component: 'Login'
  },
  {
    title: 'User Registration',
    to: '/sign-up',
    exact: false,
    isPrivate: false,
    footerActions: [],
    component: 'Register'
  },
  {
    title: 'My Locations',
    to: '/locations',
    exact: false,
    isPrivate: true,
    footerActions: [],
    component: 'Locations'
  },
  {
    title: 'My Alerts',
    to: '/alerts',
    exact: true,
    isPrivate: true,
    footerActions: [],
    component: 'Alerts'
  },
  {
    title: 'Log a Covid',
    to: '/log-case',
    exact: true,
    isPrivate: true,
    footerActions: [],
    component: 'Logger'
  },
  {
    title: 'Page Not Found',
    to: '/404-not-found',
    exact: true,
    isPrivate: false,
    footerActions: [],
    component: '404'
  }
]

export default routes;