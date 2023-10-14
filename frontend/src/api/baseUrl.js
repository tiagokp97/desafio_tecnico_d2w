import axios from 'axios';
let accessToken = localStorage.getItem('access_token');


const baseUrl = axios.create({
    baseURL: 'http://127.0.0.1:5000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`

    },
});

export default baseUrl;