import axios from "axios";


export default axios.create({
  baseURL: "http://localhost:4101/api",
  headers: {
    "Content-type": "multipart/form-data"
  }
  
});
