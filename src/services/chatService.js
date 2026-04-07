import { GoogleGenAI } from "@google/genai";

// إعداد المكتبة باستخدام مفتاح API من ملف البيئة
const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

const SYSTEM_PROMPT = `
أنت "نبض"، المساعد الذكي الرسمي لعيادة الدكتور محمد في سوهاج. 
مهمتك هي مساعدة المرضى في تصفح نظام إدارة العيادة وتسهيل عملية الحجز.

معلومات العيادة للرد على المرضى:
1. الموقع: سوهاج، شارع 15 (موقع حيوي ومعروف).
2. طبيعة النظام: هذا موقع تعريفي للدكتور محمد يتيح للمرضى رؤية المواعيد المتاحة والحجز أونلاين.
3. عملية الحجز: أخبر المريض أنه يمكنه اختيار الموعد المناسب له من جدول المواعيد، وبعد إتمام الحجز سيظهر له "إيصال حجز رقمي" (Invoice/Receipt) يجب عليه الاحتفاظ به (صورة أو سكرين شوت) لإظهاره عند الحضور للعيادة.

وظائفك الأساسية في الرد:
- إذا سأل عن الموقع: قل له "نحن في قلب سوهاج، شارع 15، ليسهل عليك الوصول".
- إذا سأل كيف أحجز: اشرح له "اختر الموعد المتاح من الصفحة، سجل بياناتك، وسيصدر لك النظام إيصالاً فورياً".
- إذا سأل عن الإيصال: أكد عليه "الإيصال هو ضمان دورك، يرجى الاحتفاظ به وتقديمه للسكرتارية عند وصولك".

أسلوبك:
- صعيدي مودب ومحترف (مثلاً: "نورت عيادة الدكتور محمد"، "تحت أمرك يا فندم").
- مختصر ومفيد لأن المريض يحتاج معلومة سريعة ليحجز.
- في حال وجود مشكلة تقنية، وجهه للتواصل مع الدعم الفني للموقع.
`;

export const chatService = {
    /**
     * إرسال رسالة مع سياق المحادثة (History)
     * @param {string} message - رسالة المستخدم الحالية
     * @param {Array} history - مصفوفة الرسائل السابقة
     */
    sendMessage: async (message, history = []) => {
        try {
            // 1. تحويل التاريخ لتنسيق يفهمه Gemini (Role & Parts)
            // نأخذ آخر 6 رسائل فقط لضمان سرعة الاستجابة وعدم استهلاك الكوتا
            const formattedHistory = history.slice(-6).map(msg => ({
                role: msg.isBot ? "model" : "user",
                parts: [{ text: msg.text }]
            }));

            // 2. إرسال الطلب للموديل الجديد
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                systemInstruction: SYSTEM_PROMPT,
                contents: [
                    ...formattedHistory,
                    { role: "user", parts: [{ text: message }] }
                ],
                generationConfig: {
                    maxOutputTokens: 300,
                    temperature: 0.7,
                }
            });

            // 3. إعادة النص المستخرج (Property في المكتبة الجديدة)
            return response.text;

        } catch (error) {
            console.error("Gemini Service Error:", error);

            // معالجة الأخطاء المعروفة لردها للـ UI بشكل لطيف
            if (error.message?.includes("429")) {
                throw new Error("تجاوزت عدد الطلبات المسموحة، حاول بعد قليل.");
            }
            if (error.message?.includes("503")) {
                throw new Error("المساعد الذكي مشغول حالياً، حاول مرة أخرى.");
            }

            throw error;
        }
    },
};