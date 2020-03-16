import axios from "axios";

class ClearanceClient {
  static submitClearance = async payload => {
    try {
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

  static fetchPendingClearance = async () => {
    try {
      const res = await axios.get("/clearance");
      return res.data.payload;
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

  static approveClearance = async pensionerID => {
    try {
      await axios.post(`/clearance/${pensionerID}`);
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

  static declineClearance = async pensionerID => {
    try {
      await axios.delete(`/clearance/${pensionerID}`);
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
