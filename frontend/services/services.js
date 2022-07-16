import axios from "axios";

const baseURL = "http://localhost:1337/api";

export const delay = (time = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const generateCustomer = () => {
  return axios(`https://randomuser.me/api/`);
};

export const getCustomers = async () => {
  // await delay(5000);
  return axios(`${baseURL}/customers`);
};

export const addCustomer = async (data) => {
  //await delay(3000);
  return axios({
    method: "post",
    url: `${baseURL}/customers`,
    headers: {},
    data: {
      data,
    },
  });
};

export const editCustomer = async (data) => {
  // await delay(5000);
  return axios({
    method: "put",
    url: `${baseURL}/customers/${data.id}`,
    headers: {},
    data: {
      data,
    },
  });
};

export const deleteCustomer = async (id) => {
  //await delay(5000);
  return axios({
    method: "delete",
    url: `${baseURL}/customers/${id}`,
    headers: {},
  });
};
