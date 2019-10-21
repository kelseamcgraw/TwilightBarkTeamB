import axios from 'axios';

const baseurl = 'http://192.168.1.23:3000';

export default axios.create({
    baseURL: baseurl,
    responseType: "json"
});

