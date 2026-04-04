// src/components/ui/modals/VodafoneCashModal.jsx
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { X, CheckCircle, Copy, Clock, User } from "lucide-react";
import TextField from '../form-fields/TextField';
import UploadField from '../form-fields/UploadField';

export default function VodafoneCashModal({ isOpen, onClose, course }) {
    const [previewImage, setPreviewImage] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const VODAFONE_NUMBER = "01012345678"; // رقم التحويل

    const copyNumber = () => {
        navigator.clipboard.writeText(VODAFONE_NUMBER);
    };

    const initialValues = {
        name: "",
        vodafoneNumber: "",
        receipt: null,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("الاسم مطلوب"),
        vodafoneNumber: Yup.string()
            .matches(/^\d{11}$/, "رقم فودافون كاش يجب أن يكون 11 رقم")
            .required("رقم فودافون كاش مطلوب"),
        receipt: Yup.mixed()
            .required("يجب رفع إيصال الدفع")
            .test(
                "fileType",
                "يجب أن يكون الملف jpg أو png",
                (value) =>
                    value &&
                    ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
            ),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("بيانات الدفع:", values);

        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            resetForm();
            setPreviewImage(null);
        }, 1000);
    };

    const closeModal = () => {
        setSubmitted(false);
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                {/* Modal */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">

                                {/* Close button */}
                                <button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                    onClick={closeModal}
                                >
                                    <X size={20} />
                                </button>

                                {!submitted ? (
                                    <>
                                        {/* Course Preview Section */}
                                        <div className="mb-4 p-4 rounded-xl bg-gray-50 border">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                                        <User size={14} /> {course.instructor}
                                                    </p>
                                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Clock size={14} /> {course.duration}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="mt-3 font-bold text-[#0A8DBA] text-lg">
                                                السعر: {course.price} جنيه
                                            </p>
                                        </div>

                                        {/* Vodafone Number Box */}
                                        <div className="mb-6 p-4 rounded-xl bg-[#0A8DBA]/10 border border-[#0A8DBA]">
                                            <p className="text-sm text-gray-700 mb-1">
                                                برجاء تحويل المبلغ على هذا الرقم:
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-lg tracking-wider text-[#0A8DBA]">
                                                    {VODAFONE_NUMBER}
                                                </span>
                                                <button
                                                    onClick={copyNumber}
                                                    className="p-2 bg-white border rounded-lg hover:bg-gray-50"
                                                >
                                                    <Copy size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({ setFieldValue, isSubmitting }) => (
                                                <Form className="flex flex-col gap-4">
                                                    <TextField
                                                        name="name"
                                                        label="الاسم الكامل"
                                                    />
                                                    <TextField
                                                        name="vodafoneNumber"
                                                        label="رقم فودافون كاش"
                                                        placeholder="مثال: 01234567890"
                                                    />
                                                    <UploadField
                                                        name="receipt"
                                                        label="رفع إيصال الدفع"
                                                        previewImage={previewImage}
                                                        setPreviewImage={setPreviewImage}
                                                        setFieldValue={setFieldValue}
                                                    />

                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="mt-2 w-full bg-[#0A8DBA] text-white py-3 rounded-xl hover:bg-[#0FB5A9] transition-all"
                                                    >
                                                        {isSubmitting ? "جاري الإرسال..." : "إرسال الدفع"}
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <CheckCircle className="text-green-500" size={48} />
                                        <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
                                            تم استلام الدفع بنجاح
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-2 text-center">
                                            سيتم مراجعة الدفع من قبل الإدارة، وسنوافيك بتأكيد الاشتراك قريباً.
                                        </p>
                                        <button
                                            className="mt-6 w-full bg-[#0A8DBA] text-white py-3 rounded-xl hover:bg-[#0FB5A9] transition-all"
                                            onClick={closeModal}
                                        >
                                            إغلاق
                                        </button>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
