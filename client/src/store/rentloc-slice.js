import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rentLocSlice = createSlice({
    name: 'rentLoc',
    initialState: {
        rentLocData: []
    },
    reducers: {
        addRentLoc(state, action) {
            try {
                console.log(action)
                state.rentLocData = action.payload
                console.log(state.rentLocData)
            } catch (error) {
                console.error("Error in addRentLoc() " + error)
            }
        },

    }
})

export const getAllLoc = () => {
    return async (dispatch) => {
        const getLoc = async () => {
            const response = await axios.get("http://localhost:3000/rent-locs");
            if (response.status === 200) {
                console.log("GOT THE DATA")
                const resData = await response.data.data;
                return resData;
            }
            if (response.status === 204) {
                return null;
            }
        }

        try {
            const locData = await getLoc()
            console.log(locData)
            dispatch(rentLocActions.addRentLoc(locData))
        } catch (error) {
            console.error("Error while Getting Data")
        }

    }
}

export const rentLocActions = rentLocSlice.actions
export default rentLocSlice
