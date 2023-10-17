import { createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


let bearerToken = `Bearer ${Cookies.get("token")}`

export const userLoginAction = createAsyncThunk("login", async (userLogin, { rejectWithValue }) => {

    try {

        let result;

        if (userLogin.username.length !== null && userLogin.password.length !== null) {
            const loginResponse = await axios.post('http://127.0.0.1:7000/signin', {
                "username": userLogin.username,
                "password": userLogin.password
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )

            if (!loginResponse.data.success) {
                return rejectWithValue(loginResponse.data.error)
            }

            loginResponse.data.token ? await Cookies.set("token", loginResponse.data.token) : null
            result = await loginResponse.data
            return result
        }

    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : "something went wrong!!");
    }
})


export const userRegisterAction = createAsyncThunk("userRegister", async (args, { rejectWithValue }) => {

    const { data } = await axios.post("http://127.0.01:7000/signup", {
        "username": args.username,
        "email": args.email,
        "password": args.password
    }, {
        headers: { "Content-Type": "application/json" }
    }
    )
    try {
        console.log("register", data);
        return data


    } catch (error) {
        return rejectWithValue(error)
    }

})


export const loadUser = createAsyncThunk("loadUser", async (args, { rejectWithValue }) => {

    try {

        const { data } = await axios.get("http://127.0.0.1:7000/myprofile", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });

        if (!data.success) {
            return data.error
        }

        return data

    } catch (error) {

        return rejectWithValue(error)
    }

})


export const getPostOfFollowings = createAsyncThunk("postOfFollowings", async (args, { rejectWithValue }) => {


    try {

        const { data } = await axios.get("http://127.0.0.1:7000/posts", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });

        if (!data.success) {
            return data.error
        }

        return data

    } catch (error) {
        return rejectWithValue(error);
    }
})


export const getMyPosts = createAsyncThunk("getMyPosts", async (args, { rejectWithValue }) => {

    try {

        const data = await axios.get("http://127.0.0.1:7000/myposts", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        })

        if (!data.success) {
            return data.error
        }

        return data;

    } catch (error) {
        return rejectWithValue(error)
    }

})


export const logOut = createAsyncThunk("logout", async (args, { rejectWithValue }) => {
    try {

        const { data } = await axios.get("http://127.0.0.1:7000/logout");
        if (data.success) {
            await Cookies.remove("token");
        }
        return data

    } catch (error) {
        return rejectWithValue(error)
    }
})