import React from 'react'; 
import SignUpPage from '../pages/SignupPage.jsx';
import Layout from '../components/Layout.jsx';
import DonationForm from '../pages/CardPaymentPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import TransferPaymentPage from '../pages/TransferPaymentPage.jsx';
import DonateNowPage from '../pages/DonateNowPage.jsx';




export const ROUTES = [
    {
        path: '/',
        element: <Layout />,
    },

    {
        path:'/sign-up',
        element: <SignUpPage />,

    },
    {
        path: '/Donation-Form',
        element: <DonationForm />,
    },
    {
        path: '/LoginPage',
        element: <LoginPage />,
    },
    {
        path: '/TransferPayment',
        element: <TransferPaymentPage />,
    },
    {
        path: '/DonateNowPage',
        element: <DonateNowPage/>,
    }


]