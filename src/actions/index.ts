/* eslint-disable no-console */
import axios from 'axios';
import { $api, rootURL } from '../api/http';


const handleSignUp = async (email:string, password:string) => {
  let data = {};
  await $api.post('/sign_up', {
    email,
    password,
  }).then((response) => {
    data = response;
    console.log(response);
  });
  return data;
};

const handleLogin = async (email:string, password:string) => {
  let data = {};
  await $api.post(
    `/login?email=${email}&password=${password}`,
  ).then((response) => {
    if (response.data.status === 'error') {
      console.log(response.data.message);
    } else {
      localStorage.setItem('accessToken', response.data.body.access_token);
      localStorage.setItem('refreshToken', response.data.body.refresh_token);
    }
    data = response;
  });
  return data;
};

const getMe = async (accessToken:string |null, refreshToken:string | null) => {
  let data = {}
  $api.interceptors.response.use((response) => {
    if (response.data.statusCode === 200) {
      data = response;
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
      data = response;
    }
  })
  await $api.get(`${rootURL}/me`, {
      headers:{
          Authorization: `Bearer ${accessToken}`
      }
  })
  return data
}

export { handleSignUp, handleLogin, getMe };
