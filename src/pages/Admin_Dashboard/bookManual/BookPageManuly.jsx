import React from 'react'
import BookingFlow from '../../../sections/BookingSystem';
import { BookLock, Plus, Search } from 'lucide-react';
import PageHeader from '../component/PageHeader';

function BookPageManuly() {
  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-700" dir="rtl">
      {/* Header القسم العلوي */}
      <PageHeader title="إضافة حجز يدوى للمرضى" description="إضافة حجز يدوى للمرضى" icon={Plus} />
        <BookingFlow />
    </div>
  )
}

export default BookPageManuly