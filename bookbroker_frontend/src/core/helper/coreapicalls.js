import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}product/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const AddSellerProducts = (product) => {
  return fetch(`${API}product/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
