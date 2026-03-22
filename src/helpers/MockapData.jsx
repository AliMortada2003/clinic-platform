import { BarChart3, GraduationCap, Scale, Briefcase, Code, Code2, Cpu, Globe, Layout, Lightbulb, Megaphone, PenTool, Rocket, Search, Settings, Share2, ShieldCheck, ShoppingBag, Smartphone, Star, Stethoscope, Target, Users, Utensils, Wrench, Zap } from "lucide-react";

// About Section
export const features = [
    {
        icon: <Target className="w-6 h-6 text-cyan-500" />,
        title: "رؤيتنا",
        desc: "أن نكون الشريك التقني الأول للشركات الطموحة في الشرق الأوسط.",
    },
    {
        icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
        title: "ابتكارنا",
        desc: "لا نكتفي بالحلول التقليدية، بل نبتكر أدوات تسبق عصرها.",
    },
    {
        icon: <Users className="w-6 h-6 text-emerald-500" />,
        title: "فريقنا",
        desc: "نخبة من المبدعين والمهندسين الشغوفين بتحويل التحديات إلى فرص.",
    },
];

// Advantages Section
export const advantagesData = [
    {
        id: "01",
        title: "معايير جودة عالمية",
        desc: "نلتزم بأعلى معايير أمن البيانات وأفضل ممارسات تجربة المستخدم (UX) لضمان منتج احترافي وآمن.",
        icon: <ShieldCheck size={32} className="text-cyan-500" />,
    },
    {
        id: "02",
        title: "دعم فني لمدة عام",
        desc: "لسنا مجرد منفذين؛ نوفر لك دعماً فنياً مجانياً لمدة عام كامل للتأكد من استقرار مشروعك وسلاسته.",
        icon: <Zap size={32} className="text-cyan-500" />,
    },
    {
        id: "03",
        title: "حلول تتجاوز الكود",
        desc: "نضيف لمشروعك الابتكار، ونساعدك على تطوير فكرتك لتصبح منتجاً ينافس بقوة في السوق الرقمي.",
        icon: <Code2 size={32} className="text-cyan-500" />,
    },
    {
        id: "04",
        title: "مواكبة الاتجاهات",
        desc: "نستخدم أحدث التقنيات البرمجية لضمان سرعة الأداء، التوافق مع محركات البحث، وقابلية التوسع.",
        icon: <Rocket size={32} className="text-cyan-500" />,
    },
    {
        id: "05",
        title: "تخصيص كامل للمشاريع",
        desc: "نصمم حلولاً برمجية مفصلة تماماً حسب احتياجات عملك الفريدة، بعيداً عن القوالب الجاهزة والمكررة.",
        icon: <Star size={32} className="text-cyan-500" />, // استخدمنا أيقونة Star أو Layout
    },
    {
        id: "06",
        title: "تخصيص كامل للمشاريع",
        desc: "نصمم حلولاً برمجية مفصلة تماماً حسب احتياجات عملك الفريدة، بعيداً عن القوالب الجاهزة والمكررة.",
        icon: <Star size={32} className="text-cyan-500" />, // استخدمنا أيقونة Star أو Layout
    },
    {
        id: "05",
        title: "تخصيص كامل للمشاريع",
        desc: "نصمم حلولاً برمجية مفصلة تماماً حسب احتياجات عملك الفريدة، بعيداً عن القوالب الجاهزة والمكررة.",
        icon: <Star size={32} className="text-cyan-500" />, // استخدمنا أيقونة Star أو Layout
    }
];



