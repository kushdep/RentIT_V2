import { createSlice } from "@reduxjs/toolkit";

const rentItSlice = createSlice({
    name:'rentIt',
    initialState:{
        startDate:null,
        endDate:null,
        totalGuests:null,
        stayDuration:null,
        totalRent:null,
        rentPrice:null
    },
    reducers:{
        
    }
})

export const rentItActions = rentItSlice.actions
export default rentItActions