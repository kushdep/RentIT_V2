import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { response } from "express";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        savedLocData: {
            count: 0,
            locData: []
        },
        myReviewData: [],
        profileData: {
            email:null,
            username:null,
            idProof:null,
            contactNo:null,
            othContactNo:null
        },
        tripsData: [],
        approvalsData: []
    },
    reducers: {
        updateSavedLocData(state, action) {
            try {
                console.log(action)
                const { locDetails, status } = action.payload
                console.log(locDetails)
                if (status) {
                    state.savedLocData.locData.push(locDetails)
                    state.savedLocData.count = state.savedLocData.count + 1
                } else {
                    state.savedLocData.locData.filter((e) => e.locId !== locDetails.locId)
                }
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
        },
        updateProfileData(state,action){
            try {
                const {userData} = action.payload
                if(userData.email){
                    state.email = userData.email
                }
                
                if(userData.username){
                    state.username = userData.username
                    
                }
                
                if(userData.idProof){
                    state.idProof = userData.idProof
                }

                if(userData.primaryPhNo){
                    state.contactNo = userData.primaryPhNo
                }

                if(userData.sndryPhNo){
                    state.othContactNo = user.sndryPhNo
                }

            } catch (error) {
                console.log("Error in updateProfileData "+error)
            }
        }
    }
})

export const setSavedLoc = (locSaveStt) => {
    return async (dispatch, getState) => {
        const { locId, saveStts, token } = locSaveStt
        console.log(locId)
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
                    const { locDetails, status } = response.data.data
                    console.log(locDetails)
                    return { locDetails, status }
                }

            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error.response.data);
                }
                console.log(error)
            }
        }
        try {
            const { locDetails, status } = await setLikedLoc()
            console.log(locDetails)
            dispatch(profileActions.updateSavedLocData({ locDetails, status }))
            return {
                success: true,
                message: 'Location Save Status Update'
            }
        } catch (error) {
            console.error("Error while Saving Loc" + error)
            throw {
                success: false,
                message: 'Location Save Status failed',
                error: error
            }
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
            console.log(response)
            if (response.status === 200) {
                const resData = response.data.data
                console.log(resData)
                return { locs: resData, totalLocs: response.data.totalLocs };
            }
            if (response.status === 204) {
                return { locs: [], totalLocs: null };
            }
        }

        try {
            const { locs, totalLocs } = await getLoc()
            console.log(locs)
            console.log(totalLocs)
            dispatch(profileActions.addSavedLocData({ locData: locs, totalLocs }))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}

export const getProfileData = (token) => {
    return async(dispatch) => {
        async function getProfile(){
            try {
                const response = await axios.get('https://localhost:3000/profile',{
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                })
                if(response.status===200){
                    const {userData} = response.data.user
                    return {userData}
                }
            } catch (error) {
                if(error.response.status === 400){
                    console.log(error.response.message)
                }
                if(error.response.status === 403){
                    console.log(error.response.message)
                }
            }
        }
        
        try {
            const {userData} = await getProfile() 
            dispatch(profileActions.updateProfileData(userData)) 
        } catch (error) {
            console.log("Error in getProfileData "+error)
        }
    }
}

export const profileActions = profileSlice.actions
export default profileSlice
