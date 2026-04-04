import Swal from "sweetalert2";

export const showSuccessAlert = (data) => {
    console.log(data)
    // تنسيق التاريخ والوقت
    const dateObj = new Date(data.date);
    const reservationDate = dateObj.toLocaleDateString('ar-EG', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const reservationTime = dateObj.toLocaleTimeString('ar-EG', {
        hour: '2-digit', minute: '2-digit', hour12: true
    });

    // تحديد الاسم ورقم الهاتف بناءً على نوع المستخدم (مريض أو زائر)
    const displayName = (data.patientName && data.patientName.trim() !== "")
        ? data.patientName
        : data.guestName;

    const displayPhone = data.patientPhone || data.guestPhone || "غير متوفر";

    Swal.fire({
        icon: 'success',
        title: '<span class="text-2xl font-black text-cyan-600">تم تأكيد الحجز بنجاح</span>',
        html: `
            <div class="text-right mt-4 p-6 border-2 border-dashed border-cyan-100 dark:border-cyan-900/30 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 font-sans relative overflow-hidden" dir="rtl">
                
                <div class="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>

                <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4 mb-4 relative z-10">
                    <div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم الحجز</p>
                        <p class="font-black text-cyan-600 text-lg">#${data.id}</p>
                    </div>
                    <div class="text-left">
                        <span class="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-lg uppercase">
                            ${data.status === 'Pending' ? 'قيد الانتظار' : data.status}
                        </span>
                    </div>
                </div>

                <div class="space-y-4 relative z-10">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-500 text-sm font-bold">اسم الحاجز:</span>
                        <span class="font-black text-slate-800 dark:text-white">${displayName}</span>
                    </div>

                    <div class="flex justify-between items-center">
                        <span class="text-slate-500 text-sm font-bold">رقم التواصل:</span>
                        <span class="font-bold text-slate-700 dark:text-slate-300 tracking-wider">${displayPhone}</span>
                    </div>

                    <div class="flex justify-between items-center">
                        <span class="text-slate-500 text-sm font-bold">التاريخ:</span>
                        <span class="font-bold text-slate-700 dark:text-slate-300">${reservationDate}</span>
                    </div>

                    <div class="mt-4 flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm">
                        <div class="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-600">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-slate-400 uppercase">وقت الموعد التقديري</p>
                            <p class="font-black text-cyan-600 dark:text-cyan-400 text-lg">${reservationTime}</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-slate-400 text-[11px] mt-4 font-medium italic">يرجى الحضور قبل الموعد بـ 15 دقيقة</p>
        `,
        confirmButtonText: 'حفظ ومتابعة',
        confirmButtonColor: '#0891b2',
        background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
        customClass: {
            popup: 'rounded-[3rem] border border-slate-200 dark:border-slate-800 px-2',
            confirmButton: 'rounded-2xl px-12 py-4 font-black shadow-xl shadow-cyan-600/20 active:scale-95 transition-all'
        }
    });
};