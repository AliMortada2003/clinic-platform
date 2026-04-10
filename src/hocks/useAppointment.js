import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import appointmentService from './../services/Appointment'; // المصدر الموحد للـ API
import { showSuccessAlert } from '../helpers/boock.helper';

export const useAppointment = () => {
    const queryClient = useQueryClient();

    // 1. جلب كل المواعيد (للأدمن)
    const appointmentsQuery = useQuery({
        queryKey: ['appointments'],
        queryFn: appointmentService.getAll, // استخدام الـ service الجديدة
    });

    // 2. هوك الحجز لـ Guest
    const createGuestBooking = useMutation({
        mutationFn: ({ slotId, patientData }) => appointmentService.bookGuest(slotId, patientData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['slots']);
            showSuccessAlert(data);
            console.log(data)
        },
        onError: (err) => {
            console.log(err.response?.data)
            Swal.fire({
                title: 'عذراً، فشل الحجز',
                text: err.response?.data || 'تأكد من صلاحية الجلسة وحاول ثانياً',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                customClass: { popup: 'rounded-[2rem]' }
            })
        }
    });

    // 3 Real User Book
    const bookPatient = useMutation({
        mutationFn: ({ patientId, slotId }) => appointmentService.bookPatient(patientId, slotId),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['slots']);
            showSuccessAlert(data);
            console.log(data)
        },
        onError: (err) => {
            Swal.fire({
                title: 'عذراً، فشل الحجز',
                text: err.response?.data?.message || 'تأكد من صلاحية الجلسة وحاول ثانياً',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                customClass: { popup: 'rounded-[2rem]' }
            })
        }
    });

    // 3. تغيير الحالة (Accepted / Pending)
    const changeStatus = useMutation({
        mutationFn: ({ aid, status }) => appointmentService.updateStatus(aid, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['appointments']);
            Swal.fire({
                icon: 'success',
                title: 'تم التحديث',
                text: 'تم تغيير حالة الحجز بنجاح',
                timer: 2000,
                showConfirmButton: false,
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                customClass: { popup: 'rounded-[2rem]' }
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: "error",
                title: "فشل تحديث الحالة",
                text: `${err?.response.data || "ربما الموعد قديم"}`,
                confirmButtonColor: '#ef4444',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                customClass: { popup: 'rounded-[2rem]' }
            })
        }
    });

    // 4. الإلغاء مع طلب السبب (Workflow)
    const cancelWithReason = async (aid) => {
        const { value: reason } = await Swal.fire({
            title: 'إلغاء الموعد',
            input: 'textarea',
            inputLabel: 'يرجى كتابة سبب الإلغاء للمريض',
            inputPlaceholder: 'اكتب السبب هنا...',
            showCancelButton: true,
            confirmButtonText: 'تأكيد الإلغاء',
            cancelButtonText: 'تراجع',
            confirmButtonColor: '#ef4444',
            background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
            customClass: {
                popup: 'rounded-[2rem]',
                input: 'rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-rose-500'
            },
            inputValidator: (value) => {
                if (!value) return 'يجب كتابة سبب الإلغاء!';
            }
        });

        if (reason) {
            try {
                // استخدام الـ mutateAsync اللي تحت لضمان الترتيب
                await updateStatusAsync({ aid, status: 'Canceled' });
                await updateReasonAsync({ aid, reason });

                queryClient.invalidateQueries(['appointments']);
                Swal.fire('تم الإلغاء', 'تم إخطار المريض بالسبب', 'success');
            } catch (error) {
                Swal.fire('خطأ', 'فشل تنفيذ العملية', 'error');
            }
        }
    };

    // 5 - جلب الحجوزات (المستقبلية أو حسب الحالة)
    const getAppointmentsByStatus = (status) => useQuery({
        // مهم جداً: إضافة الـ status للـ queryKey لضمان تحديث البيانات عند تغيير التبويب
        queryKey: ['appointments', status],
        queryFn: () => {
            // الحالة الخاصة: حجوزات المستقبل
            if (status === "Present" || status === "Today") {
                return appointmentService.getAllInPresent();
            }

            // الحالات العامة: الكل أو حالة محددة (Pending, Accepted, etc.)
            if (!status || status === 'All') {
                return appointmentService.getAll();
            }

            return appointmentService.getByStatus(status);
        },
        // الهوك يشتغل فقط إذا كان الـ status متاح (لتجنب طلبات خاطئة)
        enabled: !!status,
    });

    // 6 جلب بيانات الحجوزات الخاصة بالمريض
    const getPatientAppointments = (patientId) => useQuery({
        queryKey: ['appointments', 'patient', patientId],
        queryFn: () => appointmentService.getPatientAppointments(patientId),
        enabled: !!patientId,
        staleTime: 1000 * 60 * 5, // اختياري: تجعل البيانات صالحة لمدة 5 دقائق
    });

    const allAppointmentsQuery = useQuery({
        queryKey: ['appointments', 'all'],
        queryFn: appointmentService.getAll, // تأكد من وجودها في الـ service
        enabled: false // سنجعلها تعمل فقط عند الحاجة
    });


    // الميوتيشنز الداخلية المساعدة (مربوطة بـ appointmentService)
    const { mutateAsync: updateStatusAsync } = useMutation({
        mutationFn: ({ aid, status }) => appointmentService.updateStatus(aid, status)
    });

    const { mutateAsync: updateReasonAsync } = useMutation({
        mutationFn: ({ aid, reason }) => appointmentService.updateReason(aid, reason)
    });

    return {
        appointments: appointmentsQuery.data,
        isLoading: appointmentsQuery.isLoading,
        createGuestBooking,
        changeStatus,
        bookPatient,
        getAppointmentsByStatus,
        getPatientAppointments, // تمت الإضافة هنا
        allAppointmentsQuery,
        cancelWithReason
    };
};