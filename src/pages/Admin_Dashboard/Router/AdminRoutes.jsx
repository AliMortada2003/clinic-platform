import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../../router/PrivateRoute";
import AdminLayout from './../../../Layouts/AdminLayout';

// استيراد الصفحات (تأكد من إنشاء هذه الملفات في فولدر Pages/Admin)
import AdminDashboard from "../AdminDashboard";
import SchedulePage from "../SchedulePage/SchedulePage";
import PatientsPage from "../Patient/PatientsPage";
import AppointmentsPage from "../appointments/AppointmentsPage";
import AdminProfilePage from "../profile/DoctorProfile";
import PatientsReportsPage from "../PatientsReports/PatientsReportsPage";
import DoctorsManagement from "../DoctorsManagement/DoctorsManagement";
import BookPageManuly from "../bookManual/BookPageManuly";

export default function AdminRoutes() {
    return (
        <Routes>
            {/* الحماية العامة لجميع مسارات الأدمن */}
            <Route element={<PrivateRoute allowedRoles={["*-*-*-*"]} />}>
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
                    <Route path="reports" element={<PatientsReportsPage />} />

                    {/* Doctors Managements */}
                    <Route path="doctormanage" element={<DoctorsManagement />} />

                    {/* تعديل بيانات الدكتور (Patch Doctor) */}
                    <Route path="profile" element={<AdminProfilePage />} />


                    {/* تعديل بيانات الدكتور (Patch Doctor) */}
                    <Route path="bookmanual" element={<BookPageManuly />} />
                </Route>
            </Route>
        </Routes>
    );
}