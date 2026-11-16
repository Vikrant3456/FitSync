import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,

    // -------------------------------------------------
    // 1️⃣  Check if a JWT cookie exists (called on app start)
    // -------------------------------------------------
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log("User not authenticated (401) — clearing authUser");
            } else {
                console.error("Error in checkAuth:", error);
            }
            set({ authUser: null });
        }
    },

    // -------------------------------------------------
    // 2️⃣  Get the full user profile (fills name, email, weight, …)
    // -------------------------------------------------
    fetchProfile: async () => {
        try {
            const res = await axiosInstance.get("/auth/profile");
            // backend returns { user: { … } }
            set({ authUser: res.data.user });
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error(
                error.response?.data?.message ||
                "Could not load profile – you may be logged out"
            );
            set({ authUser: null });
        }
    },

    // -------------------------------------------------
    // 3️⃣  Sign‑up / login / logout (unchanged logic)
    // -------------------------------------------------
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },
}));