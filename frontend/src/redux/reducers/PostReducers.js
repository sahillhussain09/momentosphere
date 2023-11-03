import { createSlice } from "@reduxjs/toolkit";
import { postLikeAndUnlike, postUpload, deleteYourPost, postEditAction } from "../actions/PostActions";


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


// reducer for post caption edit 
export const editCaptionReducer = createSlice({
    name: "editCaption",
    initialState: {
        editPostLoading: false,
        editPostData: null,
        editPostError: null
    },

    [postEditAction.pending] : (state) =>{
        state.editPostLoading = true
    },

    [postEditAction.fulfilled] : (state, action) =>{
        state.editPostLoading = false,
        state.editPostData = action.payload
    },

    [postEditAction.rejected] : (state, action) =>{
        state.editPostLoading = false,
        state.editPostError = action.payload
    }
})

export const deleteYourPostReducer = createSlice({
    name: "deletepost",
    initialState: {
        loading: false,
        data: null,
        error: null
    },


    extraReducers: {
        [deleteYourPost.pending]: (state) => {
            state.loading = true
        },

        [deleteYourPost.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },

        [deleteYourPost.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }

    }
})