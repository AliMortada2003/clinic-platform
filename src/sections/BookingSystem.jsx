import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';


// Components
import CalendarView from '../components/boockSystem/CalendarView';
import SlotsList from '../components/boockSystem/SlotsList';
import BookingModal from '../components/boockSystem/BookingModal';
import { useAvailableDays } from '../hocks/useAvailableDays';
import { useAppointment } from '../hocks/useAppointment';
import { useSlots } from '../hocks/useSlots';

const BookingSystem = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // States الأساسية
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDayId, setSelectedDayId] = useState(null);
    const [selectedDayName, setSelectedDayName] = useState("");
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. استخدام هوك الأيام (بتاعك)
    const { getDaysQuery } = useAvailableDays();
    const { data: serverDays, isLoading: daysLoading } = getDaysQuery();

    // 2. استخدام هوك الساعات (بتاعك) - بياخد الـ ID المختار حالياً
    const { slots, isLoading: slotsLoading } = useSlots(selectedDayId);
    const { createGuestBooking } = useAppointment(selectedDayId);

    // 3. استخدام هوك الحجز
    const handleDayClick = (day, isAvailable) => {
        if (!isAvailable) return;

        // 1. تنسيق التاريخ الحالي المختار (yyyy-mm-dd)
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateStr = `${year}-${month}-${dayStr}`;

        // console.log("Searching for date:", dateStr); // للديبرج
        const dayData = serverDays?.find(d => {
            const serverDate = d.availableDay || d.date; // جرب الاسمين احتياطي
            return serverDate?.toString().includes(dateStr);
        });

        if (dayData) {
            // تأكد من اسم الخاصية: هل هي id ولا availableDayId ؟
            const idToSet = dayData.availableDayId || dayData.id;

            setSelectedDayId(idToSet);
            setSelectedDayName(dateStr);
            setSelectedSlotId(null);
        } else {
            console.error("Day data not found in server response for:", dateStr);
        }
    };

    return (
        <section className="py-12 bg-slate-50 dark:bg-slate-900 min-h-screen" dir="rtl">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* عمود التقويم - CalendarView */}
                    <div className="lg:col-span-7">
                        <CalendarView
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            daysLoading={daysLoading}
                            serverDays={serverDays}
                            handleDayClick={handleDayClick}
                            selectedDayName={selectedDayName}
                            today={today}
                        />
                    </div>  

                    {/* عمود المواعيد - SlotsList */}
                    <div className="lg:col-span-5">
                        <SlotsList
                            selectedDayId={selectedDayId}
                            selectedDayName={selectedDayName}
                            slots={slots}
                            slotsLoading={slotsLoading}
                            selectedSlotId={selectedSlotId}
                            setSelectedSlotId={setSelectedSlotId}
                            onConfirmClick={() => setIsModalOpen(true)}
                        />
                    </div>

                </div>
            </div>

            {/* مودال الحجز */}
            <AnimatePresence>
                {isModalOpen && (
                    <BookingModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        selectedDay={selectedDayName}
                        // بنجيب وقت الساعة المختارة من قائمة الـ slots
                        selectedTime={slots?.find(s => s.id === selectedSlotId)?.startTime}
                        onConfirm={(formData) => {
                            createGuestBooking.mutate({
                                slotId: selectedSlotId,
                                patientData: formData
                            }, {
                                onSuccess: () => setIsModalOpen(false)
                            });
                        }}
                        isLoading={createGuestBooking.isPending}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default BookingSystem;