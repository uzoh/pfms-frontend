import React, { Component } from "react";
import NavBar from "../commons/NavBar";

export const isLoggedIn = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) return true;
  else return false;
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    if (!isLoggedIn()) {
      window.location.href = "/";
    }
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default HomePage;
