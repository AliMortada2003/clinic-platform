import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarCheck,
    ClipboardList,
    Activity,
    Clock,
    TrendingUp,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    UserCog,
    MessageCircleCode,
    Timer
} from "lucide-react";


// ✅ الكومبوننتس الجاهزة من مشروعك
import StatCard from "../../components/ui/cards/StatCard";
import ChartContainer from "../../components/ui/charts/ChartContainer";
import PieChart from "../../components/ui/charts/PieChart";
import LineChart from "../../components/ui/charts/LineChart";
import { useTheme } from "../../context/ThemeContext";

function AdminDashboard() {
    const { isDark } = useTheme(); // سحب حالة الثيم
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false)
    // بيانات افتراضية في حالة عدم توفر API حالياً (للتجربة)
    const data = useMemo(() => ({
        todayAppts: stats?.todayAppointmentsCount ?? 24,
        pending: stats?.pendingConfirmCount ?? 5,
        totalPatients: stats?.totalPatientsCount ?? 1250,
        revenue: stats?.monthlyRevenue ?? 15400,
        onlineRatio: stats?.onlineAppointments ?? 30,
        inPersonRatio: stats?.inPersonAppointments ?? 70,
    }), [stats]);

    const statsCards = useMemo(() => [
        // --- الصف الأول: إدارة المواعيد والتشغيل الفوري ---
        {
            title: "حجوزات هذا الشهر",
            value: data.todayAppts || 0,
            subtext: "إجمالي المسجلين ",
            icon: CalendarCheck,
            // في الـ Light بياخد لون صريح، في الـ Dark بياخد خلفية شفافة مع نص مضيء
            accent: isDark ? "bg-blue-500 text-blue-400" : "bg-blue-600 text-white",
            change: "+4",
            changeType: "increase",
            path: "/admin/appointments",
        },
        {
            title: "طلبات معلقة",
            value: data.pending || 0,
            subtext:  " طلبات تنتظر التأكيد",
            icon: Clock,
            accent: isDark ? "bg-amber-500 text-amber-400" : "bg-amber-500 text-white",
            change: "عاجل",
            changeType: "warning",
            path: "/admin/appointments?status=pending",
        },
        // --- الصف الثاني: البيانات، التواصل، وجودة النظام ---
        {
            title: "إجمالي المرضى",
            value: data.totalPatients || 0,
            subtext: "قاعدة بيانات العيادة",
            icon: UserCog,
            accent: isDark ? "bg-emerald-500 text-emerald-400" : "bg-emerald-500 text-white",
            change: "نمو 5%",
            changeType: "increase",
            path: "/admin/patients",
        },
        {
            title: "استشارات جديدة من المرضى",
            value: data.newMessages || "12",
            subtext: "المتابعه مع المرضى والرد علي الرسائل",
            icon: MessageCircleCode,
            accent: isDark ? "bg-purple-500 text-purple-400" : "bg-purple-600 text-white",
            change: "جديد",
            changeType: "increase",
            path: "/admin/messages",
        },
        {
            title: "تقارير المرضى ",
            value: data.pendingReports || "7",
            subtext: "تقارير خاصة بالمرضى لم يتم إدراجها حتى الان",
            icon: ClipboardList,
            accent: isDark ? "bg-cyan-500 text-cyan-400" : "bg-cyan-700 text-white",
            change: "مهم",
            changeType: "info",
            path: "/admin/reports/pending",
        },
    ], [data, isDark]);
    const appointmentsPie = useMemo(() => [
        { name: "حضوري", value: data.inPersonRatio, color: isDark ? "#3b82f6" : "#2563eb" },
        { name: "أونلاين", value: data.onlineRatio, color: isDark ? "#10b981" : "#059669" },
    ], [data, isDark]);

    const growthData = [
        { name: "سبت", حجوزات: 12 },
        { name: "أحد", حجوزات: 18 },
        { name: "اثنين", حجوزات: 15 },
        { name: "ثلاثاء", حجوزات: 24 },
        { name: "أربعاء", حجوزات: 20 },
        { name: "خميس", حجوزات: 28 },
    ];

    return (
        <div dir="rtl" className={`space-y-6 transition-colors duration-300`}>

            {/* Header Section */}
            <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-3xl border shadow-sm
                ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                <div>
                    <h1 className={`text-2xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                        <Activity className="text-blue-500" />
                        لوحة التحكم
                    </h1>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        مرحباً دكتور، إليك ملخص نشاط العيادة لهذا اليوم.
                    </p>
                </div>

                <button
                    // onClick={fetchStats}
                    disabled={loading}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border font-bold transition-all
                        ${isDark
                            ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                        } disabled:opacity-50`}
                >
                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    تحديث البيانات
                </button>
            </div>

            {/* Stats Cards Grid */}
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx}  {...item} isDark={isDark} />
                ))}
            </section>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartContainer
                        title="تحليل الحجوزات الأسبوعي"
                        description="تطور عدد الحجوزات على مدار الأسبوع الحالي"
                        icon={TrendingUp}
                        height={350}
                    >
                        <LineChart
                            data={growthData}
                            xAxisDataKey="name"
                            lines={[{ dataKey: "حجوزات", name: "المرضى", color: "#3b82f6", width: 4 }]}
                        />
                    </ChartContainer>
                </div>

                <div>
                    <ChartContainer
                        title="نوع الكشف"
                        description="نسبة الحضور الشخصي للأونلاين"
                        icon={ClipboardList}
                        height={350}
                        isDark={isDark}
                    >
                        <PieChart
                            data={appointmentsPie}
                            innerRadius={70}
                            outerRadius={100}
                            showLegend={true}
                            isDark={isDark}
                        />
                    </ChartContainer>
                </div>
            </div>

            {/* Recent Activity / Appointments List */}
            <div className={`p-6 rounded-3xl border shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-800"}`}>أحدث المواعيد القادمة</h3>
                    <button className="text-sm font-bold text-blue-500 hover:underline">عرض الكل</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead>
                            <tr className={`border-b ${isDark ? "border-slate-800 text-slate-400" : "border-slate-50 text-slate-500"} text-sm`}>
                                <th className="pb-3 pr-2">المريض</th>
                                <th className="pb-3 text-center">الوقت</th>
                                <th className="pb-3 text-center">الحالة</th>
                                <th className="pb-3 text-left">الإجراء</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/5">
                            {[1, 2, 3].map((_, i) => (
                                <tr key={i} className={`group transition-colors ${isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50/50"}`}>
                                    <td className="py-4 pr-2">
                                        <div className="font-bold text-sm">محمد أحمد علي</div>
                                        <div className="text-xs text-slate-500">كشف رمد - جديد</div>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${isDark ? "bg-slate-800" : "bg-slate-100"}`}>
                                            10:30 ص
                                        </span>
                                    </td>
                                    <td className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-1 text-xs text-emerald-500 font-bold">
                                            <CheckCircle2 size={14} /> مؤكد
                                        </div>
                                    </td>
                                    <td className="py-4 text-left">
                                        <button className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-500 transition-colors">
                                            <AlertCircle size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;