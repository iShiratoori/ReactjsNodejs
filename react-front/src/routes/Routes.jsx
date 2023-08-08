import { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from '../components/home';
import Login from '../components/Login';
import ProtectedRoutes from './ProtectedRoutes';
import AuthRequired from './AuthRequired'
import Layouts from "../components/layouts/Layouts";
import { AdminRoute, DentistRoute, GuestRoute, PatientRoute } from "./RoutePages";
import { AdminSidebarLinks, GuestSidebarLinks } from "./Links";
import { ServerDataProvider } from "../components/context/data.context";
import ErrorBoundary from '../components/ErrorBoundary';
import ServerError from "../components/Error/ServerError";
import Error from "../components/Error/Error";
import { DispatchErrorContext } from '../components/context/error.context';
import Register from "../components/Register";
const RoutePages = () => {
    const { dispatchError } = useContext(DispatchErrorContext)
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route
                    path="dashboard"
                    element={
                        <AuthRequired >
                            <Outlet />
                        </AuthRequired>}>
                    <Route
                        path='admin'
                        element={
                            <ProtectedRoutes requiredRole='admin'>
                                <Layouts sidebarLinks={AdminSidebarLinks}>
                                    <ErrorBoundary
                                        fallback={<ServerError />}
                                        dispatchError={dispatchError}>
                                        <ServerDataProvider role='admin'>
                                            <ErrorBoundary
                                                fallback={<Error />}
                                                dispatchError={dispatchError}>
                                                <Outlet />
                                            </ErrorBoundary>
                                        </ServerDataProvider>
                                    </ErrorBoundary>
                                </Layouts>
                            </ProtectedRoutes>
                        }>
                        {AdminRoute}
                    </Route>
                    <Route path='dentist'
                        element={
                            <ProtectedRoutes requiredRole='dentist'>
                                <Layouts sidebarLinks='dentist'>
                                    <Outlet />
                                </Layouts>
                            </ProtectedRoutes>
                        }>
                        {DentistRoute}
                    </Route>
                    <Route path='patient'
                        element={
                            <ProtectedRoutes requiredRole='patient'>
                                <Layouts sidebarLinks='patient'>
                                    <Outlet />
                                </Layouts>
                            </ProtectedRoutes>
                        }>
                        {PatientRoute}
                    </Route>
                    <Route path='guest'
                        element={
                            <ProtectedRoutes requiredRole='guest'>
                                <Layouts sidebarLinks={GuestSidebarLinks} >
                                    <Outlet />
                                </Layouts>
                            </ProtectedRoutes>
                        }>
                        {GuestRoute}
                    </Route>
                </Route>
                <Route path='*' element={<h1>404 No Found page</h1>} />
            </Route>

        </Routes>
    )
}

export default RoutePages
