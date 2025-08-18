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
            guestCap: null,
            priceRange: {
                ind: null,
                range: ''
            }
        },
        sortBy: {
            distance: false,
            ratings: false,
        },
        rentLocType: ''
    },
    reducers: {
        addRentLoc(state, action) {
            try {
                state.rentLocData = action.payload.locData
                let totalPages = Math.ceil(action.payload.totalLocs / 8)
                if (state.totalPages !== totalPages && totalPages > 4) {
                    state.chckPts = Math.floor(totalPages / 4)
                }else if(totalPages<=4){
                    state.chckPts=0
                }
                state.totalPages = totalPages
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
        },
        updateFilterStt(state, action) {
            try {
                const { prcRngIn = null, guests = null } = action.payload
                if (prcRngIn !== null) {
                    const from = 2 * (Number(prcRngIn) + 1)
                    if (prcRngIn >= 0 && prcRngIn <= 2) {
                        const to = 2 * (Number(prcRngIn) + 2)
                        state.filter.priceRange.range = `₹${from},000 - ₹${to},000`
                    } else {
                        state.filter.priceRange.range = `more than ${from},000`
                    }
                    state.filter.priceRange.ind = Number(prcRngIn)
                }
                if (guests !== null && guests > 0) {
                    state.filter.guestCap = Number(guests)
                }
            } catch (error) {
                console.error("Error in updateFilterStt() " + error)
            }
        },
        updateSortingStt(state,action){
            try {
                const {srtBy,isChk} = action.payload 
                if(srtBy==='Distance'){
                    state.sortBy.distance=isChk
                }
                if(srtBy==='Ratings'){
                    state.sortBy.ratings=isChk
                }
            } catch (error) {
                console.log("Error in updateSortingStt() "+error)
            }
        }
    }
})

export const getFilteredLoc = (reqNum) => {
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
                return { locs: [], totalLocs: null };
            }
        }

        try {
            const { locs, totalLocs } = await getFltrLoc()
            console.log(locs)
            console.log("Total Locations " + totalLocs)
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
                return { locs: [], totalLocs: null };
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
