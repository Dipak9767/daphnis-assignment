import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LogIn from './Pages/LogIn';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import { useSelector } from 'react-redux'

const AllRoutes = () => {
    const user = useSelector((state) => state.user);

    const NavBarHOC = () => {
        return (
            <>
                <NavBar />
                <Outlet />
            </>
        )
    }

    // for protected routes 
    const IsAuth = () => {
        if (user.isAuth) {
            return (
                <Outlet />
            )
        } else {
            return <Navigate to="/" />;
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LogIn />} />
                <Route element={<NavBarHOC />}>
                    <Route element={<IsAuth />}>
                        <Route path='/home' element={<Home />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default AllRoutes