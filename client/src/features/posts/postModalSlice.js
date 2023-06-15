import { createSlice } from "@reduxjs/toolkit";

const postIdModal = createSlice({
    name: "postModal",
    initialState: { id: null },
    reducers: {
        setPostId: (state, action) => {
            const id = action.payload
            state.id = id
        },
        clearPostId: (state, action) => {
            state.id = null
        }
    }
})

export const { setPostId, clearPostId } = postIdModal.actions

export default postIdModal.reducer