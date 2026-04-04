// FacultyCard.jsx
export default function FacultyCard({ faculty, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{ "--accent": faculty.color }}
            className="
        group cursor-pointer
        bg-[#ffffffda]
        backdrop-blur-md
        rounded-[2.2rem]
        border border-slate-200
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        hover:shadow-[0_35px_100px_rgba(0,0,0,0.35)]
        hover:-translate-y-2
        transition-all duration-500
        overflow-hidden
        relative
        p-7
      "
        >
            {/* subtle accent glow */}
            <div
                className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
                style={{
                    background: `
            radial-gradient(circle at 30% 30%, ${faculty.color}30, transparent 60%)
          `,
                }}
            />

            {/* Icon */}
            <div
                className="
          relative z-10
          w-20 h-20 rounded-3xl
          flex items-center justify-center
          mx-auto mb-6
          transition-all duration-500
          group-hover:scale-110
        "
                style={{
                    color: faculty.color,
                    background: `${faculty.color}1f`,
                    boxShadow: `0 18px 45px ${faculty.color}55`,
                }}
            >
                {faculty.icon}
            </div>

            {/* Title */}
            <h3
                className="
          relative z-10 text-center mb-3
          font-extrabold text-xl tracking-wide
          text-[#0080ff]
        "
            >
                {faculty.title}
            </h3>

            {/* Desc */}
            <p className="relative z-10 text-black text-center mb-7 text-sm leading-relaxed font-medium">
                {faculty.description.slice(0, 140)}...
            </p>

            {/* Button */}
            <button
                type="button"
                className="
          relative z-10 w-full py-4 rounded-2xl font-bold
          text-[#123]
          bg-gradient-to-r from-[var(--accent)] to-[#00CFFF]
          shadow-[0_12px_35px_rgba(0,0,0,0.35)]
          hover:scale-[1.02]
          hover:shadow-[0_20px_55px_rgba(0,0,0,0.45)]
          transition-all duration-500
        "
            >
                عرض المحتوى
            </button>
        </div>
    );
}
