import axios from "axios";

const jwt = localStorage.getItem("jwt");

export const API = "http://localhost:3000";


export const httpGet = async (content, target, criteria) => {
  try {
    let res = await axios.get(`${API}/${content}/${target}/${criteria}`, {
      headers: { Authorization: "Bearer " + jwt },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const httpGet2 = async (content, target, criteria, json) => {
  try {
    let res = await axios.get(`${API}/${content}/${target}/${criteria}`, {
      headers: { Authorization: "Bearer " + json },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// export const getUsersAdmin = async (jwt) => {
//   let data = await axios.get(`${API}/users/all`, {
//     headers: {
//       Authorization: "Bearer " + jwt,
//     },
//   });
//   return data;
// };

// export const httpGetAdmin = async (content, target, json) => {
//   try {
//     let res = await axios.get(`${API}/${content}/${target}`, {
//       headers: { Authorization: "Bearer " + json },
//     });
//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
