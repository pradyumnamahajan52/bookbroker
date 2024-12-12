import { API } from "../../backend";

export const getProduct = (id) => {
  return fetch(`${API}product/${id}/`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
