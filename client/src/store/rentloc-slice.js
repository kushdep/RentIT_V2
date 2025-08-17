import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rentLocSlice = createSlice({
    name: 'rentLoc',
    initialState: {
        rentLocData: [],
        totalPages: null,
        currPage: 0,
        chckPts: null,
        filter: {
            guestCap:null,
            priceRange:''
        },
        sortBy: {
            distance: false,
            ratings: false,
        },
        rentLocType:''
    },
    reducers: {
        addRentLoc(state, action) {
            try {
                state.rentLocData = action.payload.locData
                if (state.totalPages === null) {
                    state.totalPages = Math.ceil(action.payload.totalLocs / 8)
                    if (state.totalPages > 4) {
                        state.chckPts = Math.floor(state.totalPages / 4)
                    }
                }
            } catch (error) {
                console.error("Error in addRentLoc() " + error)
            }
        },
        incChkPt(state, action) {
            try {
                state.chckPts = state.chckPts + 1
            } catch (error) {
                console.error("Error in UpdateChkPoint " + error)
            }
        },
        incCurrPage(state, action) {
            try {
                state.currPage = state.currPage + 1
            } catch (error) {
                console.error("Error inn changeCurrPage() " + error)
            }
        },
        decCurrPage(state, action) {
            try {
                state.currPage = state.currPage - 1
            } catch (error) {
                console.error("Error inn changeCurrPage() " + error)
            }
        },
        chngCurrPage(state, action) {
            try {
                state.currPage = action.payload
            } catch (error) {
                console.error("Error inn changeCurrPage() " + error)
            }
        },
        incChkPts(state, action) {
            try {
                state.chckPts = state.chckPts - 1
            } catch (error) {
                console.error("Error in chngChkPts() " + error)
            }
        },
        decChkPts(state, action) {
            try {
                state.chckPts = state.chckPts - 1
            } catch (error) {
                console.error("Error in chngChkPts() " + error)
            }
        }
    }
})

export const getFilteredLoc = (reqNum, body) => {
    return async (dispatch) => {
        const getFltrLoc = async () => {
            console.log(body)
            let range = body.priceRng
            let guests = body.guestCnt
            const response = await axios.get(`http://localhost:3000/rent-locs?filter=true&dataReq=${reqNum}&range=${range}&guests=${guests}`);
            if (response.status === 200) {
                const resData = response.data.data
                const data = resData.slice(0, 32);
                return { locs: data, totalLocs: response.data.totalLoc };
            }
            if (response.status === 204) {
                return null;
            }
        }

        try {
            const { locs, totalLocs } = await getFltrLoc()
            console.log(locs)
            console.log("Total Locations "+totalLocs)
            dispatch(rentLocActions.addRentLoc({ locData: locs, totalLocs: totalLocs }))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}
export const getAllLoc = (reqNum) => {
    return async (dispatch) => {
        const getLoc = async () => {
            const response = await axios.get(`http://localhost:3000/rent-locs?dataReq=${reqNum}`);
            if (response.status === 200) {
                const resData = response.data.data
                const data = resData.slice(0, 32);
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
