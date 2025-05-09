import React from 'react';
import SignupPage from '../pages/SignupPage.jsx';
import Layout from '../components/Layout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DonateNowPage from '../pages/DonateNowPage.jsx';
import UserDashboard from '../pages/UserDashboard.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import AdminLogin from '../pages/AdminLogin.jsx';
import CharitiesManagement from '../pages/charitiesManagement.jsx';
import AddCharity from '../pages/AddCharity.jsx';
import EditCharity from '../pages/EditCharity.jsx';
import DonationsManagement from '../pages/DonationsManagement.jsx';



export const ROUTES = [
  {
    path: '/',
    element: <Layout />,
},
      {
        path: '/sign-up',
        element: <SignupPage />,
      },
      {
        path: '/LoginPage',
        element: <LoginPage />,
      },
      {
        path: '/DonateNowPage',
        element: <DonateNowPage/>,
      },
      {
        path: '/UserDashboard',
        element: (
            <UserDashboard/>
        ),
      },
      {
        path: '/AdminDashboard',
        element: <AdminDashboard/>,
      },
      {
        path: '/AdminLogin',
        element: <AdminLogin/>,
      },
      {
        path: '/CharitiesManagement',
        element: <CharitiesManagement/>,
      },
      {
        path: '/AddCharity',
        element: <AddCharity/>,
      },
      {
        path: '/EditCharity',
        element: <EditCharity/>,
      },
      {
        path: '/DonationsManagement',
        element: <DonationsManagement/>,
      },

];
