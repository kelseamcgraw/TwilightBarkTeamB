import axios from 'axios';

const baseurl = 'http://127.0.0.1:3000';

export default axios.create({
    baseURL: baseurl,
    responseType: "json"
});

