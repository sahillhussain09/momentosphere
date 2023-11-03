import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loadUserReducer, loginSlice, registerSlice, getPostOfFollowingsReducer, logoutReducer, getMyPostsReducer, profileUpdateReducer, userProfileReducer, followUserReducer } from "./reducers/UserReducers"
import { deleteYourPostReducer, editCaptionReducer, postLikeAndUnlikeReducer, postUploadReducer } from "./reducers/PostReducers";

const rootReducer = combineReducers({
    loginReducer: loginSlice.reducer,
    registerReducer: registerSlice.reducer,
    loadMyProfile: loadUserReducer.reducer,
    getUserProfile: userProfileReducer.reducer,
    followUser: followUserReducer.reducer,
    getMyPosts: getMyPostsReducer.reducer,
    postsOfFollowings: getPostOfFollowingsReducer.reducer,
    updateProfile: profileUpdateReducer.reducer,
    logoutReducer: logoutReducer.reducer,
    // posts
    postUpload: postUploadReducer.reducer,
    postEdit : editCaptionReducer.reducer,
    likeAndUnlike: postLikeAndUnlikeReducer.reducer,
    deleteYourPost: deleteYourPostReducer.reducer
})


export const Store = configureStore({
    reducer: rootReducer
})