import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Category from './pages/Category';
import ErrorPage from './pages/Error/Error';
import Trademark from './pages/Trademark';
import Product from './pages/Product';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Main from './layouts/Main/Main';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ImportOrder from './pages/ImportOrder';
import ExportOrder from './pages/ExportOrder';
import DashBoard from './pages/DashBoard';
import Consignment from './pages/Consignment';

  
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "categories",
            element: <Category />,
          },
          {
            path: "trademarks",
            element: <Trademark />
          },
          {
            path: "products",
            element: <Product />
          },
          {
            path: "importOrders",
            element: <ImportOrder/>
          },
          {
            path: "exportOrders",
            element: <ExportOrder/>
          },
          {
            path: "dashboard",
            element: <DashBoard />
          },
          {
            path: "consignment",
            element: <Consignment />
          },
          {
            path: "",
            element: <Navigate to="/dashboard" />,
          },
        ]
      },
      
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
