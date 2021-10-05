import axios from "axios";
import { $api, rootURL} from "../api/http";
import {SIGN_UP, LOG_IN, ME} from "../reducers/types"


const handleSignUp = (email, password) => async (dispatch) =>{
   await $api.post("/sign_up", {
        email,
        password
    }).then((response) =>{
        dispatch({type: SIGN_UP, payload: response.data})
        console.log(response)
     }
    )
}

const handleLogin = (email, password) => async (dispatch) =>{
   await $api.post(
        `/login?email=${email}&password=${password}`
        ).then((response)=> {
            dispatch({type: LOG_IN, payload: response.data})
            if(response.data.body.access_token && response.data.body.refresh_token){
                localStorage.setItem("accessToken", response.data.body.access_token);
                localStorage.setItem("refreshToken", response.data.body.refresh_token);
            }
            console.log(response)
        }
       )
}

const getMe = (accessToken, refreshToken) => async(dispatch) => {
    $api.interceptors.response.use((response) =>{
        if(response.data.statusCode === 200){
            dispatch({type: ME, payload: response})
        }else{
            console.log("STATUS CODE is NOT 200")
            axios({
                method: "post",
                url: `${rootURL}/refresh`,
                headers: { 
                    Authorization: `Bearer ${refreshToken}` 
                }
            }).then((response) =>{
                localStorage.setItem("accessToken", response.data.body.access_token)
                localStorage.setItem("refreshToken", response.data.body.refresh_token)
                axios.get(`${rootURL}/me`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                }).then((response) =>dispatch({ type: ME, payload: response }))
            })
        }
        console.log(response)
        return response
    })
    await $api.get(`${rootURL}/me`, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export {handleSignUp, handleLogin, getMe}