import Axios from "axios";

const axiosBaseURL = Axios.create({
  baseURL: "https://travel-booking-app-qa3o.onrender.com",
});

export default axiosBaseURL;
