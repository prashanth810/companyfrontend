import axios from 'axios';

const HttpCliennt = axios.create({
    baseURL: "https://companylist-tkai.onrender.com/api/auth"
})

export default HttpCliennt;