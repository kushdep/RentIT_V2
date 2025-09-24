import { createSlice } from "@reduxjs/toolkit";

export const rentItSlice = createSlice({
    name: 'rentIt',
    initialState: {
        startDate: '',
        endDate: '',
        totalGuests: null,
        stayDuration: null,
        totalRent: null,
        errs: {},
        payment: false
    },
    reducers: {
        setGstVal(state, action) {
            try {
                const { val } = action.payload
                console.log(val)
                state.totalGuests = val
            } catch (error) {
                console.error("Error in chngGstVal() " + error)
            }
        },
        setBookingDates(state, action) {
            try {
                const { start, end, duration } = action.payload
                state.startDate = start
                state.endDate = end
                state.stayDuration = duration
            } catch (error) {
                console.error("Error in setBookingDates() " + error)
            }
        },
        setTotalRent(state, action) {
            try {
                const { totalAmt } = action.payload
                state.totalRent = totalAmt
            } catch (error) {
                console.error("Error in setTotalRent() " + error)
            }
        },

        updErrStt(state, action) {
            try {
                const { err } = action.payload
                state.errs = err
            } catch (error) {
                console.error("Error in setTotalRent() " + error)
            }
        },
        clearStateData(state, action) {
            try {
                const { isDone } = action.payload
                console.log(isDone)
                state.payment = isDone
                state.startDate = ''
                state.endDate = ''
                state.stayDuration = null
                state.totalGuests = null
                state.totalRent = null
            } catch (error) {
                console.error("Error in clearStateData() " + error)
            }

        }
    }
})

export const rentItActions = rentItSlice.actions
export default rentItSlice