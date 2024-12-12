import { API } from "../../backend";

export const userAddress = (address) => {
  return fetch(`${API}user/address/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getuserAddress = () => {
  return fetch(`${API}user/address/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
