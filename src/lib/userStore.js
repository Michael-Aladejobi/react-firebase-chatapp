import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
    currentUser: null, // Changed from 'current' to 'currentUser' for consistency
    isLoading: true,
    fetchUserInfo: async (uid) => {
        if (!uid) {
            return set({ currentUser: null, isLoading: false });
        }

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false }); // Ensure the data is properly accessed
            } else {
                set({ currentUser: null, isLoading: false });
            }
        } catch (err) {
            console.log(err);
            set({ currentUser: null, isLoading: false });
        }
    },
}));
