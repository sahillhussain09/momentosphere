import { createSlice } from "@reduxjs/toolkit";
import { userLoginAction, userRegisterAction, loadUser, getPostOfFollowings, logOut, getMyPosts, followUser, updateProfile, getUserProfile } from "../actions/UserActions"
import { accordionActionsClasses } from "@mui/material";


export const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        auth: false,
        data: [],
        error: null
    },

    extraReducers: {
        [userLoginAction.pending]: (state, action) => {
            state.loading = true
        },

        [userLoginAction.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
            state.auth = true
        },

        [userLoginAction.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
            state.auth = false
        }
    }
});

export const registerSlice = createSlice({
    name: "register",
    initialState: {
        registerLoading: false,
        auth: false,
        registerData: null,
        registerError: null
    },

    extraReducers: {
        [userRegisterAction.pending]: (state) => {
            state.registerLoading = true
        },

        [userRegisterAction.fulfilled]: (state, action) => {
            state.registerLoading = false
            state.auth = true
            state.registerData = action.payload

        },

        [userRegisterAction.rejected]: (state, action) => {
            state.registerLoading = false
            state.registerError = action.payload
            state.auth = false
        }
    }
})


export const loadUserReducer = createSlice({
    "name": "loadMe",
    initialState: {
        loading: false,
        data: null,
        error: null,
        auth: false

    },

    extraReducers: {
        [loadUser.pending]: (state) => {
            state.loading = true
        },

        [loadUser.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload,
                state.auth = true

        },

        [loadUser.rejected]: (state, action) => {
            state.auth = false,
                state.error = action.payload
        }
    }
})

export const userProfileReducer = createSlice({
    name: "getUserProfile",
    initialState: {
        loading: false,
        data: null,
        error: null
    },

    extraReducers: {
        [getUserProfile.pending]: (state) => {
            state.loading = true
        },

        [getUserProfile.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },

        [getUserProfile.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
})

// reducer for handle for follow user data

export const followUserReducer = createSlice({
    name: "followUser",
    initialState: {
        loading: false,
        data: null,
        error: null,
    }, 
                

    extraReducers: {
        [followUser.pending]: (state) => {
            state.loading = true
        },

        [followUser.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },


        [followUser.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
})


export const getMyPostsReducer = createSlice({
    name: "getMyPosts",
    initialState: {
       allPostsLoading: false,
        allPostsData: null,
        allPostsError: null
    },

    extraReducers: {

        [getMyPosts.pending]: (state) => {
            state.allPostsLoading = true
        },

        [getMyPosts.fulfilled]: (state, action) => {
            state.allPostsLoading = false,
                state.allPostsData = action.payload
        },

        [getMyPosts.rejected]: (state, action) => {
            state.allPostsLoading = false
            state.allPostsError = action.payload
        }
    }

})

export const getPostOfFollowingsReducer = createSlice({
    "name": "followingsPosts",
    initialState: {
        loading: false,
        data: null,
        error: null
    },

    extraReducers: {
        [getPostOfFollowings.pending]: (state) => {
            state.loading = true
        },

        [getPostOfFollowings.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },

        [getPostOfFollowings.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
})


// your profile update reducer 

export const profileUpdateReducer = createSlice({
    name: "updateProfileReducer",
    initialState: {
        loading: false,
        data: null,
        error: null
    },

    extraReducers: {
        [updateProfile.pending]: (state) => {
            state.loading = true
        },

        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false,
                state.data = action.payload
        },

        [updateProfile.rejected]: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    }
})


export const logoutReducer = createSlice({
    name: "logoutReducer",
    initialState: {
        logoutAuth: false,
        loading: false
    },

    extraReducers: {
        [logOut.pending]: (state) => {
            state.loading = true
        },

        [logOut.fulfilled]: (state, action) => {
            state.loading = false,
                state.logoutAuth = true
        }
    }

})


export const { } = loginSlice.actions;
