/* eslint-disable no-console */
import axios from 'axios';
import { $api, rootURL } from '../api/http';

interface AuthResponse{
    body:{
      access_token: string;
      refresh_token: string;
    }
    statusCode: number;
    code: number;
    message: string;
    status: string;  
  
 
}

const handleSignUp = async (email:string, password:string) => {
  let signUpResponse
  await $api.post<AuthResponse>('/sign_up', {
    email,
    password,
  }).then((response) => {
    signUpResponse = response;
    console.log(response);
  });
  return signUpResponse;
};

const handleLogin = async (email:string, password:string) => {
  let loginResponse
  await $api.post<AuthResponse>(
    `/login?email=${email}&password=${password}`,
  ).then((response) => {
    console.log(response)
    if (response.data.status === 'error') {
      console.log(response.data.message);
    } else {
      localStorage.setItem('accessToken', response.data.body.access_token);
      localStorage.setItem('refreshToken', response.data.body.refresh_token);
    }
    loginResponse = response;
  });
  return loginResponse;
};

const getMe = async (accessToken:string |null, refreshToken:string | null) => {
  let responseData = {}
  $api.interceptors.response.use((response) => {
    if (response.data.statusCode === 200) {
      responseData = response;
    } else {
      console.log("STATUS CODE IS NOT 200");
      axios({
        method: "post",
        url: `${rootURL}/refresh`,
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }).then(() => {
        localStorage.setItem("accessToken", response.data.body.access_token);
        localStorage.setItem("refreshToken", response.data.body.refresh_token);
        axios.get(`${rootURL}/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
      });
      responseData = response;
    }
  })
  await $api.get<AuthResponse>(`${rootURL}/me`, {
      headers:{
          Authorization: `Bearer ${accessToken}`
      }
  })
  return responseData
}

export { handleSignUp, handleLogin, getMe };
