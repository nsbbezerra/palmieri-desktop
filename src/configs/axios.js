import axios from "axios";

const ipServ = localStorage.getItem("url");
const portServ = localStorage.getItem("port");

var url;

if (!ipServ && !portServ) {
  url = "not";
} else {
  url = `${ipServ}:${portServ}`;
}

const api = axios.create({
  baseURL: url,
});

export default api;
