import axios from "axios";
import { $api, rootURL} from "../api/http";
import {ME} from "../reducers/types"

const handleSignUp = async (email, password) => {
    let data = {}
    await $api.post("/sign_up", {
         email,
         password
     }).then((response) =>{
         data = response
         console.log(response)
      }
     )
     return data
 }

const handleLogin = async (email, password) => {
   let data = {}
   await $api.post(
        `/login?email=${email}&password=${password}`
        ).then((response)=> {
            if(response.data.status === 'error'){
                console.log(response.data.message)
            }else{
                localStorage.setItem("accessToken", response.data.body.access_token);
                localStorage.setItem("refreshToken", response.data.body.refresh_token);
            }
            data = response
        }
       )
       return data
}

const getMe = (accessToken, refreshToken) => async(dispatch) => {
    $api.interceptors.response.use((response) =>{
        if(response.data.statusCode === 200){
            dispatch({type: ME, payload: response})
        }else{
            console.log("STATUS CODE IS NOT 200")
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
        return response
    })
    await $api.get(`${rootURL}/me`, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export {handleSignUp, handleLogin, getMe}