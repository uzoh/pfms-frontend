import axios from "axios";
import { cloudinaryAxios } from "../components/App";

const uploadImage = async file => {
  try {
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dn4pokov0/upload";
    const CLOUDINARY_UPLOAD_PRESET = "y2xpulok";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await cloudinaryAxios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: formData
    });
    return res.data.secure_url;
  } catch (error) {
    console.log(error);
    return "";
  }
};

class PensionerClient {
  static getAll = async () => {
    try {
      const res = await axios.get("/pensioners");
      return res.data.payload.reverse();
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

  static createPensioner = async pensioner => {
    try {
      const profileImageUrl = await uploadImage(pensioner.profileImage);

      if (profileImageUrl === "")
        return { errors: { global: "Error uploading Image" } };

      pensioner.profileImage = profileImageUrl;
      await axios.post("/pensioners", pensioner);

      window.location.reload();
      return { message: "Success" };
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

  static updatePensioner = async (pensioner, profileImageChanged) => {
    try {
      if (profileImageChanged) {
        const profileImageUrl = await uploadImage(pensioner.profileImage);

        if (profileImageUrl === "")
          return { errors: { global: "Error uploading Image" } };

        pensioner.profileImage = profileImageUrl;
      }

      await axios.put(`/pensioners/${pensioner.id}`, pensioner);
      return { message: "Success" };
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

  static fetchSinglePensioner = async pensionerId => {
    try {
      const res = await axios.get(`/pensioners/${pensionerId}`);
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
