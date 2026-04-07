import React from 'react'
import PrivateRoute from '../../../router/PrivateRoute'
import { Route, Routes } from 'react-router-dom'
import PatientDashboard from '../PatientDashboard'
import PatientLayout from '../../../Layouts/PatientLayout'
import PatientAppointmentsPage from '../myAppointment/PatientAppointmentsPage'
import PatientProfilePage from '../profile/PatientProfilePage'
import PatientReportsPage from '../reports/PatientReportsPage'
import BookingFlow from '../../../sections/BookingSystem'

function PatientRoutes() {
    return (
        <Routes>
            {/* الحماية العامة لجميع مسارات الأدمن */}
            <Route element={<PrivateRoute allowedRoles={["Patient"]} />}>
                <Route element={<PatientLayout />}>
                    {/* لوحة التحكم الرئيسية */}
                    <Route index element={<PatientDashboard />} />

                    {/* profile */}
                    <Route path='profile' element={<PatientProfilePage />} />

                    {/* Appointments Details */}
                    <Route path='appointments' element={<PatientAppointmentsPage />} />

                    {/* Patient Reports */}
                    <Route path='medical-history' element={<PatientReportsPage />} />

                    {/* patient book  */}
                    <Route path='book' element={<BookingFlow />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default PatientRoutes