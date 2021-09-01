import { lazy } from 'react'

const PagesRoutes = [
  {
    path: '/public',
    simpleUrl: '/public/1630305744921/logo.png',
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/login',
    component: lazy(() => import('@views/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('@views/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('@views/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/pages/reset-password-v1',
    component: lazy(() => import('@views/authentication/ResetPasswordV1')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/profile',
    component: lazy(() => import('@views/profile'))
  },
  {
    path: '/misc/coming-soon',
    component: lazy(() => import('@views/misc/ComingSoon')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('@views/misc/NotAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/maintenance',
    component: lazy(() => import('@views/misc/Maintenance')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('@views/misc/Error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default PagesRoutes
