import React, { Component } from "react";
import { toast } from "react-toastify";
import NavBar from "../commons/NavBar";
import Preloader from "../commons/Preloader";
import PensionerCard from "../commons/PensionerCard";
import PensionerClient from "../../networks/pensioner";
import { isLoggedIn } from "../views/HomePage";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPaying: false,
      selectedDetails: {},
      pensioners: []
    };

    if (!isLoggedIn()) {
      window.location.href = "/";
    }
    this.fetchAllPensioners();
  }

  fetchAllPensioners = async () => {
    const pensioners = await PensionerClient.fetchClearedPensioners();
    console.log(pensioners);
    this.setState({
      ...this.state,
      pensioners,
      isLoading: false
    });
  };

  cardClicked = selectedDetails => {
    this.setState({ selectedDetails });
  };

  payBtnClicked = async () => {
    const {
      selectedDetails: { id, amount }
    } = this.state;

    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    this.setState({ isPaying: true });
    const res = await PensionerClient.payPensioner({
      id,
      amount: Number(amount)
    });

    this.setState({ isPaying: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      }
    } else {
      toast.success("Pensioner payment successful");
      window.location.reload();
    }
  };

  textChanged = e => {
    this.setState({
      selectedDetails: {
        ...this.state.selectedDetails,
        amount: e.target.value
      }
    });

    console.log(this.state);
  };

  render() {
    const { isLoading, selectedDetails, isPaying, pensioners } = this.state;
    const { fullname, email, profileImage } = selectedDetails;

    let pensionersCards = pensioners.map(({ pensioner, pensionerID }) => (
      <PensionerCard
        id={pensionerID}
        email={pensioner.email}
        fullname={pensioner.fullname}
        profileImage={pensioner.profileImage}
        removePensionerFromList={this.deletePensionerFromList}
        cardClicked={this.cardClicked}
      />
    ));

    if (pensionersCards.length === 0) {
      pensionersCards = (
        <div className="text-gray-500 text-center w-full">
          There are currently no cleared Pensioners
        </div>
      );
    }

    return (
      <div>
        <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
          <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            <NavBar currentPage={2} showSearch={false} />
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
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full flex flex-wrap">{pensionersCards}</div>
                  {fullname && (
                    <div className="sm:w-full md:w-2/5 bg-gray-200 rounded shadow flex flex-col items-center">
                      <span className="mt-6 font-bold mb-6">
                        Payment Preview
                      </span>
                      <img src={profileImage} alt="payment pensioner" />
                      <span className="mt-4 text-gray-500 text-sm mb-2">
                        Personal Details
                      </span>
                      <span className="font-medium">
                        {fullname.toUpperCase()}
                      </span>
                      <span className="font-light">{email}</span>

                      <span className="mt-4 text-gray-500 text-sm mb-4">
                        Payment Information
                      </span>
                      <input
                        className="p-2 mb-4 w-full"
                        type="number"
                        placeholder="Enter Amount"
                        onChange={this.textChanged}
                      />

                      <button
                        className="bg-green-500 rounded pt-2 pb-2 pl-6 pr-6 mb-6"
                        disabled={isPaying}
                        onClick={this.payBtnClicked}
                      >
                        {isPaying ? "Processing..." : "Pay"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
