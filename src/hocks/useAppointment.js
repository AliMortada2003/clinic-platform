import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { bookGuestAppointment, updateAppointmentStatus } from '../services/Appointment';

export const useAppointment = () => {
    const queryClient = useQueryClient();

    // هوك الحجز الجديد (Guest)
const createGuestBooking = useMutation({
    mutationFn: ({ slotId, patientData }) => bookGuestAppointment(slotId, patientData),
    onSuccess: (data, variables) => {
        console.log(data);
        // تحديث السلوتس فوراً
        queryClient.invalidateQueries(['slots']); 
        
        // استخراج البيانات من الـ variables اللي اتبعتت ومن الـ data اللي رجعت من السيرفر
        const { patientData } = variables;
        const reservationDate = data.availableDay || "سيتم التأكيد";
        const reservationTime = data.startTime || "سيتم التأكيد";

        Swal.fire({
            icon: 'success',
            title: '<span className="text-2xl font-black text-cyan-600">تأكيد الحجز بنجاح</span>',
            html: `
                <div className="text-right mt-4 p-6 border-2 border-dashed border-cyan-100 rounded-3xl bg-slate-50 dark:bg-slate-900 font-sans" dir="rtl">
                    <div className="flex justify-between border-b pb-3 mb-4">
                        <span className="text-slate-500">رقم الحجز:</span>
                        <span className="font-bold text-cyan-600">#${data.id || '---'}</span>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-500">اسم المريض:</span>
                            <span className="font-bold text-slate-800 dark:text-white">${patientData.name || 'غير مسجل'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">رقم الهاتف:</span>
                            <span className="font-bold text-slate-800 dark:text-white">${patientData.phoneNumber || 'غير مسجل'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">تاريخ الحجز:</span>
                            <span className="font-bold text-slate-800 dark:text-white">${reservationDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">الوقت المحدد:</span>
                            <span className="font-bold text-emerald-600">${reservationTime}</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                        <p className="text-xs text-slate-400">يرجى تصوير الشاشة والاحتفاظ بهذا الإيصال لإظهاره في العيادة</p>
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'حفظ وإغلاق',
            confirmButtonColor: '#0891b2',
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff', // دعم الدارك مود
            customClass: {
                popup: 'rounded-[2.5rem]',
                confirmButton: 'rounded-xl px-8 py-3 font-bold'
            }
        });
    },
    onError: (err) => {
        const errorMsg = err.response?.data?.message || 'حدث خطأ أثناء إرسال البيانات';
        Swal.fire({
            title: 'فشل الحجز',
            text: errorMsg,
            icon: 'error',
            confirmButtonColor: '#ef4444'
        });
    }
});

    // ممكن تضيف هنا mutation تانية لتغيير الحالة (للأدمن)
    const changeStatus = useMutation({
        mutationFn: ({ aid, status }) => updateAppointmentStatus(aid, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['appointments']);
            Swal.fire('تم التحديث', 'تم تغيير حالة الحجز بنجاح', 'success');
        }
    });

    return {
        createGuestBooking,
        changeStatus
    };
};