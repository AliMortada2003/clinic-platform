import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attachmentService } from '../services/Attachment';
import Swal from 'sweetalert2';

export const useAttachment = (appointmentId = null) => {
    const queryClient = useQueryClient();

    // جلب المرفقات - يعمل فقط إذا تم تمرير appointmentId
    const { data: attachments, isLoading: isFetching } = useQuery({
        queryKey: ['attachments', appointmentId],
        queryFn: () => attachmentService.getAttachmentByAppointmentId(appointmentId),
        enabled: !!appointmentId, // لا يعمل إلا لو الـ ID موجود
    });

    const uploadMutation = useMutation({
        mutationFn: ({ appointmentId, data }) => attachmentService.upload(appointmentId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['attachments']); // تحديث القائمة فور الرفع
            queryClient.invalidateQueries(['appointments']);
            Swal.fire({
                icon: 'success',
                title: 'تم حفظ السجل',
                text: 'تم ربط المرفق بالموعد بنجاح',
                timer: 2000,
                showConfirmButton: false,
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                customClass: { popup: 'rounded-[2rem]' }
            });
        },
        onError: (err) => {
            console.error("Upload Error:", err.response);
            Swal.fire({
                icon: 'error',
                title: 'خطأ في الرفع',
                text: err.response?.data?.message || 'تعذر رفع الملف حالياً',
                background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                customClass: { popup: 'rounded-[2rem]' }
            });
        }
    });

    return {
        attachments,
        isFetching,
        uploadAttachment: uploadMutation.mutate,
        isUploading: uploadMutation.isPending
    };
};