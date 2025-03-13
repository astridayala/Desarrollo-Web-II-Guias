import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
    notification: null,
    showNotification: (message, type = 'sucess') => set({ notification: {message, type} }),
    hideNotification: () => set({notification:null}),
}))