export const categories = [
    {
        id: "edu",
        title: "قطاع التعليم والتدريب",
        desc: "تطوير منصات تعليم إلكتروني متكاملة، أنظمة إدارة طلاب ودورات اختبارات أونلاين ، تطبيقات تعليمية، وأنظمة اشتراكات ودفع إلكتروني نساعد المؤسسات التعليمية على تقديم تجربة تعليم رقمية احترافية",
        icon: <GraduationCap size={32} />,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        gradient: "from-blue-500/20 to-blue-500/5",
        mainImage: "/images/Categories/educatin.jpeg",
        longFeatures: [
            "نظام إدارة دورات كامل للمحاضرين.",
            "دعم الاختبارات الإلكترونية والنتائج الفورية.",
            "لوحة تحكم خاصة بكل طالب لمتابعة التقدم.",
            "حماية المحتوى التعليمي من النسخ والتحميل."
        ]
    },
    {
        id: "food",
        title: "المطاعم والكافيهات",
        desc: "أنظمة إدارة مطاعم وكافيهات تشمل نقاط البيع، إدارة الطلبات والمخزون تطبيقات طلب أونلاين وصفحات عرض احترافية للمنيو لتنظيم عملك وزيادة أرباحك",
        icon: <Utensils size={32} />,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        gradient: "from-orange-500/20 to-orange-500/5",
        mainImage: "/images/Categories/resturant.jpeg",
        longFeatures: [
            "عرض المنيو بطريقة جذابة وسهلة التصفح.",
            "دعم الطلبات المباشرة وحجز الطاولات.",
            "تحسين ظهور المطعم في محركات البحث المحلية.",
            "ربط مباشر مع وسائل التواصل الاجتماعي."
        ]
    },
    {
        id: "legal",
        title: "خدمات عامة",
        icon: <Scale size={32} />,
        desc: "نقدم حلول برمجية متنوعه في عدة مجالات مثل المجال الطبي القانوني الخدمي العقاري الصناعي، والتجاري، مع تصميم أنظمة ومواقع مخصصة تناسب طبيعة كل نشاط وتساعد على تطويره رقميًا",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        gradient: "from-emerald-500/20 to-emerald-500/5",
        // 10 أمثلة متنوعة للخدمات العامة والقانونية
        mainImage: "/images/Categories/genral.jpeg",
        longFeatures: [
            "نظام حجز مواعيد للاستشارات القانونية.",
            "عرض الخدمات القانونية والمجالات التخصصية.",
            "بوابة آمنة لإرسال الملفات والوثائق.",
            "قسم مدونة لنشر الثقافة والقوانين الجديدة."
        ]
    },
    {
        id: "shop",
        title: "الخدمات التجارية",
        icon: <Briefcase size={32} />,
        desc: "تصميم وبرمجة منصات التجارة الإلكترونية، تطوير تطبيقات الموبايل وتصميم المواقع الاحترافية (ERP & CRM أنظمة إدارة الشركات لنساعدك على تحويل فكرتك إلى مشروع ناجح في العالم الرقمي",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        gradient: "from-purple-500/20 to-purple-500/5",
        // 10 أمثلة متنوعة للخدمات التجارية
        mainImage: "/images/Categories/shop.jpeg",
        longFeatures: [
            "تطوير أنظمة ERP مخصصة لإدارة موارد الشركات.",
            "تصميم وتطوير المتاجر الإلكترونية متعددة البائعين.",
            "ربط بوابات الدفع الإلكتروني المحلية والعالمية.",
            "أنظمة إدارة علاقات العملاء (CRM) لزيادة المبيعات."
        ]
    }
];

