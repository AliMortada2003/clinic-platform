import React, { useState } from 'react';
import { useAvailableDays } from '../hocks/useAvailableDays';
import { useSlots } from '../hocks/useSlots';
import { useAppointment } from '../hocks/useAppointment';
import BookingModal from './../components/boockSystem/BookingModal';
import SlotsList from './../components/boockSystem/SlotsList';
import CalendarView from './../components/boockSystem/CalendarView';
import { useAuth } from '../hocks/useAuth';
import PageSectionHeader from '../components/PageSectionHeader';
import { Lightbulb } from 'lucide-react';

const BookingFlow = () => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectedDayId, setSelectedDayId] = useState(null);
    const [selectedDayName, setSelectedDayName] = useState("");
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isAuthenticated } = useAuth()
    // console.log(user)
    const { availableDays, isLoading: daysLoading } = useAvailableDays();
    const { slots, isLoading: slotsLoading } = useSlots(selectedDayId);
    console.log(availableDays)
    // الهوك بتاعك بعد ما ضفت فيه bookPatient
    const { createGuestBooking, bookPatient } = useAppointment(selectedDayId);

    const handleDayClick = (day, isAvailable) => {
        if (!isAvailable) return;
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayData = availableDays.find(d => d.date?.startsWith(dateStr) || d.availableDay?.startsWith(dateStr));

        setSelectedDayId(dayData?.id);
        setSelectedDayName(dateStr);
        setSelectedSlotId(null);
    };

    const handleConfirmClick = () => {
        if (!selectedSlotId) return;

        if (isAuthenticated && user?.patientId) {
            // لو مسجل: نادِ دالة الحجز المباشر فوراً
            bookPatient.mutate({ patientId: user?.patientId, slotId: selectedSlotId });
        } else {
            // لو مش مسجل: افتح المودال لجمع البيانات
            setIsModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-10" dir="rtl">
            <PageSectionHeader
                icon={Lightbulb}
                badgeText="إرشادات هامة"
                title="احجز موعد"
                highlightTitle="الان"
                description="إرشادات بسيطة لضمان أفضل تجربة خدمة وتوفير وقتك"
                // center={false} // لكي يتناسب مع سياق المحتوى الجانبي أو الداخلي
            />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* التقويم */}
                <div className="lg:col-span-6">
                    <CalendarView
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                        daysLoading={daysLoading}
                        serverDays={availableDays}
                        handleDayClick={handleDayClick}
                        selectedDayName={selectedDayName}
                        today={today}
                    />
                </div>

                {/* الساعات */}
                <div className="lg:col-span-6">
                    <SlotsList
                        selectedDayId={selectedDayId}
                        selectedDayName={selectedDayName}
                        slots={slots}
                        slotsLoading={slotsLoading}
                        selectedSlotId={selectedSlotId}
                        setSelectedSlotId={setSelectedSlotId}
                        onConfirmClick={handleConfirmClick}
                        isRegistered={isAuthenticated}
                    />
                </div>
            </div>

            {/* المودال يظهر فقط للـ Guest */}
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDay={selectedDayName}
                selectedTime={slots?.find(s => s.id === selectedSlotId)?.startTime}
                isLoading={createGuestBooking.isPending}
                onConfirm={(formData) => {
                    createGuestBooking.mutate({
                        slotId: selectedSlotId,
                        patientData: formData
                    }, {
                        onSuccess: () => {
                            setIsModalOpen(false);
                            setSelectedSlotId(null);
                            toast.success("تم الحجز بنجاح");
                        }
                    });
                }}
            />
        </div>
    );
};

export default BookingFlow;