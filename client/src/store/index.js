import {configureStore} from '@reduxjs/toolkit'
import addLocSlice  from './addLoc-slice.js'
import authSlice from './auth-slice.js'

const store = configureStore({
    reducer:{
        addLocData:addLocSlice.reducer,
        authData:authSlice.reducer
    }
})

export default store

