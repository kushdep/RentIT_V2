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
        // addNewInput(state, action) {
        //     state.imgTtlData.push({ title: '', images: [] })
        // },
        delImgInput(state, action) {
            const { ind } = action.payload;
            state.imgTtlData = state.imgTtlData.filter((_, i) => i !== ind);
        },
        addFilesTtl(state, action) {
            const { index, filesTtl } = action.payload
            const newDataLen = Math.max(0, index - state.imgTtlData.length + 1);
            const newData = Array.from({ length: newDataLen }, () => ({ title: '', images: [] }));

            state.imgTtlData.push(...newData)

            state.imgTtlData[index].title = filesTtl
        },
        addImgFiles(state, action) {
            try {
                const { index, file } = action.payload
                const newDataLen = Math.max(0, index - state.imgTtlData.length + 1);
                const newData = Array.from({ length: newDataLen }, () => ({ title: '', images: [] }));

                state.imgTtlData.push(...newData);

                state.imgTtlData[index].images.push(file)
            } catch (error) {
                console.log(error)
            }
        },
        delImgFile(state, action) {
            const { index, imgIn } = action.payload
            state.imgTtlData[index].images = state.imgTtlData[index].images.filter((e, i) => imgIn !== i)
        },
    }
})


export const addLocActions = addLocSlice.actions

export default addLocSlice
