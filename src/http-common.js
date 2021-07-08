import axios from "axios";


export default axios.create({
  // baseURL: "http://localhost:4101/api",
  baseURL: "/api",
  headers: {
    "Content-type": "multipart/form-data"
  }
  
});
