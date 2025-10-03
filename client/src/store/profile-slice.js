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
        profile: {
            email: null,
            username: null,
            address: null,
            contactNo: null,
            othContactNo: null,
            imgUrl: null,
        },
        userType: {
            pptr: false,
        },
        tripsData: {
            count: 0,
            trips: []
        },
        bookings: [],
        payments: [],
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
        addTripsData(state, action) {
            try {
                const { tripData = [], totalTrips = null } = action.payload
                state.tripsData.trips = tripData
                state.tripsData.count = totalTrips
            } catch (error) {
                console.error("Error in addTripsData() " + error)
            }
        },
        addBookingsData(state, action) {
            try {
                const { bookingsData = [] } = action.payload
                state.bookings = bookingsData
            } catch (error) {
                console.error("Error in addBookingsData() " + error)
            }
        },
        addPaymentsData(state, action) {
            try {
                const { paymentsData = [] } = action.payload
                state.payments = paymentsData
            } catch (error) {
                console.error("Error in addPaymentsData() " + error)
            }
        },
        updateProfileData(state, action) {
            try {
                const { userData } = action.payload
                if (userData.email) {
                    state.profile.email = userData.email
                }

                if (userData.username) {
                    state.profile.username = userData.username
                }

                if (userData.address) {
                    state.profile.address = userData.address
                }

                if (userData.primaryPhNo) {
                    state.profile.contactNo = userData.primaryPhNo
                }

                if (userData.sndryPhNo) {
                    state.profile.othContactNo = user.sndryPhNo
                }

                if (userData.userType.propertier) {
                    state.userType.pptr = true
                }

            } catch (error) {
                console.log("Error in updateProfileData " + error)
            }
        },
        updateProfileImage(state, action) {
            try {
                const url = action.payload
                state.profile.imgUrl = url
            } catch (error) {
                console.log("Error in updateProfileData " + error)
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
    return async (dispatch) => {
        async function getProfile() {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                if (response.status === 200) {
                    const { user } = response.data
                    return { userData: user }
                }
            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error.response.message)
                }
                if (error.response.status === 403) {
                    console.log(error.response.message)
                }
            }
        }

        try {
            const { userData } = await getProfile()
            console.log(userData)
            dispatch(profileActions.updateProfileData({ userData }))
            dispatch(profileActions.updateProfileImage(userData.userImg.url))
        } catch (error) {
            console.error("Error in getProfileData " + error)
        }
    }
}

export const setProfileData = (token, body) => {
    return async (dispatch) => {
        async function setProfile() {
            try {
                const response = await axios.patch("http://localhost:3000/profile", body, {
                    headers: {
                        authorization: `Bearer ${token}`
                    },
                })

                console.log(response)
                if (response.status === 200) {
                    const { user } = response.data
                    return { userData: user }
                }

            } catch (error) {
                if (error.response.status === 400) {
                    console.log(error.response.message)
                }
                if (error.response.status === 403) {
                    console.log(error.response.message)
                }
            }
        }

        try {
            const { userData } = await setProfile()
            dispatch(profileActions.updateProfileData({ userData }))
            return {
                success: true,
                message: 'Location Save Status Update'
            }
        } catch (error) {
            console.log("Error in setrProfileData() " + error)
            throw {
                success: false,
                message: "Profile Updation failed",
                error: error
            }
        }
    }
}

export const getMyTrips = (token) => {
    return async (dispatch) => {
        const getTrips = async () => {
            const response = await axios.get(`http://localhost:3000/profile/my-trips`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            if (response.status === 200) {
                const resData = response.data.data
                console.log(resData)
                return { trips: resData, totalTrips: response.data.totalTrips };
            }
            if (response.status === 204) {
                return { trips: [], totalTrips: null };
            }
        }

        try {
            const { trips, totalTrips } = await getTrips()
            console.log(trips)
            console.log(totalTrips)
            dispatch(profileActions.addTripsData({ tripData: trips, totalTrips }))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}

export const getMyBookings = (token) => {
    return async (dispatch) => {
        const getBookings = async () => {
            const response = await axios.get(`http://localhost:3000/profile/my-bookings`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            if (response.status === 200) {
                const resData = response.data.data
                console.log(resData)
                return { bookings: resData };
            }
            if (response.status === 204) {
                return { bookings: [] };
            }
        }

        try {
            const { bookings } = await getBookings()
            dispatch(profileActions.addBookingsData({ bookingsData:bookings}))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}
export const getPaymentsInfo = (token) => {
    return async (dispatch) => {
        const getInfo = async () => {
            const response = await axios.get(`http://localhost:3000/profile/payments-info`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response)
            if (response.status === 200) {
                const resData = response.data.data
                console.log(resData)
                return { payments: resData };
            }
            if (response.status === 204) {
                return { bookings: [] };
            }
        }

        try {
            const { payments } = await getInfo()
            dispatch(profileActions.addPaymentsData({ paymentsData:payments}))
        } catch (error) {
            console.error("Error while Getting Data")
        }
    }
}

export const profileActions = profileSlice.actions
export default profileSlice
