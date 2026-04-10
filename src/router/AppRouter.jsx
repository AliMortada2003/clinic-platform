import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutPage from '../pages/About page/AboutPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import ReserveSections from "../pages/ReservePage/ReservePage";
import QyestionPage from "../pages/QuestionsPage/QyestionPage";
import Login from "../pages/loginPage/LoginPage";
import Register from "../pages/registerPage/RegisterPage";
import AdminRoutes from "../pages/Admin_Dashboard/Router/AdminRoutes";
import PrivateRoute from "./PrivateRoute";
import PatientRoutes from "../pages/PatientDashboard/router/PatientRoutes";

const AppRouter = () => {
    return (
        <Routes>
            {/* 🌍 المسارات العامة */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/bookingsystem" element={<ReserveSections />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<QyestionPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* ✅ مسارات الإدارة والدكاترة */}
            {/* أضف "Doctor" هنا لأن هذا هو الـ Role الذي ظهر في الـ Log عندك */}
            <Route element={<PrivateRoute allowedRoles={["*-*-*-*"]} />}>
                <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>

            {/* ✅ مسارات المرضى */}
            <Route element={<PrivateRoute allowedRoles={["Patient"]} />}>
                <Route path="/patient/*" element={<PatientRoutes />} />
            </Route>

            {/* 🚫 صفحة 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;