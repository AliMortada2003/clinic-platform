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
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ استخدام نفس المكونات التي تدعم الثيم
import StatCard from "../../components/ui/cards/StatCard";
import ChartContainer from "../../components/ui/charts/ChartContainer";
import PieChart from "../../components/ui/charts/PieChart";
import { useTheme } from "../../context/ThemeContext";

function PatientDashboard() {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    // بيانات افتراضية للمريض (يمكنك ربطها بـ API لاحقاً)
    const data = useMemo(() => ({
        upcomingAppts: 2,
        completedAppts: 12,
        medicalReports: 5,
        prescriptions: 8,
        healthScore: 85, // نسبة اكتمال الملف الصحي مثلاً
    }), []);

    const statsCards = useMemo(() => [
        {
            title: "مواعيد قادمة",
            value: data.upcomingAppts,
            subtext: "حجوزات تنتظر دورك",
            icon: CalendarCheck,
            accent: isDark ? "bg-cyan-500 text-cyan-400" : "bg-cyan-600 text-white",
            change: "قريباً",
            changeType: "info",
            path: "/patient/appointments",
        },
        {
            title: "تقارير طبية",
            value: data.medicalReports,
            subtext: "نتائج الفحوصات الجاهزة",
            icon: ClipboardList,
            accent: isDark ? "bg-purple-500 text-purple-400" : "bg-purple-600 text-white",
            change: "جديد",
            changeType: "increase",
            path: "/patient/medical-history",
        },
        {
            title: "إجمالي الزيارات",
            value: data.completedAppts,
            subtext: "منذ انضمامك إلينا",
            icon: CheckCircle2,
            accent: isDark ? "bg-emerald-500 text-emerald-400" : "bg-emerald-600 text-white",
            change: "+1 الشهر الماضي",
            changeType: "increase",
            path: "/patient/appointments",
        },
        {
            title: "الوصفات الطبية",
            value: data.prescriptions,
            subtext: "الأدوية المسجلة لك",
            icon: ShieldPlus,
            accent: isDark ? "bg-rose-500 text-rose-400" : "bg-rose-600 text-white",
            change: "فعالة",
            changeType: "warning",
            path: "/patient/medical-history",
        },
    ], [data, isDark]);

    // بيانات الرسم البياني لتوزيع الحجوزات حسب التخصص
    const specializationPie = useMemo(() => [
        { name: "رمد", value: 40, color: "#0891b2" },
        { name: "أسنان", value: 30, color: "#8b5cf6" },
        { name: "باطنة", value: 30, color: "#10b981" },
    ], []);

    return (
        <div dir="rtl" className="space-y-6">

            {/* Welcome Section */}
            <div className={`p-8 rounded-[2.5rem] border shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden relative
                ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>

                <div className="z-10">
                    <h1 className={`text-3xl font-black flex items-center gap-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                        <span className="p-3 bg-cyan-500/10 rounded-2xl">
                            <Activity className="text-cyan-500" size={32} />
                        </span>
                        أهلاً بك، محمد!
                    </h1>
                    <p className={`text-lg mt-2 font-medium opacity-70 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        نتمنى لك يوماً صحياً. لديك <span className="text-cyan-500 font-black">{data.upcomingAppts} مواعيد</span> هذا الأسبوع.
                    </p>

                    <button
                        onClick={() => navigate('/patient/explore')}
                        className="mt-6 flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-cyan-600/20 active:scale-95"
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
                {/* Upcoming Appointments Table */}
                <div className={`lg:col-span-2 p-6 rounded-[2.5rem] border shadow-sm ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className={`text-xl font-black ${isDark ? "text-white" : "text-slate-800"}`}>جدول مواعيدك</h3>
                        <button onClick={() => navigate('/patient/appointments')} className="text-sm font-bold text-cyan-500 flex items-center gap-1 hover:gap-2 transition-all">
                            عرض الكل <ArrowLeft size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[1, 2].map((_, i) => (
                            <div key={i} className={`p-4 rounded-3xl border flex items-center justify-between group transition-all
                                ${isDark ? "border-slate-800 bg-slate-800/30 hover:bg-slate-800/50" : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm">د. علي صبري</h4>
                                        <p className="text-xs text-slate-500 font-bold">كشف عيون - عيادة سوهاج</p>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <span className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase
                                        ${isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-100 text-cyan-700"}`}>
                                        الأحد، 10:30 ص
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Health Chart */}
                <div>
                    <ChartContainer
                        title="توزيع زياراتك"
                        description="أكثر التخصصات التي قمت بزيارتها"
                        icon={TrendingUp}
                        height={350}
                        isDark={isDark}
                    >
                        <PieChart
                            data={specializationPie}
                            innerRadius={75}
                            outerRadius={105}
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