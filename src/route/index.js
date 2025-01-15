import AdminPage from '../Page/Admin/AdminPage';
import HistoryBook from '../Page/HistoryBook/HistoryBook';
import HomePage from '../Page/HomePage/HomePage';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';
import InfoUser from '../Page/User/InfoUser';
export const publicRoutes = [
    { path: '/', element: <Login /> },
    { path: '/reg', element: <Register /> },
];

export const privateRoutes1 = [
    { path: '/homepage', element: <HomePage /> },
    { path: '/info', element: <InfoUser /> },
    { path: '/history', element: <HistoryBook /> },
];

export const privateRoutes = [{ path: '/admin', element: <AdminPage /> }];
