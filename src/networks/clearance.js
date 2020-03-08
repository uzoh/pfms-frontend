import axios from "axios";

class ClearanceClient {
  static submitClearance = async payload => {
    try {
      console.log(payload);
      await axios.post("/clearance", payload);
      return "Success";
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("jwtToken");
          window.location.href = "/";
        }
        const errors = error.response.data.errors;
        return { errors };
      }
    }
  };
}

export default ClearanceClient;
