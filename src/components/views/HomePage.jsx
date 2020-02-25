import React, { Component } from "react";
import AuthClient from "../../networks/auth";

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
  logout = () => {
    AuthClient.logout();
  };

  render() {
    let name = "Uzoh";
    return (
      <div>
        <button
          className="text-blue-500 pointer"
          id="logout"
          onClick={this.logout}
        >
          Logout
        </button>
        WELCOME TO THE HOME PAGE
      </div>
    );
  }
}

export default HomePage;
