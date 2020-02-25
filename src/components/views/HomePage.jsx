import React, { Component } from "react";
import NavBar from "../commons/NavBar";
import { setAuthToken } from "../../networks/auth";
import PensionerCard from "../commons/PensionerCard";
import PensionerClient from "../../networks/pensioner";
import Preloader from "../commons/Preloader";

export const isLoggedIn = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    setAuthToken(token);
    return true;
  } else return false;
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    if (!isLoggedIn()) {
      window.location.href = "/";
    }

    this.state = {
      pensioners: [],
      isLoading: true
    };
    this.getAllPensioners();
  }

  getAllPensioners = async () => {
    const pensioners = await PensionerClient.getAll();
    this.setState({ pensioners, isLoading: false });
  };

  render() {
    const { pensioners, isLoading } = this.state;

    const pensionersCards = pensioners.map(pensioner => (
      <PensionerCard
        id={pensioner.id}
        email={pensioner.email}
        fullname={pensioner.fullname}
        profileImage={pensioner.profileImage}
      />
    ));

    return (
      <div>
        <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
          <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            <NavBar />
            {isLoading ? (
              <Preloader
                type="page"
                styles="ThreeDots"
                width={80}
                height={80}
                color="blue"
              />
            ) : (
              <div className="pt-24 container mx-auto">
                <div className="flex flex-col sm:flex-row flex-wrap">
                  {pensionersCards}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
