import React, { Component } from "react";

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
    return <div>WELCOME TO THE HOME PAGE</div>;
  }
}

export default HomePage;
