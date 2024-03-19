import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL:'https://travel-booking-app-so1m.onrender.com'
});

export default axiosBaseURL