import { PlayCircle, FileText, ClipboardCheck, CheckCircle, Lock } from 'lucide-react';

export function CourseSidebar({ courseData, currentItemId, onItemClick }) {
    const getIcon = (type) => {
        switch (type) {
            case 'video':
                return <PlayCircle size={18} />;
            case 'document':
                return <FileText size={18} />;
            case 'quiz':
                return <ClipboardCheck size={18} />;
            default:
                return <PlayCircle size={18} />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Course Header */}
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-[#0A8DBA] mb-2 text-sm font-semibold">
                    {courseData.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>
                        {courseData.completedItems} / {courseData.totalItems} مكتمل
                    </span>
                    <span>{courseData.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
                    <div
                        className="bg-linear-to-r from-[#0A8DBA] to-[#0FB5A9] h-2 rounded-full transition-all"
                        style={{ width: `${courseData.progress}%` }}
                    />
                </div>
            </div>

            {/* Course Content */}
            <div className="flex-1 overflow-y-auto">
                {courseData.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border-b border-gray-200">
                        {/* Section Header */}
                        <div className="bg-gray-50 px-6 py-3">
                            <h4 className="text-gray-800 text-sm font-semibold">
                                {section.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                                {
                                    section.items.filter((item) => item.completed)
                                        .length
                                }{' '}
                                / {section.items.length} دروس
                            </p>
                        </div>

                        {/* Section Items */}
                        <div>
                            {section.items.map((item) => {
                                const isActive = currentItemId === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() =>
                                            !item.locked && onItemClick(item)
                                        }
                                        disabled={item.locked}
                                        className={`
                                            w-full text-right px-6 py-3 flex items-center gap-3 transition-all border-b border-gray-100
                                            hover:bg-[#E8F9FB] disabled:opacity-60 disabled:cursor-not-allowed
                                            ${isActive ? 'bg-[#E8F9FB] border-r-4 border-r-[#0A8DBA]' : ''}
                                        `}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`shrink-0 ${item.locked
                                                    ? 'text-gray-400'
                                                    : 'text-[#0A8DBA]'
                                                }`}
                                        >
                                            {item.locked ? (
                                                <Lock size={18} />
                                            ) : (
                                                getIcon(item.type)
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <p
                                                className={`text-sm truncate ${isActive
                                                        ? 'text-[#0A8DBA] font-medium'
                                                        : 'text-gray-800'
                                                    }`}
                                            >
                                                {item.title}
                                            </p>
                                            {item.duration && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.duration}
                                                </p>
                                            )}
                                        </div>

                                        {/* Status */}
                                        {item.completed && (
                                            <div className="shrink-0 text-green-500">
                                                <CheckCircle size={18} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
