import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatBot } from '../hocks/useChatBot';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "مرحباً بك في عيادة الدكتور محمد، أنا 'نبض' مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // الأسئلة الشائعة للرد السريع
    const quickQuestions = [
        {
            id: 1,
            text: "📍 مكان العيادة فين؟",
            reply: "تنورنا يا فندم، العيادة في قلب سوهاج - شارع 15، ومكاننا معروف جداً وسهل الوصول ليه."
        },
        {
            id: 2,
            text: "⏰ مواعيد الكشف ميتى؟",
            reply: "الدكتور محمد موجود يومياً من الساعة 4 عصراً لحد 10 مساءً، ما عدا يوم الجمعة إجازة."
        },
        {
            id: 3,
            text: "🎫 إزاي أحجز وآخد إيصال؟",
            reply: "تقدر تختار الموعد اللي يناسبك من جدول المواعيد هنا في الموقع، وبعد ما تسجل بياناتك هيطلعلك 'إيصال حجز رقمي'، احتفظ بيه (صورة) ووريه للسكرتارية لما تشرفنا."
        },
        {
            id: 4,
            text: "🩺 تخصصات الدكتور محمد",
            reply: "الدكتور محمد استشاري جراحة القلب والصدر والقسطرة التداخلية، وتقدر تعرف أكتر عنه من الصفحة التعريفية في الموقع."
        },
    ];

    const { mutate, isPending } = useChatBot();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // دالة التعامل مع الأسئلة السريعة
    const handleQuickQuestion = (q) => {
        setMessages(prev => [...prev, { text: q.text, isBot: false }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { text: q.reply, isBot: true }]);
        }, 600);
    };

    const handleSend = () => {
        if (!input.trim() || isPending) return;

        const userMsg = { text: input, isBot: false };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput("");

        // ✅ التصحيح: إرسال الرسالة مع الـ History لـ Gemini
        mutate({ message: currentInput, history: messages }, {
            onSuccess: (botReply) => {
                setMessages(prev => [...prev, { text: botReply, isBot: true }]);
            },
            onError: () => {
                setMessages(prev => [...prev, { text: "عذراً، نبض يواجه مشكلة في الاتصال حالياً. حاول مرة أخرى.", isBot: true, isError: true }]);
            }
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50" dir="rtl">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="mb-1 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-cyan-600 p-5 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/20 rounded-xl">
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <span className="font-black text-lg block leading-none">نبض</span>
                                    <span className="text-[10px] text-cyan-100 uppercase tracking-wider">المساعد الذكي للعيادة</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="h-50 md:h-70 overflow-y-auto p-5 space-y-4 bg-slate-50 dark:bg-slate-950 scrollbar-none">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex gap-2.5 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    {msg.isBot && (
                                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 shrink-0">
                                            <Bot size={16} />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm ${msg.isBot
                                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-tr-none'
                                        : 'bg-cyan-600 text-white rounded-tl-none'
                                        } ${msg.isError ? 'bg-rose-50 text-rose-800 border border-rose-200' : ''}`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isPending && (
                                <div className="flex gap-2 justify-start items-center text-slate-400 text-[10px]">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                    <span>نبض يحلل استفسارك...</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions Chips */}
                        <div className="px-4 py-2 grid grid-cols-2 gap-2 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
                            {quickQuestions.map((q) => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuickQuestion(q)}
                                    className="text-[10px] md:text-xs font-bold bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 px-3 py-1.5 rounded-full hover:bg-cyan-600 hover:text-white transition-all border border-transparent hover:border-cyan-500"
                                >
                                    {q.text}
                                </button>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white dark:bg-slate-900 flex gap-2 items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="اسأل نبض أي شيء..."
                                className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cyan-500 dark:text-white"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isPending || !input.trim()}
                                className="p-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:grayscale"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <div className="text-center pb-3 text-[9px] text-slate-400 dark:text-slate-600 flex items-center justify-center gap-1">
                            <CornerDownLeft size={8} /> مدعوم بتقنية Gemini 3 Flash
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-cyan-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-cyan-700 transition-all border-4 border-white dark:border-slate-900"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>
        </div>
    );
};

export default ChatBot;