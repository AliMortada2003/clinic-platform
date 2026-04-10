import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from './../hocks/useAuth';
import FullPageLoader from './../components/ui/layout/FullPageLoader';

export default function PrivateRoute({ allowedRoles }) {
    const { user, isAuthenticated, userRole, isLoading } = useAuth();
    const location = useLocation();

    // console.log({ isAuthenticated, userRole, isLoading, allowedRoles }); // شيلها بعد التأكد

    if (isLoading) {
        // لا تتركها null، ضع لودر لتعرف هل هو معلق هنا أم لا
        return <FullPageLoader/>
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const isAllowed = allowedRoles?.some(r => r.toLowerCase() === userRole?.toLowerCase());

    if (!isAllowed) {
        const role = userRole?.toLowerCase();
        // تأكد أن هذه المسارات معرفة في AppRouter
        const redirectPath = (role === '*-*-*-*') ? '/admin' : '/patient';
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}