export const projects = [
    {
        id: 1,
        categoryId: "food",
        title: "مطعم ليالي الشرق",
        videoUrl: "https://www.youtube.com/embed/GqViN4fA2MA?si=jVihyMqzP2oTK_4w",
        description: "مطعم ليالي الشرق , هو مطعم متخصص في بيع المأكولات الشرقية والعصرية , تم تصميمه بناء علي طلب العميل وهو , صفحة تعريفية عن المطعم",
        image: "/images/projects/LialyElshark/1.jpg",
        link: "https://lialy-elshark.netlify.app/",
        tech: ["HTML , CSS , JS ", "ScrollReaval", "Landing Page"],
        features: [
            "واجهة مستخدم عصرية وسريعة (Landing Page)",
            "عرض المنيو بطريقة تفاعلية",
            "نظام التنقل السلس داخل الصفحة (Scroll Animation)",
            "متوافق تماماً مع جميع الشاشات (Responsive)",
            "نموذج تواصل مباشر مع إدارة المطعم"
        ],
        gallery: [
            "/images/projects/LialyElshark/1.jpg",
            "/images/projects/LialyElshark/2.jpg",
            "/images/projects/LialyElshark/3.jpg",
            "/images/projects/LialyElshark/4.jpg",
            "/images/projects/LialyElshark/5.jpg",
            "/images/projects/LialyElshark/6.jpg",
            "/images/projects/LialyElshark/7.jpg"
        ]
    },
    {
        id: 2,
        categoryId: "edu",
        title: "منصة التفوق",
        videoUrl: "https://www.youtube.com/embed/Q-ktuP39tJs?si=ra1nJF6__GQPYM4U",
        description: "منصة تعليمية رائدة تهدف لتسهيل عملية التعلم عن بعد وتوفير محتوى أكاديمي متميز للطلاب.",
        image: "/images/projects/Eltafawuq/admin/2.jpg",
        link: "https://eltafawuq.com/",
        tech: ["React.jsx", "integration with bunny stream", "ASP.net"],
        features: [
            "اربع لوحات تحكم (طالب ، مدرس ،أدمن , سوبر ادمن)",
            "نظام اختبارات إلكترونية و تصحيح تلقائي",
            "إدارة حضور وغياب الطلاب إلكترونياً",
            "نظام حجز الكورسات مع بوابة موافقة الإدارة",
            "نظام إشعارات ذكي للاختبارات والمواعيد الجديدة",
            "توزيع الأرباح تلقائياً بين المدرس والمنصة",
            "حماية المحتوى المرئي عبر Integration مع Bunny Stream",
            "إدارة كاملة للمدرسين والطلاب",
            "إمكانية تعطيل الكورس , بدلاً من حذفه نهائي",
            "وسيلة تواصل , لحل مشاكل العملاء",
            "ادارة كاملة للكليات إضافة حذف تعديل",
            "دعم فني وتواصل مباشر عبر المنصة",
        ],
        gallery: [
            "/images/projects/Eltafawuq/1.jpg",
            "/images/projects/Eltafawuq/2.jpg",
            "/images/projects/Eltafawuq/3.jpg",
            "/images/projects/Eltafawuq/4.jpg",
            "/images/projects/Eltafawuq/5.jpg",
            "/images/projects/Eltafawuq/6.jpg",
            "/images/projects/Eltafawuq/7.jpg",
            "/images/projects/Eltafawuq/admin/1.jpg",
            "/images/projects/Eltafawuq/admin/2.jpg",
            "/images/projects/Eltafawuq/admin/3.jpg",
            "/images/projects/Eltafawuq/admin/4.jpg",
            "/images/projects/Eltafawuq/admin/5.jpg",
            "/images/projects/Eltafawuq/admin/6.jpg",
            "/images/projects/Eltafawuq/admin/7.jpg",
            "/images/projects/Eltafawuq/admin/8.jpg",
            "/images/projects/Eltafawuq/admin/9.jpg",
            "/images/projects/Eltafawuq/admin/10.jpg",
            "/images/projects/Eltafawuq/admin/11.jpg",
            "/images/projects/Eltafawuq/admin/12.jpg",
            "/images/projects/Eltafawuq/admin/13.jpg",
            "/images/projects/Eltafawuq/admin/14.jpg",
            "/images/projects/Eltafawuq/admin/15.jpg",
            "/images/projects/Eltafawuq/student/1.jpg",
            "/images/projects/Eltafawuq/student/2.jpg",
            "/images/projects/Eltafawuq/student/3.jpg",
            "/images/projects/Eltafawuq/student/4.jpg",
            "/images/projects/Eltafawuq/student/5.jpg",
            "/images/projects/Eltafawuq/student/6.jpg",
            "/images/projects/Eltafawuq/student/7.jpg",
            "/images/projects/Eltafawuq/student/8.jpg",
        ]
    },
    {
        id: 3,
        categoryId: "edu",
        title: "منصة كود سبارك",
        videoUrl: "https://www.youtube.com/embed/58oLuuV-C5Y?si=XmSdmXZqOn6Opsog",
        description: "يمكنك الوصول إلى كل شيء من خلال لوحة تحكم مركزية واحدة، بدءًا من الجلسات المباشرة ومواد الدورة التدريبية وصولًا إلى تسليم المهام وتحليلات التقدم. صُممت هذه المنصة للأطفال والكبار على حد سواء لتتبع رحلتهم في تعلم البرمجة بوضوح وتحفيز.",
        image: "/images/projects/codeSpark/1.jpg",
        link: "https://codespark-eg.com/",
        tech: ["React.jsx", "integration with bunny stream", "PHP Laravel"],
        features: [
            "اربع لوحات تحكم (طالب ، مدرس ،أدمن , سوبر ادمن)",
            "نظام جلسات مكثفة وجدولة المحاضرات",
            "إدارة حضور وغياب الطلاب إلكترونياً",
            "شات داخلي بين المحاضر والطالب",
            "نظام تسجيل المواد",
            "متوفر بوابات دفع",
            "نظام إشعارات ذكي للاختبارات والمواعيد الجديدة",
            "نظام الخصم , عن طريق كود مخصص",
            "منافسة بين الطلاب (Leader Board)",
            "تسجيل الدخول من خلال جوجل",
            "نظام كامل في إضافة وحذف وتعديل الكورسات",
            "إدارة كاملة للطلاب , والمحاضرين",
            "تكامل مع Bunny Stream لحماية فيديوهات الدورة",
            "نظام منح شهادات إتمام الدورات",
            "دعم فني وتواصل مباشر عبر المنصة",
        ],
        gallery: [
            "/images/projects/codeSpark/1.jpg",
            "/images/projects/codeSpark/2.jpg",
            "/images/projects/codeSpark/3.jpg",
            "/images/projects/codeSpark/4.jpg",
            "/images/projects/codeSpark/5.jpg",
            "/images/projects/codeSpark/6.jpg",
            "/images/projects/codeSpark/8.jpg",
            "/images/projects/codeSpark/9.jpg",
            "/images/projects/codeSpark/10.jpg",
            "/images/projects/codeSpark/11.jpg",
            "/images/projects/codeSpark/12.jpg",
            "/images/projects/codeSpark/13.jpg",
            "/images/projects/codeSpark/14.jpg",
            "/images/projects/codeSpark/15.jpg",
            "/images/projects/codeSpark/16.jpg",
        ]
    },
    {
        id: 4,
        categoryId: "edu",
        title: "منصة المنارة التعليمية",
        videoUrl: "https://www.youtube.com/embed/i6t-mBUxWz4?si=sMFGURtsHqE2DK5K",
        description: "هي منصة إلكترونية عربية (مصرية) متكاملة تهدف إلى تقديم تجربة تعليمية متميزة للطلاب. تتميز المنصة بتصميم عصري واحترافي يجمع بين البساطة والكفاءة.",
        image: "/images/projects/almanara/1.png",
        link: "#",
        tech: ["MVC"],
        features: [
            "نظام جلسات مكثفة وجدولة المحاضرات",
            "إدارة حضور وغياب الطلاب إلكترونياً",
            "نظام تسجيل المواد",
            "نظام إشعارات ذكي للاختبارات والمواعيد الجديدة",
            "نظام كامل في إضافة وحذف وتعديل الكورسات",
            "إدارة كاملة للطلاب , والمحاضرين",
            "دعم فني وتواصل مباشر عبر المنصة",
        ],
        gallery: [
            "/images/projects/almanara/1.png",
            "/images/projects/almanara/2.png",
            "/images/projects/almanara/3.png",
            "/images/projects/almanara/4.png",
            "/images/projects/almanara/5.png",
            "/images/projects/almanara/6.png",
            "/images/projects/almanara/7.png",
            "/images/projects/almanara/8.png",
            "/images/projects/almanara/10.png",
            "/images/projects/almanara/11.png",
            "/images/projects/almanara/12.png",
            "/images/projects/almanara/13.png",
            "/images/projects/almanara/14.png",
            "/images/projects/almanara/15.png",
            "/images/projects/almanara/16.png",
            "/images/projects/almanara/17.png",
            "/images/projects/almanara/18.png",
        ]
    },
    {
        id: 5,
        categoryId: "legal",
        title: "عيادة محمد حسين",
        videoUrl: "https://www.youtube.com/embed/3YvLE3zyMlk?si=FxwijO88e-g8IA01",
        description: "خاص بـ الدكتور محمد حسن، وهو مصمم بأسلوب عصري واحترافي يجمع بين البساطة والثقة.",
        image: "/images/projects/mohamedHassan/3.jpg",
        link: "#",
        tech: ["html", "css", "js", "ASP.net"],
        features: [
            "نظام حجز المواعيد الطبية أونلاين",
            "عرض خدمات العيادة والتخصصات بدقة",
            "ملف تعريفي كامل للطبيب وسنوات الخبرة",
            "خريطة تفاعلية لموقع العيادة",
            "نظام إدارة سجلات المرضى الأساسية",
        ],
        gallery: [
            "/images/projects/mohamedHassan/1.jpg",
            "/images/projects/mohamedHassan/2.jpg",
            "/images/projects/mohamedHassan/3.jpg",
            "/images/projects/mohamedHassan/4.jpg",
            "/images/projects/mohamedHassan/5.jpg",
            "/images/projects/mohamedHassan/6.jpg",
            "/images/projects/mohamedHassan/7.jpg",
        ]
    },
    {
        id: 6,
        categoryId: "shop",
        title: "متجر على ستور",
        // videoUrl: "https://www.youtube.com/embed/3YvLE3zyMlk?si=FxwijO88e-g8IA01",
        description: "علي ستور.. حيث تبدأ أناقتك. نجمع لك أحدث صيحات الموضة العالمية من الملابس والأكسسوارات في مكان واحد، لنمنحك الإطلالة التي تستحقها بجودة لا تساوم وسعر ينافس.",
        image: "/images/projects/e-commerce/1.jpg",
        link: "https://ali-store-eg.netlify.app/",
        tech: ["html", "css", "js", "ASP.net"],
        features: [
            "تجربة تسوق عصرية وسهلة الاستخدام (User-Friendly UI)",
            "نظام فلترة ذكي للوصول للملابس والأكسسوارات بسرعة",
            "ميزة العرض السريع (Quick View) لتفاصيل المنتج دون مغادرة الصفحة",
            "دعم كامل للوضع الليلي (Dark Mode) لراحة العين أثناء التصفح",
            "سلة مشتريات ذكية تتبع اختياراتك لحظة بلحظة",
            "نظام إدارة حساب شخصي لمتابعة الطلبات وحالة الشحن",
            "توافق كامل مع جميع أجهزة الموبايل والتابلت (Responsive Design)",
            "سرعة فائقة في تحميل المنتجات بفضل تقنيات React الحديثة",
        ],
        gallery: [
            "/images/projects/e-commerce/1.jpg",
            "/images/projects/e-commerce/2.jpg",
            "/images/projects/e-commerce/3.jpg",
            "/images/projects/e-commerce/4.jpg",
            "/images/projects/e-commerce/5.jpg",
            "/images/projects/e-commerce/6.jpg",
            "/images/projects/e-commerce/7.jpg",
            "/images/projects/e-commerce/8.jpg",
            "/images/projects/e-commerce/9.jpg",
        ]
    },
];
// Stages Section 
export const stagesData = [
    { id: "01", title: "تحليل المتطلبات", desc: "نبدأ بفهم رؤيتك وتحديد الأهداف التقنية والمميزات المطلوبة لمشروعك بدقة.", icon: <Search size={28} /> },
    { id: "02", title: "تخطيط تجربة المستخدم", desc: "رسم الهيكل السلكي (Wireframes) لضمان رحلة مستخدم سلسة ومنطقية.", icon: <Layout size={28} /> },
    { id: "03", title: "التصميم الواجهي", desc: "تحويل التخطيط إلى تصميم بصري جذاب يعكس هوية علامتك التجارية.", icon: <PenTool size={28} /> },
    { id: "04", title: "مرحلة البرمجة", desc: "تحويل التصاميم إلى كود برمجى حي باستخدام أحدث التقنيات العالمية.", icon: <Code size={28} /> },
    { id: "05", title: "الاختبارات التقنية", desc: "نقوم بإجراء اختبارات شاملة لضمان كفاءة الأداء وسهولة الاستخدام.", icon: <ShieldCheck size={28} /> },
    { id: "06", title: "التعديلات النهائية", desc: "تنفيذ ملاحظات العميل بدقة لضمان تحقيق الرؤية النهائية بالشكل الأمثل.", icon: <Settings size={28} /> },
    { id: "07", title: "الإطلاق", desc: "رفع المشروع على السيرفرات الرسمية والتأكد من كفاءته أمام الجمهور.", icon: <Rocket size={28} /> },
]

