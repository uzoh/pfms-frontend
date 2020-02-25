import axios from "axios";

class PensionerClient {
  static getAll = async () => {
    try {
      const res = await axios.get("/pensioners");
      return res.data.payload;
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          // the user's token has expired, redirect to login page
          localStorage.removeItem("jwtToken");
          window.location.href = "/";
        }
        const errors = error.response.data.errors;
        return { errors };
      }
    }
  };
}

export default PensionerClient;
