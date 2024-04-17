import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('user');
    return firstLogin ? <Outlet {...props}></Outlet> : <Navigate to='/login'></Navigate>;
};

export default PrivateRouter;