// Services Section
export const services = [
    {
        id: 1,
        title: "تصميم مواقع",
        icon: <Globe className="w-6 h-6" />,
        color: "cyan",
        mainTitle: "نحن لا نطور مواقع... نحن نبني تجارب رقمية",
        description: "في Code Spark نحول فكرتك إلى تجربة رقمية نابضة بالحياة. نُصمّم مواقع تجمع بين الجمال البصري والذكاء التقني لضمان تفوقك المنافس.",
        features: [
            "سرعة تحميل فائقة لضمان بقاء الزوار وتحويلهم لعملاء.",
            "أعلى معايير الأمان والحماية ضد محاولات الاختراق.",
            "تصميم متجاوب بالكامل مع كافة الشاشات والموبايل."
        ]
    },
    {
        id: 2,
        title: "تطبيقات الموبايل",
        icon: <Smartphone className="w-6 h-6" />,
        color: "orange",
        mainTitle: "تطبيقات ذكية لمستقبل رقمي واعد",
        description: "نبتكر تطبيقات جوال (iOS & Android) تتميز بواجهات مستخدم سلسة وأداء قوي يلبي احتياجات عملائك في أي وقت وأي مكان.",
        features: [
            "أداء مستقر وسريع باستخدام تقنيات Native و Cross-platform.",
            "واجهات UI/UX عصرية تضمن سهولة الاستخدام.",
            "دعم فني مستمر وتحديثات دورية للتطبيق."
        ]
    },
    {
        id: 3,
        title: "حلول الذكاء الاصطناعي",
        icon: <Cpu className="w-6 h-6" />,
        color: "purple",
        mainTitle: "أتمتة ذكية لنمو أعمالك بشكل أسرع",
        description: "نساعدك على دمج تقنيات الذكاء الاصطناعي في نظام عملك لزيادة الكفاءة وتحليل البيانات بشكل أعمق لاتخاذ قرارات أذكى.",
        features: [
            "بناء نماذج تعلم آلي مخصصة لمجالك.",
            "تحليل ذكي للبيانات الضخمة واستخراج التقارير.",
            "أدوات أتمتة لتقليل الأخطاء البشرية وتوفير الوقت."
        ]
    },
    {
        id: 4,
        title: "الصيانة والدعم الفني الشامل",
        icon: <Wrench className="w-6 h-6" />,
        color: "red",
        mainTitle: "استقرار أعمالك هو أولويتنا القصوى",
        description: "لا ينتهي عملنا بمجرد التسليم. نحن شريكك التقني الذي يضمن استمرارية عمل منصاتك بكفاءة 100% وحمايتها من أي توقف مفاجئ.",
        features: [
            "مراقبة الأنظمة على مدار الساعة (24/7) لتفادي أي عطل.",
            "تحديثات دورية لسد الثغرات وتحسين أداء السيرفرات.",
            "نسخ احتياطي يومي للملفات وقواعد البيانات لضمان عدم الفقدان."
        ]
    },
    {
        id: 5,
        title: "تحسين محركات البحث (SEO)",
        icon: <Search className="w-6 h-6" />,
        color: "green",
        mainTitle: "تصدر النتائج الأولى واجذب عملاءك المستهدفين",
        description: "نجعل موقعك يظهر في النتائج الأولى على جوجل. نجمع بين استراتيجيات المحتوى والتحسين التقني لزيادة ظهورك الرقمي بشكل طبيعي.",
        features: [
            "تحليل دقيق للكلمات المفتاحية الأكثر بحثاً في مجالك.",
            "تحسين هيكلية الموقع التقنية (Technical SEO) لسرعة الأرشفة.",
            "بناء روابط خلفية (Backlinks) قوية لرفع سلطة موقعك."
        ]
    },
    {
        id: 6,
        title: " UI/UX تحسين واجهة المستخدم ",
        icon: <Layout className="w-6 h-6" />,
        color: "pink",
        mainTitle: "تصاميم تترك أثراً بصرياً وسهولة في الاستخدام",
        description: "قبل كتابة كود واحد، نرسم رحلة العميل بعناية. نركز على تحويل التفاعلات المعقدة إلى واجهات بسيطة وجذابة تزيد من ولاء المستخدم.",
        features: [
            "دراسة سلوك المستخدم (User Research) لبناء رحلة منطقية.",
            "تصميم نماذج أولية (Wireframes) واختبارها قبل البرمجة.",
            "واجهات بصرية فريدة تعكس الهوية التجارية لشركتك."
        ]
    }
];

