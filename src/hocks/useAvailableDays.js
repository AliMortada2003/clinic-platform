import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../services/availableDaysService";

export const useAvailableDays = () => {
    const queryClient = useQueryClient();

    // 1. هوك جلب البيانات (Query)
    const getDaysQuery = () => useQuery({
        queryKey: ["availableDays"],
        queryFn: api.getAllAvailableDays,
    });

    // 2. هوك التفعيل (Mutation)
    const activateMutation = () => useMutation({
        mutationFn: api.avtiveAvailableDay,
        onSuccess: () => {
            // تحديث القائمة تلقائياً فور النجاح
            queryClient.invalidateQueries({ queryKey: ["availableDays"] });
        },
    });

    // 3. هوك الإلغاء (Mutation)
    const cancelMutation = () => useMutation({
        mutationFn: api.cancelAvailableDay,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availableDays"] });
        },
    });

    // 4. هوك الحذف (Mutation)
    const deleteMutation = () => useMutation({
        mutationFn: api.DeleteAvailableDay,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["availableDays"] });
        },
    });

    return {
        getDaysQuery,
        activateMutation,
        cancelMutation,
        deleteMutation
    };
};