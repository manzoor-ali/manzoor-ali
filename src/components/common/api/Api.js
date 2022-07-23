import axios from "axios";

const instance = axios.create({
  baseURL: "https://swapi.dev/", // For Dev
});

export default instance;
