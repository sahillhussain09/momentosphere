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