import React, { useMemo } from "react";
import { 
    CalendarCheck, ClipboardList, Activity, Clock, TrendingUp, 
    RefreshCw, CheckCircle2, AlertCircle, UserCog, MessageCircleCode, Users 
} from "lucide-react";

// الهوكس الخاصة بك
import { useAppointment } from "../../hocks/useAppointment";
import { useAvailableDays } from "../../hocks/useAvailableDays";

// المكونات
import StatCard from "../../components/ui/cards/StatCard";
import ChartContainer from "../../components/ui/charts/ChartContainer";
import PieChart from "../../components/ui/charts/PieChart";
import LineChart from "../../components/ui/charts/LineChart";
import { useTheme } from "../../context/ThemeContext";


function AdminDashboard() {
    const { isDark } = useTheme();
    const { appointments, isLoading: isApptsLoading, allAppointmentsQuery } = useAppointment();
    const { days, isLoading: isDaysLoading } = useAvailableDays();

    console.log(days)
    // 🧮 معالجة البيانات لاستخراج الـ 8 ستاتس
    const statsData = useMemo(() => {
        if (!appointments) return {};

        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        // 1. حجوزات اليوم (فلترة المواعيد اللي تاريخها النهاردة)
        const todayAppts = appointments.filter(a => a.date?.includes(todayStr)) || [];
        
        // 2. الحالات المؤكدة (Accepted)
        const confirmedAppts = appointments.filter(a => a.status === "Accepted") || [];
        
        // 3. الحالات المعلقة (Pending) - تحتاج إجراء سريع
        const pendingAppts = appointments.filter(a => a.status === "Pending") || [];
        
        // 4. إجمالي المرضى الفريدين (Unique Patients)
        const uniquePatients = new Set(appointments.map(a => a.patientId || a.guestEmail)).size;

        // 5. نسبة الإنجاز اليومية (كم مريض تم كشفه / إجمالي اليوم)
        const completedToday = todayAppts.filter(a => a.status === "Completed").length;
        const completionRate = todayAppts.length > 0 ? Math.round((completedToday / todayAppts.length) * 100) : 0;

        // 6. الأيام المتاحة القادمة (من هوك الأيام)
        const activeDaysCount = days?.filter(d => d.isAvailable).length || 0;

        return {
            todayCount: todayAppts.length,
            pendingCount: pendingAppts.length,
            totalPatients: uniquePatients,
            confirmedCount: confirmedAppts.length,
            activeDays: activeDaysCount,
            completionRate: `${completionRate}%`,
            newInquiries: 12, // يمكن ربطها بهوك الرسائل لاحقاً
            canceledCount: appointments.filter(a => a.status === "Canceled").length
        };
    }, [appointments, days]);

    const statsCards = useMemo(() => [
        {
            title: "حجوزات اليوم",
            value: statsData.todayCount || 0,
            subtext: "إجمالي مواعيد اليوم",
            icon: CalendarCheck,
            accent: isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-600 text-white",
            change: "مباشر",
            changeType: "increase",
            path: "/admin/appointments",
        },
        {
            title: "طلبات معلقة",
            value: statsData.pendingCount || 0,
            subtext: "تنتظر الموافقة",
            icon: Clock,
            accent: isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-500 text-white",
            change: "عاجل",
            changeType: "warning",
            path: "/admin/appointments?status=Pending",
        },
        {
            title: "إجمالي المرضى",
            value: statsData.totalPatients || 0,
            subtext: "مريض مسجل",
            icon: Users,
            accent: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-500 text-white",
            change: "+5 جديد",
            changeType: "increase",
            path: "/admin/patients",
        },
        {
            title: "نسبة الإنجاز",
            value: statsData.completionRate || "0%",
            subtext: "من حجوزات اليوم",
            icon: Activity,
            accent: isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-cyan-600 text-white",
            change: "ممتاز",
            changeType: "increase",
        },
        {
            title: "أيام العمل المتاحة",
            value: statsData.activeDays || 0,
            subtext: "أيام مفعلة بالجدول",
            icon: ClipboardList,
            accent: isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-600 text-white",
            change: "مستقر",
            changeType: "info",
        },
        {
            title: "المواعيد المؤكدة",
            value: statsData.confirmedCount || 0,
            subtext: "حجوزات نهائية",
            icon: CheckCircle2,
            accent: isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-600 text-white",
            change: "مستمر",
            changeType: "increase",
        },
        {
            title: "استشارات جديدة",
            value: statsData.newInquiries || 0,
            subtext: "رسائل المرضى",
            icon: MessageCircleCode,
            accent: isDark ? "bg-rose-500/20 text-rose-400" : "bg-rose-600 text-white",
            change: "تفاعل",
            changeType: "increase",
        },
        {
            title: "حجوزات ملغاة",
            value: statsData.canceledCount || 0,
            subtext: "إجمالي الملغي",
            icon: AlertCircle,
            accent: isDark ? "bg-slate-500/20 text-slate-400" : "bg-slate-700 text-white",
            change: "تنبيه",
            changeType: "info",
        }
    ], [statsData, isDark]);

    // if (isApptsLoading || isDaysLoading) return <div className="p-10 text-center font-bold">جاري تحميل بيانات العيادة...</div>;

    return (
        <div dir="rtl" className="space-y-6">
            {/* Header */}
            <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-3xl border shadow-sm
                ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                <div>
                    <h1 className={`text-2xl font-black flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                        <Activity className="text-cyan-500" />
                        لوحة تحكم العيادة
                    </h1>
                    <p className={`text-sm mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        مرحباً دكتور محمد، إليك حالة العيادة الآن.
                    </p>
                </div>
                <button 
                    onClick={() => allAppointmentsQuery.refetch()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all"
                >
                    <RefreshCw size={18} /> تحديث البيانات
                </button>
            </div>

            {/* 8 Stats Grid */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx} {...item} isDark={isDark} />
                ))}
            </section>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartContainer title="نمو الحجوزات" icon={TrendingUp} height={300}>
                        <LineChart 
                            data={[{name: 'السبت', حجوزات: 5}, {name: 'الأحد', حجوزات: 12}]} 
                            xAxisDataKey="name"
                            lines={[{ dataKey: "حجوزات", color: "#0891b2" }]} 
                        />
                    </ChartContainer>
                </div>
                <ChartContainer title="توزيع الحالات" icon={PieChart} height={300}>
                    <PieChart 
                        data={[
                            {name: 'مؤكد', value: statsData.confirmedCount, color: '#0891b2'},
                            {name: 'معلق', value: statsData.pendingCount, color: '#f59e0b'}
                        ]} 
                    />
                </ChartContainer>
            </div>
        </div>
    );
}

export default AdminDashboard;