import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { locType } from "../config";

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
        serach: {
            name: null,
            locCor: {
                long: null,
                lat: null
            }
        },
        sortBy: {
            distance: {
                inc: false,
                currLoc: {
                    long: null,
                    lat: null
                }
            },
            ratings: false,
        },
        rentLocType: ''
    },
    reducers: {
        addRentLoc(state, action) {
            try {
                state.rentLocData = action.payload.locData
                let ttlPgs = Math.ceil(action.payload.totalLocs / 8)
                if (state.totalPages !== ttlPgs && ttlPgs > 4) {
                    state.chckPts = Math.floor(ttlPgs / 4)
                    console.log(state.chckPts)
                    console.log(ttlPgs)
                } else if (ttlPgs <= 4) {
                    state.chckPts = 0
                }
                state.totalPages = ttlPgs
                console.log(state.totalPages)
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
                console.error("Error in changeCurrPage() " + error)
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
                const { prcRngIn = null, guests = null, locFltr = null } = action.payload
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
                if (locFltr !== null && locFltr !== '') {
                    const exists = locType.some(obj => Object.values(obj).includes(locFltr));
                    if (exists) {
                        state.rentLocType = locFltr
                    } else {
                        throw Error('Please set correct Location type')
                    }
                }
            } catch (error) {
                console.error("Error in updateFilterStt() " + error)
            }
        },
        updateSortingStt(state, action) {
            try {
                const { srtBy, isChk, currLocDtl = null } = action.payload
                if (srtBy === 'Distance') {
                    state.sortBy.distance.inc = isChk
                    state.sortBy.distance.currLoc = currLocDtl
                }
                if (srtBy === 'Ratings') {
                    state.sortBy.ratings = isChk
                }
                console.log(action.payload)
            } catch (error) {
                console.error("Error in updateSortingStt() " + error)
            }
        },
        resetFltrStt(state, action) {
            try {
                const resetFld = action.payload
                console.log(action.payload)
                if (resetFld === 'guests') {
                    state.filter.guestCap = null
                } else if (resetFld === 'priceRng') {
                    state.filter.priceRange.ind = null
                    state.filter.priceRange.range = ''
                }
            } catch (error) {
                console.error("Error in resetFltrSrtStt() " + error)
            }
        },
        resetSrtStt(state, action) {
            try {
                const resetFld = action.payload
                console.log(action.payload)
                if (resetFld === 'dst') {
                    state.sortBy.distance.inc = false
                    state.sortBy.distance.currLoc.long = null
                    state.sortBy.distance.currLoc.lat = null
                } else if (resetFld === 'rtng') {
                    state.sortBy.ratings = false
                }

            } catch (error) {
                console.error("Error in resetFltrSrtStt() " + error)
            }
        },
        searLocStt(state, action) {
            try {
                const { locName = null, locCor = {} } = action.payload
            } catch (error) {
                console.error("Error in searLocStt() " + error)
            }
        }
    }
})

export const getFilteredLoc = (reqNum) => {
    return async (dispatch, getState) => {
        const getFltrLoc = async () => {
            const { filter, sortBy, rentLocType } = getState().rentLocs
            const { guestCap, priceRange } = filter
            const { distance, ratings } = sortBy

            let url = `http://localhost:3000/rent-locs?dataReq=${reqNum}`

            const queryParams = []
            if (guestCap !== null || priceRange.ind !== null || rentLocType !== '') queryParams.push(`filter=true`)
            if (distance.inc || ratings) queryParams.push(`sortBy=true`)

            if (guestCap !== null) queryParams.push(`guests=${guestCap}`)
            if (priceRange.ind !== null) queryParams.push(`range=${priceRange.ind}`)

            if (distance.inc) queryParams.push(`distance=true&lat=${distance.currLoc.lat}&long=${distance.currLoc.long}`)

            if (ratings) queryParams.push(`ratings=true`)
            if (rentLocType !== '') queryParams.push(`locFltr=${rentLocType}`)

            if (queryParams.length > 0) {
                url += `&${queryParams.join("&")}`
            }

            console.log("URL " + url)
            try {
                const response = await axios.get(url)
                console.log(response)
                if (response.status === 200) {
                    const resData = response.data.data
                    const data = resData.slice(0, 32);
                    return { locs: data, totalLocs: response.data.totalLoc };
                }
                if (response.status === 204) {
                    return { locs: [], totalLocs: null };
                }
            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error.response.data);
                }
                console.log(error)
            }
        }

        try {
            const { locs, totalLocs } = await getFltrLoc()
            console.log(locs)
            console.log("Total Locations " + totalLocs)
            dispatch(rentLocActions.addRentLoc({ locData: locs, totalLocs: totalLocs }))
        } catch (error) {
            console.error("Error while Getting Data" + error)
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

export const getSearchLoc = (searchQuery) => {
    return async (dispatch) => {

    }
}

export const rentLocActions = rentLocSlice.actions
export default rentLocSlice
