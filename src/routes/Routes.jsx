import React from 'react';
import SignUpPage from '../pages/SignupPage.jsx';
import Layout from '../components/Layout.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import DonateNowPage from '../pages/DonateNowPage.jsx';
import UserDashboard from '../pages/UserDashboard.jsx';
import { Navigate } from 'react-router-dom';


export const ROUTES = [
  {
    path: '/',
    element: <Layout />,
},
      {
        path: '/sign-up',
        element: <SignUpPage />,
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
];








// import React from 'react'; 
// import SignUpPage from '../pages/SignupPage.jsx';
// import Layout from '../components/Layout.jsx';
// import LoginPage from '../pages/LoginPage.jsx';
// import DonateNowPage from '../pages/DonateNowPage.jsx';
// import UserDashboard from '../pages/UserDashboard.jsx';




// export const ROUTES = [
//     {
//         path: '/',
//         element: <Layout />,
//     },

//     {
//         path:'/sign-up',
//         element: <SignUpPage />,

//     },

//     {
//         path: '/LoginPage',
//         element: <LoginPage />,
//     },
 
//     {
//         path: '/DonateNowPage',
//         element: <DonateNowPage/>,
//     },
//     {
//         path: '/UserDashboard',
//         element: <UserDashboard/>,
    
//     },


// ]