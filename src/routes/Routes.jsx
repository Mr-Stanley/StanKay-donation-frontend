import React from 'react';
import Layout from '../components/Layout.jsx';
import LoginPage from '../pages/homepage/LoginPage.jsx';
import DonateNowPage from '../pages/donateNowPage/DonateNowPage.jsx';
import UserDashboard from '../pages/userDashboard/UserDashboard.jsx';
import AdminDashboard from '../pages/adminDashboard/AdminDashboard.jsx';
import AdminLogin from '../pages/adminLogin/AdminLogin.jsx';
import CharitiesManagement from '../pages/charityManagement/charitiesManagement.jsx';
import AddCharity from '../pages/addCharity/AddCharity.jsx';
import EditCharity from '../pages/addCharity/EditCharity.jsx';
import DonationsManagement from '../pages/donationManagement/DonationsManagement.jsx';
import SignupPage from '../pages/homepage/SignupPage.jsx';


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
