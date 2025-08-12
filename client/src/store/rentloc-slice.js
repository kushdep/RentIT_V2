import { createSlice } from "@reduxjs/toolkit";

const rentLocSlice = createSlice({
    name:'rentLoc',
    initialState:{
        rentLocData:[]
    },
    reducers:{

    }
})


export const rentLocActions = rentLocSlice.actions
export default rentLocSlice
