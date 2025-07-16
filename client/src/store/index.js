import {configureStore} from '@reduxjs/toolkit'
import addLocSlice  from './addLoc-slice.js'

const store = configureStore({
    reducer:{
        addLocData:addLocSlice
    }
})

export default store

