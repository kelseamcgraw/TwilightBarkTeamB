import axios from 'axios';

const baseurl = 'https://twilightbark.duckdns.org';

export default axios.create({
    baseURL: baseurl,
    responseType: "json"
});

