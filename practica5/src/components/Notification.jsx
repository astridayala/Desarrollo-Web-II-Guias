import { useEffect } from "react";
import { useNotificationStore } from "../store/notificationSlice";

export default function Notification() {
    const {notification, hideNotification} = useNotificationStore();

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                hideNotification();
            },1500)
            return() => clearTimeout(timer);
        }
    }, [notification, hideNotification]);

    if (!notification) return null;

    return(
        <div className="w-full top-16 transform -translate-x-1/2 ml-78 mt-5 px-6 py-3 mx-auto rounded-lg text-white font-bold shadow-lg justify-center text-center">
            {notification.message}
        </div>
    );
}