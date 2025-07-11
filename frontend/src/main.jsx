import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Home.jsx';
import AddUsers from './components/AddUsers.jsx';
import UpdateUsers from './components/UpdateUsers.jsx';
import Users2 from './components/Users2.jsx'
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout></Layout>,
    children: [
      {
        path: "",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/users')
      },
      {
        path: "addusers",
        element: <AddUsers></AddUsers>
      },
      {
        path: "updateusers/:id",
        element: <UpdateUsers></UpdateUsers>,
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
      },
      {
        path: "users2",
        element:<Users2></Users2>
      },
      {
        path: "updateusers/:id",
        element: <UpdateUsers></UpdateUsers>,
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
      },
    ]
  },
]);
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  </StrictMode>,
)
