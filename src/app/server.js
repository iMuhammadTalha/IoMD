import axios from "axios";

export const Base_URL = "http://localhost:3000/";
// export const Base_URL = "http://111.68.101.14:3000/";      //Development & testing

const token = localStorage.getItem('jwtToken');
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Content-Type'] =
    'application/x-www-form-urlencoded';
