import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        savedLocData: {
            count: 0,
            locData: []
        },
        myReviewData: [],
        editProfile: {},
        tripsData: [],
        approvalsData: []
    },
    reducers: {
        updateSavedLocData(state, action) {
            try {

            } catch (error) {
                console.error("Error in updateSavedLocData() " + error)
            }
        },
        addSavedLocData(state, action) {
            try {
                const { locData = [], totalLocs = null } = action.payload
                state.savedLocData.locData = locData
                state.savedLocData.count = totalLocs
            } catch (error) {
                console.error("Error in addSavedLocData() " + error)
            }
        }
    }
})

export const setSavedLoc = (locSaveStt) => {
    return async (dispatch, getState) => {
        const { locId, saveStts, token } = locSaveStt
        console.log(locSaveStt)

        if (locId === undefined || locId === null || saveStts === undefined || saveStts === null) {
            return
        }
        
        async function setLikedLoc() {
            try {
                let body = { locId, likeStts: saveStts }
                console.log(body)
                const response = await axios.patch('http://localhost:3000/profile/update-liked-loc', body, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    const { id, status } = response.data.data
                    return { locationId: id, resSaveStts: status }
                }

            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error.response.data);
                }
                console.log(error)
            }
        }
        try {
            const { locationId, resSaveStts } = await setLikedLoc()
            dispatch(profileActions.updateSavedLocData({ locationId, resSaveStts }))
        } catch (error) {
            console.error("Error while Saving Loc" + error)
        }
    }
}

export const getSavedLoc = (token) => {
    return async (dispatch) => {
        const getLoc = async () => {
            const response = await axios.get(`http://localhost:3000/profile/liked-loc`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const resData = response.data.data
                return { locs: resData, totalLocs: response.data.totalLocs };
            }
            if (response.status === 204) {
                return { locs: [], totalLocs: null };
            }
        }

        try {
            const { locs, totalLocs } = await getLoc()
            dispatch(rentLocActions.addSavedLocData({ locData: locs, totalLocs }))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}

export const profileActions = profileSlice.actions
export default profileSlice
