import React, { useMemo, useState } from "react";
import {
    User, Mail, Phone, MapPin, GraduationCap, Building,
    Edit, ArrowLeft, Shield, ShieldCheck, Hash, Calendar, IdCard, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// ✅ الإعدادات الخاصة بكل رتبة
const ROLE_CONFIGS = {
    student: {
        title: "ملف الطالب",
        primaryColor: "from-[#0A8DBA] to-[#0FB5A9]",
        secondaryColor: "from-blue-600 to-blue-800",
        borderColor: "group-hover:border-blue-300",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        icon: GraduationCap,
    },
    teacher: {
        title: "ملف المعلم",
        primaryColor: "from-[#6366F1] to-[#8B5CF6]",
        secondaryColor: "from-indigo-600 to-purple-700",
        borderColor: "group-hover:border-indigo-300",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
        icon: IdCard,
    },
    admin: {
        title: "ملف الإدارة",
        primaryColor: "from-[#EF4444] to-[#F59E0B]",
        secondaryColor: "from-slate-700 to-slate-900",
        borderColor: "group-hover:border-red-300",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        icon: Shield,
    },
    superadmin: {
        title: "الإدارة العليا (Super)",
        primaryColor: "from-[#1e1b4b] via-[#312e81] to-[#1e1b4b]", // بنفسجي غامق ملكي
        secondaryColor: "from-amber-500 to-yellow-700", // ألوان ذهبية للتمميز
        borderColor: "group-hover:border-amber-400",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        icon: ShieldCheck, // أيقونة درع مفعل
    },
};

const normalizeRole = (role) => {
    if (!role) return "student";
    const r = String(role).toLowerCase();

    // 1. افحص السوبر أدمن أولاً لأنه يحتوي على كلمة أدمن
    if (r.includes("superadmin")) return "superadmin";

    // 2. ثم افحص الأدمن العادي
    if (r.includes("admin")) return "admin";

    // 3. باقي الرتب
    if (r.includes("teacher")) return "teacher";
    if (r.includes("student")) return "student";

    return "student";
};

const normalizeProfile = (p = {}) => ({
    id: p.id ?? p.Id,
    userId: p.userId ?? p.UserId,
    firstName: p.firstName ?? p.FirstName,
    lastName: p.lastName ?? p.LastName,
    email: p.email ?? p.Email,
    phone: p.phone ?? p.Phone,
    address: p.address ?? p.Address,
    collegeName: p.collegeName ?? p.CollegeName ?? p.college ?? p.College,
    level: p.level ?? p.Level,
    imageUrl: p.imageUrl ?? p.ImageUrl,
    specialization: p.specialization ?? p.Specialization,
    department: p.department ?? p.Department,
});

const formatDate = (iso) => {
    if (!iso) return "—";
    try {
        return new Date(iso).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return "—";
    }
};

export default function ProfileSettingsBase({ onEditClick }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isImageOpen, setIsImageOpen] = useState(false);

    const role = normalizeRole(user?.role);
    const config = ROLE_CONFIGS[role] || ROLE_CONFIGS.student;
    const profile = useMemo(() => normalizeProfile(user?.profile || {}), [user?.profile]);
    // console.log(config)
    const fullName = useMemo(() => {
        const f = profile.firstName || "";
        const l = profile.lastName || "";
        return `${f} ${l}`.trim() || "—";
    }, [profile.firstName, profile.lastName]);

    const accountExpire = user?.expireDate;

    if (!user?.isAuthenticated || !user) {
        return <div className="p-6 text-gray-800 font-medium text-center">يجب تسجيل الدخول أولاً</div>;
    }

    return (
        <div className="min-h-screen  p-4 md:p-8 relative">

            {/* ✅ نافذة عرض الصورة (Lightbox) */}
            {isImageOpen && profile.imageUrl && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setIsImageOpen(false)}
                >
                    <button className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                        <X size={30} />
                    </button>
                    <img
                        src={profile.imageUrl}
                        alt={fullName}
                        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط على الصورة نفسها
                    />
                </div>
            )}

            {/* Header */}
            <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 hover:shadow-md transition-all"
                        >
                            <ArrowLeft className={`h-5 w-5 ${config.iconColor}`} />
                        </button>
                        <div className="text-right">
                            <h1 className={`text-2xl md:text-3xl font-bold text-[#00bfff] drop-shadow-sm`}>
                                {config.title}
                            </h1>
                            <p className={`${role === "student" ? "text-amber-50" : "text-gray-700"} flex items-center gap-2 font-medium justify-end`}>
                                إدارة البيانات الشخصية والحساب
                                <ShieldCheck className="h-4 w-4 text-green-600" />
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onEditClick}
                            className={`flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${config.primaryColor} text-white font-semibold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all`}
                        >
                            <Edit className="h-5 w-5" />
                            <span>تعديل الملف</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir="rtl">
                {/* Side Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">

                        {/* ✅ خلفية الكارد: أيقونات User متكررة بشكل جمالي */}
                        <div className="h-32 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 opacity-[0.04] flex flex-wrap gap-5 p-2 rotate-12 scale-150 pointer-events-none">
                                {[...Array(24)].map((_, i) => <User key={i} size={35} />)}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
                            <User className="text-slate-400 opacity-10" size={90} />

                            <div className="absolute -bottom-12 top-6 left-1/2 -translate-x-1/2">
                                <div
                                    onClick={() => profile.imageUrl && setIsImageOpen(true)}
                                    className={`w-24 h-24 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden transition-all duration-300 ${profile.imageUrl ? 'hover:scale-105 cursor-pointer hover:shadow-2xl' : ''}`}
                                >
                                    {profile.imageUrl ? (
                                        <img src={profile.imageUrl} className="w-full h-full object-cover" alt={fullName} />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${config.secondaryColor} flex items-center justify-center text-white text-3xl font-bold`}>
                                            {(profile.firstName?.[0] || "U").toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-16 pb-8 px-6 text-center">
                            <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
                            <p className="text-gray-600 text-sm mt-1 font-medium">{profile.email}</p>

                            <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${config.iconBg} ${config.iconColor}`}>
                                {role.toUpperCase()}
                            </div>

                            <div className="mt-6 space-y-3 text-sm text-gray-700 border-t pt-6">
                                <MiniRow icon={Hash} label="ID" value={profile.id ? String(profile.id) : "—"} />
                                <MiniRow icon={IdCard} label="رقم المستخدم" value={profile.userId || "—"} />
                                <MiniRow icon={Calendar} label="تاريخ الانتهاء" value={formatDate(accountExpire)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* المعلومات الأساسية */}
                    <Section title="المعلومات الأساسية" icon={User} config={config}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                            <InfoBox label="الاسم الأول" value={profile.firstName} icon={User} config={config} />
                            <InfoBox label="الاسم الأخير" value={profile.lastName} icon={User} config={config} />
                            <InfoBox label="رقم الهاتف" value={profile.phone} icon={Phone} config={config} />
                            <InfoBox label="البريد الإلكتروني" value={profile.email} icon={Mail} config={config} />
                            <InfoBox label="العنوان" value={profile.address} icon={MapPin} config={config} wide />
                        </div>
                    </Section>

                    {/* معلومات أكاديمية للطلاب */}
                    {role === "student" && (
                        <Section title="المعلومات الأكاديمية" icon={GraduationCap} config={config}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                                <InfoBox label="الكلية" value={profile.collegeName} icon={Building} config={config} />
                                <InfoBox label="المستوى الدراسي" value={profile.level ? `المستوى ${profile.level}` : "—"} icon={GraduationCap} config={config} />
                            </div>
                        </Section>
                    )}

                    {/* معلومات وظيفية للمعلمين */}
                    {role === "teacher" && (
                        <Section title="المعلومات الوظيفية" icon={IdCard} config={config}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                                <InfoBox label="التخصص" value={profile.specialization} icon={IdCard} config={config} />
                                <InfoBox label="القسم/الكلية" value={profile.department || profile.collegeName} icon={Building} config={config} />
                            </div>
                        </Section>
                    )}

                    {/* معلومات الإدارة (Admin & SuperAdmin) */}
                    {(role === "admin" || role === "superadmin") && (
                        <Section
                            title={role === "superadmin" ? "صلاحيات الإدارة العليا" : "بيانات الإدارة"}
                            icon={Shield}
                            config={config}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                                <InfoBox
                                    label="نوع الصلاحية"
                                    value={role === "superadmin" ? "مدير نظام (صلاحيات كاملة)" : "مسؤول نظام"}
                                    icon={ShieldCheck}
                                    config={config}
                                />
                                <InfoBox label="الحالة" value="نشط (متصل)" icon={Shield} config={config} />

                                {/* خصائص تظهر للسوبر أدمن فقط */}
                                {role === "superadmin" && (
                                    <>
                                        <div className="md:col-span-2 p-4 bg-amber-50 rounded-2xl border border-amber-200 mt-2">
                                            <p className="text-amber-800 text-xs font-bold mb-2 flex items-center gap-2">
                                                <ShieldCheck size={14} /> نظام الصلاحيات الفائقة
                                            </p>
                                            <ul className="text-[11px] text-amber-700 space-y-1 list-disc list-inside font-medium">
                                                <li>التحكم الكامل في حسابات المديرين والمعلمين</li>
                                                <li>الوصول المباشر لقواعد البيانات المالية وتوزيع الأرباح</li>
                                                <li>تعديل إعدادات المنصة الأساسية</li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
}

// ✅ مكونات فرعية مساعدة داخل نفس الملف

function Section({ title, icon: Icon, config, children }) {
    return (
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 justify-start">
                <Icon className={`h-5 w-5 ${config.iconColor}`} />
                {title}
            </h3>
            {children}
        </section>
    );
}

const InfoBox = ({ label, value, icon: Icon, config, wide }) => (
    <div className={`group ${wide ? "md:col-span-2" : ""}`}>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5 mr-1">{label}</label>
        <div className={`flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100 transition-all ${config.borderColor} group-hover:bg-white group-hover:shadow-sm flex-row-reverse`}>
            <div className={`p-2 rounded-xl ${config.iconBg}`}>
                <Icon className={`h-4 w-4 ${config.iconColor}`} />
            </div>
            <span className="text-gray-900 font-semibold truncate flex-1 text-right">{value || "—"}</span>
        </div>
    </div>
);

function MiniRow({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between gap-3 flex-row-reverse">
            <div className="flex items-center gap-2 flex-row-reverse">
                <Icon className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500 font-medium">{label}</span>
            </div>
            <span className="text-gray-900 font-semibold truncate max-w-[150px]">{value}</span>
        </div>
    );
}