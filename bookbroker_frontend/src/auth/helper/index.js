import { API } from "../../backend";
import { cartEmpty } from "../../core/helper/cartHelper";
import axios from "axios";
import { GoogleLogout } from 'react-google-login';


export const fbLogin = async (accesstoken) => {
  let res = await axios.post(
    "http://localhost:8000/rest-auth/facebook/",
    {
      access_token : accesstoken,
    }
  );
  console.log(res);
  return await res.status;
};



export const googleLogin = ({accessToken}) => {

  const formData = new FormData();
  formData.append('access_token', accessToken)

  for (var key of formData.values()) {
    console.log("MYKEY: ", key);
  }

  return fetch(`${API}user/dj-rest-auth/google/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => alert(err));
};



export const signup = (user) => {
  return fetch(`${API}user/register/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    // console.log(user[name]);
    formData.append(name, user[name]);
  }

  // const {email, password} = user;
  // const formData = new FormData();
  // formData.append('email', email)
  // formData.append('password', password)

  for (var key of formData.keys()) {
    console.log("MYKEY: ", key);
  }

  return axios({
    method: "POST",
    url: `${API}user/login/`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      return response.json();
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  // return fetch(`${API}user/login/`, {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((response) => {
  //     console.log("SUCCESS", response);
  //     return response.json();
  //   })
  //   .catch((err) => alert(err));
};

export const social_login = (user) => {
  // const formData = new FormData();
  // for (const name in user) {
  //   // console.log(user[name]);
  //   formData.append(name, user[name]);
  // }

  const {data, userEmail} = user;
  const formData = new FormData();
  formData.append('token', data.key)
  formData.append('userEmail', userEmail)

  for (var key of formData.keys()) {
    console.log("MYKEY: ", key);
  }

  return fetch(`${API}user/login/social/`, {
    method: "POST", 
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => alert(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("authenticationData", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("authenticationData")) {
    return JSON.parse(localStorage.getItem("authenticationData"));
    //TODO: compare authenticationData with database json token
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  console.log("USERID: ", userId);

  if (typeof window !== undefined) {
    localStorage.removeItem("authenticationData");
    cartEmpty(() => {});
    //next();

    return fetch(`${API}user/logout/${userId}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout success");
        next();
      })
      .catch((err) => alert(err));
  }
};
