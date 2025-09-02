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
            localStorage.setItem("token", token)
            state.token = token
            state.isAuthenticated = true
        },
        logout(state, action) {
            localStorage.removeItem('token')
            state.token = null
            state.isAuthenticated = false
        }, 
    }
})

export const authActions = authSlice.actions
export default authSlice