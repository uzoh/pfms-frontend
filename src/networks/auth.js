import axios from "axios";

axios.defaults.baseURL = "https://pfms-backend.herokuapp.com/api/v1/";
// axios.defaults.baseURL = "http://localhost:5000/api/v1";

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

class AuthClient {
  static register = async data => {
    try {
      const res = await axios.post("/auth/register", data);
      const response = res.data.payload;

      const { token } = response;
      localStorage.setItem("jwtToken", token);

      const { id, email, fullname } = response;
      const user = {
        id,
        fullname,
        email
      };
      setAuthToken(token);

      return user;
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

export default AuthClient;
