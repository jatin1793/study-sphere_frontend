import axios from 'axios';

const baseUrl = axios.create({
    baseURL: "https://study-sphere-jeli.onrender.com",
});

export default baseUrl;