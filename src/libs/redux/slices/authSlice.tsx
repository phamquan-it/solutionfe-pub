import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Helper functions for localStorage with type safety
const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
    }
    return null; // Fallback if localStorage is unavailable
};

const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
    }
};

const removeLocalStorageItem = (key: string): void => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Define the shape of the AuthState
interface AuthState {
    token: string | null; // Token can be a string or null
}

// Initial state
const initialState: AuthState = {
    token: getLocalStorageItem('token'), // Safely retrieve token from localStorage
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            setLocalStorageItem('token', action.payload); // Save token to localStorage
        },
        clearToken: (state) => {
            state.token = null;
            removeLocalStorageItem('token'); // Remove token from localStorage
        },
    },
});

// Export actions
export const { setToken, clearToken } = authSlice.actions;

// Export reducer
const authReducer = authSlice.reducer;
export default authReducer;

