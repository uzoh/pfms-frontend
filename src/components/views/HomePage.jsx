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
      isLoading: true,
      searchText: ""
    };
    this.getAllPensioners();
  }

  getAllPensioners = async () => {
    const pensioners = await PensionerClient.getAll();
    this.setState({ pensioners, isLoading: false });
  };

  textChanged = e => {
    this.setState({ searchText: e.target.value });
  };

  deletePensionerFromList = id => {
    const newPensioners = this.state.pensioners.filter(
      pensioner => pensioner.id !== id
    );

    this.setState({ pensioners: newPensioners });
  };

  render() {
    const { pensioners, isLoading, searchText } = this.state;

    const pensionersCards = pensioners
      .map(pensioner => (
        <PensionerCard
          id={pensioner.id}
          email={pensioner.email}
          fullname={pensioner.fullname}
          profileImage={pensioner.profileImage}
          removePensionerFromList={this.deletePensionerFromList}
          btnText="Show More"
          showMenuBtn
        />
      ))
      .filter(pensioner => {
        return (
          pensioner.props.fullname.includes(searchText) ||
          pensioner.props.email.includes(searchText)
        );
      });

    return (
      <div>
        <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
          <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            <NavBar
              searchTextChanged={this.textChanged}
              currentPage={0}
              showSearch={true}
            />
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
