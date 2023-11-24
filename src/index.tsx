import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import '@/styles/index.scss'

import router from '@/router'
import { createStore } from '@/store'
import BlogApiClient from '@/services/blog-api'

const api = new BlogApiClient('https://blog.kata.academy/api/')

const store = createStore({ api })

const rootElement = document.getElementById('root')

const root = ReactDOM.createRoot(rootElement!)

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
