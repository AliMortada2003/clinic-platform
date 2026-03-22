import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    // تحميل الثيم من localStorage
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const newTheme = !prev;
            if (newTheme) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
