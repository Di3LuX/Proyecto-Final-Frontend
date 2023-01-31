import axios from "axios";

const token = localStorage.getItem("token");

export const API = "https://proyecto-final-backend-production-caf5.up.railway.app";
// export const API = "http://localhost:3000";


export const httpGet = async (content, target, criteria) => {
  try {
    let res = await axios.get(`${API}/${content}/${target}/${criteria}`, {
      headers: { Authorization: "Bearer " + token },
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

// export const getUsersAdmin = async (token) => {
//   let data = await axios.get(`${API}/users/all`, {
//     headers: {
//       Authorization: "Bearer " + token,
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