//  testimonialsData "Our People , and Support "
export const testimonialsData = [
    {
        id: 1,
        name: "أ. محمد عراقي",
        role: "مسؤول تسويق شركة رابل الزراعية",
        image: "https://admin.webstdy.com/storage/Images/Rates/WebStdy_1757943557Rabel.webp",
        youtubeId: "ZDj2D-kAAUo",
    },
    {
        id: 2,
        name: "أ/ محمد الكثيري",
        role: "المدير التنفيذي لشركة الكثيري",
        image: "https://admin.webstdy.com/storage/Images/Rates/WebStdy_1757943898elketheiry.webp",
        youtubeId: "R8BUi3IupQ0",
    },
    {
        id: 3,
        name: "أ/ عبد العزيز النصيري",
        role: "المدير التنفيذي لمنصة بلاتين",
        image: "https://admin.webstdy.com/storage/Images/Rates/WebStdy_1757943726Platin.webp",
        youtubeId: "80nWRxKv-n4",
    },
    {
        id: 4,
        name: "أ/ أحمد مفرح",
        role: "مدير التسويق في شركة الخليج للسيارات",
        image: "https://admin.webstdy.com/storage/Images/Rates/WebStdy_1757854003ScreenShot2025-09-14at3.04.23PM.png",
        youtubeId: "ZDj2D-kAAUo",
    }
];
