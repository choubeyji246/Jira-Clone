import axios from "axios";

const getResponse = async (method, url, data) => {
  //console.log(method,url, data, headers);
  console.log(url);
  const token = localStorage.getItem("token");
  const response = await axios({
    method: method,
    url: url,
    data: data,
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  return response;
};
export default getResponse;
