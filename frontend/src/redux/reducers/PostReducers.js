import { createSlice } from "@reduxjs/toolkit";
import { postLikeAndUnlike, postUpload } from "../actions/PostActions";


export const postUploadReducer = createSlice({
    name: "postUploder",
    initialState: {
        loading: false,
        data: null,
        error: null
    },

    extraReducers: {
        [postUpload.pending]: (state) => {
            state.loading = true
        },

        [postUpload.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },

        [postUpload.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
})


export const postLikeAndUnlikeReducer = createSlice({
    "name": "likeAndUnlike",
    initialState: {
        loading: false,
        error: null,
        data: null
    },


    extraReducers: {
        [postLikeAndUnlike.pending]: (state) => {
            state.loading = true
        },

        [postLikeAndUnlike.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },

        [postLikeAndUnlike.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
})

