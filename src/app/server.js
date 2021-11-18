import axios from "axios";

// export const Base_URL = "http://localhost:3000/";
export const Base_URL = "http://111.68.101.20:3000/";      //SEECS Server

const token = localStorage.getItem('jwtToken');
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';
