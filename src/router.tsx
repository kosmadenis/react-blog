import React from 'react'
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from 'react-router-dom'

// HOCs
import withTitle from '@/hoc/withTitle'
import withAuth from '@/hoc/withAuth'
// Status pages
import GenericError from '@/routes/status/GenericError'
import NotFound from '@/routes/status/NotFound'
// Containers
import Root from '@/routes/containers/Root'
// Content pages
import Article from '@/features/articles/routes/Article'
import Articles from '@/features/articles/routes/Articles'
import CreateArticle from '@/features/articles/routes/CreateArticle'
import EditArticle from '@/features/articles/routes/EditArticle'
import EditProfile from '@/features/user/routes/EditProfile'
import SignIn from '@/features/user/routes/SignIn'
import SignUp from '@/features/user/routes/SignUp'

const rootRoutes: RouteObject[] = [
  // Redirect '/' to '/articles'
  {
    index: true,
    element: <Navigate to="/articles" replace />,
  },
  // Normal routes
  {
    path: 'articles',
    Component: withTitle('Articles', Articles),
  },
  {
    path: 'articles/:slug',
    Component: withTitle('Article', Article),
  },
  {
    path: 'articles/:slug/edit',
    Component: withAuth('logged-in', withTitle('Edit article', EditArticle)),
  },
  {
    path: 'new-article',
    Component: withAuth(
      'logged-in',
      withTitle('Create article', CreateArticle),
    ),
  },
  {
    path: 'sign-in',
    Component: withAuth('not-logged-in', withTitle('Sign in', SignIn)),
  },
  {
    path: 'sign-up',
    Component: withAuth('not-logged-in', withTitle('Sign up', SignUp)),
  },
  {
    path: 'profile',
    Component: withAuth('logged-in', withTitle('Edit profile', EditProfile)),
  },
  // Page not found
  {
    path: '*',
    Component: withTitle('Not found', NotFound),
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: withTitle('Oops!', GenericError),
    children: [
      {
        // Try capturing error on this level as well
        // (To dispay error with header)
        ErrorBoundary: withTitle('Oops!', GenericError),
        children: rootRoutes,
      },
    ],
  },
])

export default router
