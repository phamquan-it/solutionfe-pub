import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

// Secret key for encryption
const SECRET_KEY = "your_secret_key";

// Helper functions for localStorage with encryption
const encryptData = (data: object): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData: string | null): object | null => {
    if (!encryptedData) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch {
        return null;
    }
};

const getLocalStorageItem = (key: string): object | null => {
    if (typeof window !== "undefined") {
        return decryptData(localStorage.getItem(key));
    }
    return null;
};

const setLocalStorageItem = (key: string, value: object): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, encryptData(value));
    }
};

const removeLocalStorageItem = (key: string): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

// Define user state interface
interface UserState {
    id: string | null; // Added id field
    name: string | null;
    email: string | null;
    fund: string | null;
    remains: string | null;
    role: string;
}

// Get initial state from localStorage
const initialState: UserState = (getLocalStorageItem("user_data") as UserState) || {
    id: null,
    name: null,
    email: null,
    fund: null,
    remains: null,
    role: "user",
};

// Create user slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            Object.assign(state, action.payload);
            setLocalStorageItem("user_data", state);
        },
        clearUser: (state) => {
            Object.assign(state, initialState);
            removeLocalStorageItem("user_data");
        },
    },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice;

