import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loadUserReducer, loginSlice, registerSlice, getPostOfFollowingsReducer, logoutReducer, getMyPostsReducer, profileUpdateReducer } from "./reducers/UserReducers"
import { postLikeAndUnlikeReducer, postUploadReducer } from "./reducers/PostReducers";

const rootReducer = combineReducers({
    loginReducer: loginSlice.reducer,
    registerReducer: registerSlice.reducer,
    loadMyProfile: loadUserReducer.reducer,
    getMyPosts: getMyPostsReducer,
    postsOfFollowings: getPostOfFollowingsReducer.reducer,
    updateProfile: profileUpdateReducer.reducer,
    logoutReducer: logoutReducer.reducer,
    // posts
    postUpload: postUploadReducer.reducer,
    likeAndUnlike: postLikeAndUnlikeReducer.reducer
})


export const Store = configureStore({
    reducer: rootReducer

})