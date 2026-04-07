import { useMutation } from '@tanstack/react-query';
import { chatService } from './../services/chatService';

export const useChatBot = () => {
    return useMutation({
        mutationFn: ({ message, history }) => chatService.sendMessage(message, history),
        onSuccess: (data) => {
            // يمكنك هنا عمل أي Logic إضافي عند نجاح الرد
        },
        onError: (error) => {
            console.error("ChatBot Error:", error);
        }
    });
};