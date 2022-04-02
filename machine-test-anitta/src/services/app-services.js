import axios from "axios";

const tokenStr =
  "5d820860359195f5be7dcd70ce78bcd8e95d5f5042978d16983766a143808c36";
const headers = { Authorization: `Bearer ${tokenStr}` };
const URLV1 = "https://gorest.co.in/public/v1/users";
const URLV2 = "https://gorest.co.in/public/v2/users";

export const getUserData = async ({ pageNumber = 1, url = null }) => {
  const { data } = await axios.get(url ? url : `${URLV1}?page=${pageNumber}`, {
    headers,
  });
  return data;
};

export const postUserData = async (postData) => {
  const res = await axios.post(URLV2, postData, {
    headers,
  });
  return res;
};
