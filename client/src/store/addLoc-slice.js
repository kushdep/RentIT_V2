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
        addNewInput(state, action) {
            state.imgTtlData.push({ title: '', images: [] })
        },
        delImgInput(state, action) {
            const { ind } = action.payload;
            state.imgTtlData = state.imgTtlData.filter((_, i) => i !== ind);
        },
        addFilesTtl(state, action) {
            const { index, filesTtl } = action.payload
            state.imgTtlData[index].title = filesTtl
        },
        addImgFiles(state, action) {
            const { index, file } = action.payload
            state.imgTtlData[index].images.push(file)
        },
        delImgFile(state, action) {
            const { index, imgIn } = action.payload
            state.imgTtlData[index].images = state.imgTtlData[index].images.filter((e, i) => imgIn !== i)
        },
    }
})


export const addLocActions = addLocSlice.actions

export default addLocSlice
