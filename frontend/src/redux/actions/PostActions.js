import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const postLikeAndUnlike = createAsyncThunk("likeAndUnlike", async (args, { rejectWithValue }) => {


    try {
        const { data } = await axios.get(`http://127.0.0.1:7000/post/likeandunlike/${args}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })

        console.log(data);

        if (!data.success) {
            return data.error
        }
        return data

    } catch (error) {
        return rejectWithValue(error);
    }

})


export const postEditAction = createAsyncThunk("editCaption", async(postData) =>{
    try {
        
        const postId= postData.postId;
        const caption = postData.editCaption;

        const {data} = await axios.put(`http://127.0.0.1:7000/post/update/${postId}`, {
            caption
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });
        
       return data;

    } catch (error) {
        return error
    }
});


// this function for delete post 
export const deleteYourPost = createAsyncThunk("deleteYourPost", async (postId, { rejectWithValue }) => {

    try {

        const { data } = await axios.delete(`http://127.0.0.1:7000/post/delete/${postId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });

        if (!data.success) {
            return data.error;
        } else {
            return data;
        }

    } catch (error) {
        return rejectWithValue(error);
    }

})


export const postUpload = createAsyncThunk("postUpload", async (formData, { rejectWithValue }) => {
    try {

        console.log("formdata", formData);

        const { data } = await axios.post('http://127.0.0.1:7000/post/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })

        if (!data.success) {
            console.log(data);
            return data.error

        }
        console.log(data);
        return data

    } catch (error) {
        return rejectWithValue(error)
    }
})