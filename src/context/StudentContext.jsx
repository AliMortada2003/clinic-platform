// src/context/StudentContext.jsx
import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const value = {
        enrolledCourses,
        setEnrolledCourses,
    };

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    );
}

export function useStudentContext() {
    return useContext(StudentContext);
}
