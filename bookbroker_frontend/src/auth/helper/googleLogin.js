import React from 'react';
import { API } from "../../backend";



export const googleLogin = (accessToken) => {

  // const formData = new FormData();

  // for (const name in user) {
  //   // console.log(user[name]);
  //   formData.append(name, user[name]);
  // }

  // const {email, password} = user;
  const formData = new FormData();
  formData.append('access_token', accessToken)
  // formData.append('password', password)

  for (var key of formData.keys()) {
    console.log("MYKEY: ", key);
  }

  return fetch(`${API}user/dj-rest-auth/google/`, {
    method: "POST",

    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => alert(err));
};


export default googleLogin;