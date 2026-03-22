import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        // أول ما المسار يتغير، اطلع لفوق
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}