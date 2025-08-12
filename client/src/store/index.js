import {configureStore} from '@reduxjs/toolkit'
import addLocSlice  from './addLoc-slice.js'
import authSlice from './auth-slice.js'
import rentLocSlice from './rentloc-slice.js'

const store = configureStore({
    reducer:{
        addLocData:addLocSlice.reducer,
        authData:authSlice.reducer,
        rentLocs:rentLocSlice.reducer
    }
})

export default store

