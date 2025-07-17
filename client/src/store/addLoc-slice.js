import { createSlice } from "@reduxjs/toolkit";


const addLocSlice = createSlice({
    name: 'addLoc',
    initialState: {
        locName: '',
        locType: '',
        locCorn: '',
        imgTtlData: [{
            title: '',
            images: []
        }],
        offAmm: [{
            ammId: null,
            optId: []
        }],
        desc: '',
        price: null
    },
    reducers: {
        addImgTtlNewData(state,action){
            state.imgTtlData.push({title:'',images:[]})
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
    }
})


export const addLocActions = addLocSlice.actions

export default addLocSlice
