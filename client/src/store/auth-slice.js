import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false
    },
    reducers: {
        loginSuccess(state, action) {
            const { token } = action.payload
            state.token = token
            state.isAuthenticated = true
        },
        logout(state, action) {
            state.token = null
            state.isAuthenticated = false
        }, 
    }
})

export const authActions = authSlice.actions
export default authSlice