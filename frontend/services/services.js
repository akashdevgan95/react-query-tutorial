import axios from "axios";

const baseURL = "http://localhost:1337/api";

export const generateCustomer = () => {
  return axios(`https://randomuser.me/api/`);
};

export const getCustomers = () => {
  return axios(`${baseURL}/customers`);
};

export const addCustomer = (data) => {
  return axios({
    method: "post",
    url: `${baseURL}/customers`,
    headers: {},
    data: {
      data,
    },
  });
};

export const editCustomer = (data) => {
  return axios({
    method: "put",
    url: `${baseURL}/customers/${data.id}`,
    headers: {},
    data: {
      data,
    },
  });
};
