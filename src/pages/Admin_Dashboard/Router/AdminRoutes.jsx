import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../../router/PrivateRoute";
import AdminLayout from './../../../Layouts/AdminLayout';

// استيراد الصفحات (تأكد من إنشاء هذه الملفات في فولدر Pages/Admin)
import AdminDashboard from "../AdminDashboard";
import SchedulePage from "../SchedulePage/SchedulePage";
import PatientsPage from "../Patient/PatientsPage";
import AppointmentsPage from "../appointments/AppointmentsPage";
import AdminProfilePage from "../profile/AdminProfilePage";
// import SchedulePage from "../Schedule/SchedulePage";
// import PatientsPage from "../Patients/PatientsPage";
// import AdminProfile from "../Profile/AdminProfile";
// import NewRequestsPage from "../Requests/NewRequestsPage"; // لوجود "New Request" في الـ API

export default function AdminRoutes() {
    return (
        <Routes>
            {/* الحماية العامة لجميع مسارات الأدمن */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route element={<AdminLayout />}>
                    {/* لوحة التحكم الرئيسية */}
                    <Route index element={<AdminDashboard />} />

                    {/* إدارة المواعيد (الحجز، القبول، الإلغاء) */}
                    <Route path="appointments" element={<AppointmentsPage />} />

                    {/* تنظيم الأيام والساعات (AvailableDay & Slots) */}
                    <Route path="schedule" element={<SchedulePage />} />

                    {/* سجلات المرضى والروشتات (Patient Attachments) */}
                    <Route path="patients" element={<PatientsPage />} />

                    {/* طلبات التسجيل الجديدة (New Request) */}
                    {/* <Route path="requests" element={<NewRequestsPage />} /> */}

                    {/* تعديل بيانات الدكتور (Patch Doctor) */}
                    <Route path="profile" element={<AdminProfilePage />} />
                </Route>
            </Route>
        </Routes>
    );
}