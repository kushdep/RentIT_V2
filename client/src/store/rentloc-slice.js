import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rentLocSlice = createSlice({
    name: 'rentLoc',
    initialState: {
        rentLocData: [],
        totalPages: null,
        currPage: 1
    },
    reducers: {
        addRentLoc(state, action) {
            try {
                state.rentLocData = action.payload.locData
                state.totalPages = Math.ceil(action.payload.totalLocs / 5)
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
        changeCurrPage(state,action){
            try {
                const pageNum = action.payload
                state.currPage = pageNum
            } catch (error) {
                console.log("Error inn changeCurrPage() "+error)
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
                const data = resData.slice(0, 10);
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
