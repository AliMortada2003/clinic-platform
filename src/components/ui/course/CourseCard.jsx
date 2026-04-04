// src/components/ui/course/CourseCard.jsx
import { useNavigate } from "react-router-dom";
import { Star, LogIn, User, GraduationCap } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { ImageWithFallback } from './../../figma/ImageWithFallback';

export function CourseCard({ course, myStatus = null, isStudent = false }) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const courseId = course?.id;

    // ✅ Data
    const title = course?.title || "بدون عنوان";
    const description = course?.description || "";
    const image = course?.imageUrl || "";
    const teacherName = course?.teacherName || "غير محدد";
    const status = course?.status;

    // ✅ Prices
    const finalPrice = course?.finalPrice ?? 0;
    const originalPrice = course?.originalPrice ?? finalPrice;
    const discount = course?.discount ?? 0;
    const hasDiscount = discount > 0 && originalPrice > finalPrice;

    // ✅ Colleges
    const colleges = Array.isArray(course?.collegeNames) ? course?.collegeNames : [];

    const go = (path) => (e) => {
        e.stopPropagation();
        if (courseId) navigate(path);
    };

    const goDetails = go(`/courses/${courseId}`);
    const goBuy = go(`/courses/paycourse/${courseId}`);
    const goLogin = (e) => {
        e.stopPropagation();
        navigate("/login", { state: { from: `/courses/${courseId}` } });
    };

    const handleCardClick = () => {
        if (!courseId) return;
        navigate(`/courses/${courseId}`);
    };

    const renderPrimary = () => {
        if (myStatus === "Paid") return null;

        if (myStatus === "Pending") {
            return (
                <button
                    disabled
                    className="flex-1 py-3 px-3 rounded-2xl bg-amber-50 text-amber-800 font-black border border-amber-200"
                >
                    قيد المراجعة
                </button>
            );
        }

        if (!isAuthenticated) {
            return (
                <button
                    onClick={goLogin}
                    className="flex-1 py-3 px-3 text-xs justify-center px-2 rounded-2xl bg-slate-900 text-white font-black flex items-center gap-2"
                >
                    <LogIn size={18} /> سجل دخول للشراء
                </button>
            );
        }

        if (!isStudent) {
            return (
                <button
                    onClick={goDetails}
                    className="flex-1 py-3 px-3 rounded-2xl border-2 border-slate-200 text-slate-800 font-black hover:bg-slate-50"
                >
                    عرض التفاصيل
                </button>
            );
        }

        return (
            <button
                onClick={goBuy}
                className="flex-1 py-3 px-3 rounded-2xl bg-[#0A8DBA] text-white font-black hover:bg-[#087a99] transition-colors"
            >
                شراء الآن
            </button>
        );
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-slate-100 flex flex-col h-full relative"
        >
            {/* ✅ الصورة */}
            <div className="relative h-64 sm:h-72 lg:h-80 border-4 border-b-[#0A8DBA] overflow-hidden shrink-0 bg-slate-100">
                <img
                    src={image}
                    alt={title}
                    title={title}
                    width={100}
                    height={300}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* ✅ Status Badge */}
                <div className="absolute top-3 left-3 ">
                    {status === "Active" ? (
                        <span className="bg-[#0A8DBA]/90 backdrop-blur text-white px-3 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-lg">
                            نـــشــط
                        </span>
                    ) : (
                        <span className="bg-slate-600/90 backdrop-blur text-white px-3 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-lg">
                            غــيــر مـفـعـل
                        </span>
                    )}
                </div>

                {/* ✅ السعر + الخصم (ثابتين أعلى الصورة) */}
                <div className="absolute top-12 left-3  flex items-center gap-2">
                    {myStatus === "Paid" ? (
                        <span className="bg-emerald-600 text-white px-3 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-lg">
                            مفعّلة لك
                        </span>
                    ) : myStatus === "Pending" ? (
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-lg">
                            قيد المراجعة
                        </span>
                    ) : (
                        <span className="bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-lg border border-white/40">
                            {finalPrice} ج.م
                        </span>
                    )}

                    {hasDiscount && (
                        <span className="bg-rose-600 text-white px-3 py-1 rounded-full font-black text-[11px] sm:text-xs shadow-lg">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* ✅ التقييم (ينزل تحت عشان ما يزاحم البادجات) */}
                <div className="absolute top-12 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-bold">4.5</span>
                </div>
            </div>

            <div
                className="

        "
            >
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                    {/* ✅ Title */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 line-clamp-1 group-hover:text-[#0A8DBA] transition-colors">
                            {title}
                        </h3>

                        {/* ✅ Teacher + Colleges in ONE ROW */}
                        <div className="mt-2 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                                    <User size={14} className="text-slate-500" />
                                </div>
                                <p className="text-sm font-black text-slate-700 line-clamp-1 min-w-0">
                                    {teacherName}
                                </p>
                            </div>

                            {colleges.length > 0 && (
                                <div className="flex items-center gap-2 min-w-0">
                                    <GraduationCap size={14} className="text-slate-400 shrink-0" />
                                    <p className="text-[11px] text-slate-500 font-bold line-clamp-1 min-w-0">
                                        {colleges.join(" • ")}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* ✅ Description ONE LINE */}
                        {description && (
                            <p className="text-slate-500/90 text-sm mt-2 line-clamp-1">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* ✅ Discount row (اختياري) */}
                    {hasDiscount && (
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-slate-500 line-through">
                                {originalPrice} ج.م
                            </span>
                            <span className="text-lg font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
                                {finalPrice} ج.م
                            </span>
                        </div>
                    )}

                    {/* ✅ Buttons (smaller) */}
                    <div className="mt-1">
                        <div className="flex gap-2">
                            <button
                                onClick={goDetails}
                                className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-slate-800 font-black hover:bg-slate-50 transition-colors text-sm"
                            >
                                التفاصيل
                            </button>

                            {/* renderPrimary uses flex-1 and py-3 .. هنخليه أنعم */}
                            <div className="flex-1">
                                {renderPrimary()}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
