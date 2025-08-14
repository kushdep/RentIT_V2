import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rentLocSlice = createSlice({
    name: 'rentLoc',
    initialState: {
        rentLocData: [],
        totalPages: null,
        currPage: 0,
        chckPts:null
    },
    reducers: {
        addRentLoc(state, action) {
            try {
                state.rentLocData = action.payload.locData
                console.log(action.payload.totalLocs)
                if(state.totalPages===null && state.chckPts===null){
                    state.totalPages = Math.ceil(action.payload.totalLocs / 5)
                    if(action.payload.totalLocs>4){
                        state.chckPts = Math.floor(action.payload.totalLocs/4)
                    }
                }
                console.log(state.rentLocData)
                console.log(state.totalPages)
                console.log(state.chckPts)
                console.log(state.currPage)
            } catch (error) {
                console.error("Error in addRentLoc() " + error)
            }
        },
        filterLoc(state, action) {
            try {
                const { locType, priceRng } = action.payload
                if (locType.length === 0) {

                }
            } catch (error) {
                console.error("Error in filterLoc() " + error)
            }
        },
        incCurrPage(state,action){
            try {
                state.currPage = state.currPage+1
            } catch (error) {
                console.log("Error inn changeCurrPage() "+error)
            }
        },
        decCurrPage(state,action){
            try {
                state.currPage = state.currPage-1
            } catch (error) {
                console.log("Error inn changeCurrPage() "+error)
            }
        },
        chngCurrPage(state,action){
            try {
                console.log(action.payload)
                state.currPage = action.payload
                console.log(state.currPage)
            } catch (error) {
                console.log("Error inn changeCurrPage() "+error)
            }
        },
        incChkPts(state,action){
            try {
                console.log("chk 1")
                state.chckPts=state.chckPts-1
            } catch (error) {  
                console.log("Error in chngChkPts() "+error)
            }
        },
        decChkPts(state,action){
            try {
                state.chckPts=state.chckPts-1
            } catch (error) {  
                console.log("Error in chngChkPts() "+error)
            }
        }
    }
})

export const getAllLoc = (reqNum) => {
    return async (dispatch) => {
        const getLoc = async () => {
            const response = await axios.get(`http://localhost:3000/rent-locs?dataReq=${reqNum}`);
            if (response.status === 200) {
                console.log("GOT THE DATA")
                const resData = response.data.data
                const data = resData.slice(0, 20);
                return { locs: data, totalLocs: response.data.totalLoc };
            }
            if (response.status === 204) {
                return null;
            }
        }

        try {
            const { locs, totalLocs } = await getLoc()
            dispatch(rentLocActions.addRentLoc({ locData: locs, totalLocs: totalLocs }))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}

export const rentLocActions = rentLocSlice.actions
export default rentLocSlice
