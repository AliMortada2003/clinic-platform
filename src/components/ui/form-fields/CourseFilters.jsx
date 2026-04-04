import React from "react";
import { Listbox } from "@headlessui/react";
import { Search, Building2, GraduationCap, ChevronDown } from "lucide-react";

export function CourseFilters({
    searchQuery,
    setSearchQuery,
    colleges,
    selectedCollegeId,
    setSelectedCollegeId,
    selectedLevel,
    setSelectedLevel,
    levelsCount = 4,
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="space-y-2">
                <label className="text-md font-black text-cyan-500 flex items-center gap-2 px-1">
                    <Search size={18} className="text-cyan-600" />
                    ابحث عن مادة
                </label>
                <input
                    type="text"
                    placeholder="اسم المادة بالعربي أو الإنجليزي..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
                />
            </div>

            {/* College Select */}
            <div className="space-y-2">
                <label className="text-md font-black text-cyan-500 flex items-center gap-2 px-1">
                    <Building2 size={18} className="text-cyan-600" />
                    الكلية
                </label>
                <Listbox value={selectedCollegeId} onChange={(val) => { setSelectedCollegeId(val); setSelectedLevel(""); }}>
                    <div className="relative">
                        <Listbox.Button className="w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-900 flex justify-between items-center cursor-pointer">
                            {colleges.find(c => c.id === selectedCollegeId)?.name || "اختر الكلية"}
                            <ChevronDown size={18} className="text-slate-400" />
                        </Listbox.Button>

                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-xl max-h-56 overflow-y-auto shadow-lg">
                            {colleges.map((c) => (
                                <Listbox.Option
                                    key={c.id}
                                    value={c.id}
                                    className={({ active, selected }) =>
                                        `cursor-pointer px-4 py-2 ${active ? "bg-cyan-500/10" : ""} ${selected ? "font-black text-cyan-600" : "text-slate-900"}`
                                    }
                                >
                                    {c.name}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>

            {/* Level Select */}
            <div className="space-y-2">
                <label className="text-md font-black text-cyan-500 flex items-center gap-2 px-1">
                    <GraduationCap size={18} className="text-cyan-600" />
                    الفرقة الدراسية
                </label>
                <Listbox value={selectedLevel} onChange={setSelectedLevel} disabled={!selectedCollegeId}>
                    <div className="relative">
                        <Listbox.Button
                            className={`w-full h-14 px-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-900 flex justify-between items-center cursor-pointer ${!selectedCollegeId ? "bg-slate-100 text-slate-400 cursor-not-allowed" : ""
                                }`}
                        >
                            {selectedLevel ? `الفرقة الدراسية ${selectedLevel}` : "جميع الفرق"}
                            <ChevronDown size={18} className="text-slate-400" />
                        </Listbox.Button>

                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-xl max-h-56 overflow-y-auto shadow-lg">
                            {Array.from({ length: levelsCount }, (_, i) => (
                                <Listbox.Option
                                    key={i + 1}
                                    value={i + 1}
                                    className={({ active, selected }) =>
                                        `cursor-pointer px-4 py-2 ${active ? "bg-cyan-500/10" : ""} ${selected ? "font-black text-cyan-600" : "text-slate-900"}`
                                    }
                                >
                                    الفرقة الدراسية {i + 1}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>
        </div>
    );
}
