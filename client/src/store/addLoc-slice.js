import { createSlice } from "@reduxjs/toolkit";
import { Ammentities } from "../config";


const addLocSlice = createSlice({
    name: 'addLoc',
    initialState: {
        locName: '',
        locType: '',
        locAdd: null,
        imgTtlData: [{
            title: '',
            images: []
        }],
        offAmm: [],
        desc: '',
        price: null,
    },
    reducers: {
        addImgTtlNewData(state, action) {
            state.imgTtlData.push({ title: '', images: [] })
        },
        delImgInput(state, action) {
            try {
                const { ind } = action.payload;
                state.imgTtlData = state.imgTtlData.filter((_, i) => i !== ind);
            } catch (error) {
                console.log(error)
            }
        },
        addFilesTtl(state, action) {
            try {
                const { index, filesTtl } = action.payload
                state.imgTtlData[index].title = filesTtl
            } catch (error) {
                console.log(error)
            }
        },
        addImgFiles(state, action) {
            try {
                const { index, file } = action.payload
                state.imgTtlData[index].images.push(file)
            } catch (error) {
                console.log(error)
            }
        },
        delImgFile(state, action) {
            try {
                const { index, imgIn } = action.payload
                state.imgTtlData[index].images = state.imgTtlData[index].images.filter((e, i) => imgIn !== i)
            } catch (error) {
                console.log(error)
            }
        },
        handleAmmOpt(state, action) {
            try {
                const { ammId, optId, isChecked } = action.payload
                const isAmmExist = state.offAmm.find((e) => e.id === ammId)
                const ammData = Ammentities.find((e) => e.id === ammId)

                if (!isAmmExist) {
                    state.offAmm.push({ id: ammId, title: ammData.title, opt: [] })
                }
                if (isChecked) {
                    const name = ammData.options.find((o) => o.id === optId).name

                    const newOpt = { id: optId, name }
                    state.offAmm = state.offAmm.map((e) => {
                        if (e.id === ammId) {
                            e.opt.push(newOpt)
                        }
                        return e
                    })
                } else {
                    if (isAmmExist.opt.length === 1) {
                        state.offAmm = state.offAmm.filter((e) => e.id !== ammId)
                    } else {
                        state.offAmm = state.offAmm.map((e) => {
                            if (e.id === ammId) {
                                e.opt = e.opt.filter((o) => o.id !== optId)
                            }
                            return e
                        })
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        delAmmenity(state, action) {
            try {
                const { id } = action.payload
                state.offAmm = state.offAmm.filter((e) => e.id !== id)
            } catch (error) {
                console.log(error)
            }
        },
        addLocCord(state, action) {
            try {
                const { location } = action.payload
                console.log(location)
                state.locAdd = location
                console.log(state.locAdd)
            } catch (error) {
                console.log(error)
            }
        },
        clearLocCord(state,action){
            try {
                state.locAdd=''
            } catch (error) {
                console.error('Error in clearLocCord() '+error)
            }
        },
        updateLocType(state,action){
            try {
                const {type} = action.payload
                state.locType=type
            } catch (error) {
                console.error('Error in updateLocType() '+error)
            }
        },
        updatePrice(state,action){
            try {
                const {locPrice} = action.payload
                state.price=locPrice
            } catch (error) {
                console.error('Error in updatePrice() '+error)   
            }
        },
        updateLocName(state,action){
            try {
                const {name} = action.payload
                state.locName=name
            } catch (error) {
                console.error('Error in updateName() '+error)   
            }
        },
        addDesc(state,action){
            try {
                const {description} = action.payload
                state.desc=description
            } catch (error) {
                console.error('Error in addDesc() '+error)   
            }
        }
    }
})


export const addLocActions = addLocSlice.actions

export default addLocSlice
