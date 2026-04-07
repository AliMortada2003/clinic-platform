import React, { useMemo } from "react";
import {
    CalendarCheck,
    ClipboardList,
    Activity,
    Search,
    TrendingUp,
    CheckCircle2,
    Clock,
    ShieldPlus,
    Stethoscope,
    ArrowLeft,
    AlertCircle,
    FileWarning
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// المكونات الخاصة بالثيم والـ UI
import StatCard from "../../components/ui/cards/StatCard";
import ChartContainer from "../../components/ui/charts/ChartContainer";
import PieChart from "../../components/ui/charts/PieChart";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hocks/useAuth";
import { useAppointment } from "../../hocks/useAppointment";

function PatientDashboard() {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getPatientAppointments } = useAppointment();

    // استخراج بيانات المواعيد الحقيقية باستخدام الـ Hook
    const patientId = user?.patientId;
    const { data: patientAppointments, isLoading, isError } = getPatientAppointments(patientId);

    // 1. حساب الإحصائيات من البيانات القادمة من الـ API
    const statsData = useMemo(() => {
        if (!patientAppointments || !Array.isArray(patientAppointments)) {
            return { upcoming: 0, total: 0, canceled: 0, accepted: 0 };
        }

        return {
            upcoming: patientAppointments.filter(app => app.status === "Accepted").length,
            total: patientAppointments.length,
            canceled: patientAppointments.filter(app => app.status === "Canceled").length,
            accepted: patientAppointments.filter(app => app.status === "Accepted").length,
            pending: patientAppointments.filter(app => app.status === "Pending").length,
        };
    }, [patientAppointments]);

    // 2. إعداد الكروت العلوية (Stats Cards)
    const statsCards = useMemo(() => [
        {
            title: "مواعيد قادمة",
            value: statsData.upcoming,
            subtext: "حجوزات بانتظار دورك",
            icon: CalendarCheck,
            accent: isDark ? "bg-cyan-500 text-white" : "bg-cyan-600 text-white",
            change: "نشط الآن",
            changeType: "info",
            path: "/patient/appointments",
        },
        {
            title: "إجمالي الحجوزات",
            value: statsData.total,
            subtext: "سجل زياراتك بالكامل",
            icon: ClipboardList,
            accent: isDark ? "bg-purple-500 text-white" : "bg-purple-600 text-white",
            change: "محدث",
            changeType: "increase",
            path: "/patient/appointments",
        },
        {
            title: "تم الإلغاء",
            value: statsData.canceled,
            subtext: "مواعيد تم الاعتذار عنها",
            icon: AlertCircle,
            accent: isDark ? "bg-rose-500 text-white" : "bg-rose-600 text-white",
            change: "مؤرشف",
            changeType: "decrease",
            path: "/patient/appointments",
        },
        {
            title: "قيد الانتظار",
            value: statsData.pending,
            subtext: "مواعيد لم تتم الموافقة عليها بعد",
            icon: FileWarning,
            accent: isDark ? "bg-amber-500 text-white" : "bg-amber-600 text-white",
            change: "ممتاز",
            changeType: "increase",
            path: "/patient/medical-history",
        },
    ], [statsData, isDark]);

    // 3. بيانات الرسم البياني (Pie Chart) بناءً على الحالات الحقيقية
    const statusDistribution = useMemo(() => [
        { name: "مقبول", value: statsData.accepted, color: "#0891b2" }, // Cyan-600
        { name: "ملغي", value: statsData.canceled, color: "#e11d48" }, // Rose-600
    ], [statsData]);

    // دالة مساعدة لتنسيق التاريخ المستلم من السيرفر
    const formatDateTime = (dateString) => {
        if (!dateString) return "---";
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('ar-EG', options);
    };

    // معالجة حالة التحميل والخطأ
    if (isLoading) return (
        <div className="flex h-96 items-center justify-center animate-pulse">
            <div className="text-center">
                <Activity className="mx-auto text-cyan-500 mb-4 animate-spin" size={48} />
                <p className="text-slate-500 font-bold">جاري جلب بياناتك من عيادة سوهاج...</p>
            </div>
        </div>
    );

    if (isError) return (
        <div className="p-8 text-center bg-rose-50 rounded-3xl border border-rose-200">
            <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
            <h2 className="text-rose-800 font-black">حدث خطأ أثناء تحميل البيانات</h2>
            <p className="text-rose-600 text-sm mt-2">يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.</p>
        </div>
    );

    return (
        <div dir="rtl" className="space-y-6 pb-10">

            {/* Welcome Section */}
            <div className={`p-8 rounded-[2.5rem] border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative
                ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>

                <div className="z-10 relative text-center md:text-right">
                    <h1 className={`text-3xl font-black flex items-center justify-center md:justify-start gap-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                        <span className="p-3 bg-cyan-500/10 rounded-2xl hidden sm:block">
                            <Activity className="text-cyan-500" size={32} />
                        </span>
                        أهلاً بك، {user?.firstName || "مريضنا العزيز"}
                    </h1>
                    <p className={`text-lg mt-2 font-medium opacity-70 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        لديك <span className="text-cyan-500 font-black">{statsData.upcoming} مواعيد مؤكدة</span> في الفترة القادمة.
                    </p>

                    <button
                        onClick={() => navigate('/patient/book')}
                        className="mt-6 flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-cyan-600/20 active:scale-95 mx-auto md:mx-0"
                    >
                        <Search size={20} /> حجز موعد جديد
                    </button>
                </div>

                <div className="hidden md:block absolute left-[-20px] top-[-20px] opacity-10">
                    <Stethoscope size={250} className="text-cyan-500 rotate-12" />
                </div>
            </div>

            {/* Stats Grid */}
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((item, idx) => (
                    <StatCard key={idx} {...item} isDark={isDark} />
                ))}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Appointments List */}
                <div className={`lg:col-span-2 p-6 rounded-[2.5rem] border shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>آخر تحركات مواعيدك</h3>
                        <button onClick={() => navigate('/patient/appointments')} className="text-sm font-bold text-cyan-500 flex items-center gap-1 hover:gap-2 transition-all">
                            السجل الكامل <ArrowLeft size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {patientAppointments?.slice(0, 4).map((appt) => (
                            <div key={appt.id} className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-all
                                ${isDark ? "border-slate-800 bg-slate-800/30 hover:bg-slate-800/50" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 
                                        ${appt.status === "Canceled" ? "bg-rose-500/10 text-rose-500" : "bg-cyan-500/10 text-cyan-600"}`}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm">
                                            {appt.status === "Accepted" ? "كشف مؤكد" : "كشف ملغي"}
                                        </h4>
                                        <p className="text-xs text-slate-500 font-bold">
                                            {appt.status === "Canceled" ? `السبب: ${appt.cancellationReason || "غير محدد"}` : "عيادة الدكتور محمد - سوهاج"}
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto text-left">
                                    <span className={`inline-block px-4 py-2 rounded-xl text-[10px] font-black w-full sm:w-auto text-center
                                        ${appt.status === "Canceled" ? "bg-rose-100 text-rose-600" : "bg-cyan-100 text-cyan-700"}`}>
                                        {formatDateTime(appt.date)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {(!patientAppointments || patientAppointments.length === 0) && (
                            <div className="text-center py-10 text-slate-400 font-bold border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                                لا يوجد مواعيد مسجلة حالياً
                            </div>
                        )}
                    </div>
                </div>

                {/* Status Distribution Chart */}
                <div className="h-full">
                    <ChartContainer
                        title="حالة الحجوزات"
                        description="نسبة المواعيد المقبولة مقابل الملغية"
                        icon={TrendingUp}
                        height={380}
                        isDark={isDark}
                    >
                        <PieChart
                            data={statusDistribution}
                            innerRadius={70}
                            outerRadius={100}
                            showLegend={true}
                            isDark={isDark}
                        />
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
}

export default PatientDashboard;