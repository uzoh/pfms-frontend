import React, { Component, Fragment } from "react";
import NavBar from "../commons/NavBar";
import Preloader from "../commons/Preloader";
import PensionerClient from "../../networks/pensioner";
import { isLoggedIn } from "../views/HomePage";
import ProfileCard from "../commons/ProfileCard";
import ProfileDetail from "../commons/ProfileDetail";

const convertISOToReadableDate = isoformat => {
  const readable = new Date(isoformat);
  const m = readable.getMonth();
  const d = readable.getDay();
  const y = readable.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const mlong = months[m];
  return mlong + " " + d + ", " + y;
};

class SinglePensioner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      pensioner: {},
      histories: [],
      current: 0
    };

    if (!isLoggedIn()) {
      window.location.href = "/";
    }

    this.fetchPensionerDetails();
    this.fetchPaymentHistory();
  }

  fetchPensionerDetails = async () => {
    const { pensionerID } = this.props.match.params;
    const pensioner = await PensionerClient.getSpecificPensioner(pensionerID);
    this.setState({ isLoading: false, pensioner });
  };

  fetchPaymentHistory = async () => {
    const { pensionerID } = this.props.match.params;
    const histories = await PensionerClient.getPaymentHistory(pensionerID);
    this.setState({ histories });
  };

  cardClicked = index => {
    this.setState({ current: index });
  };

  render() {
    const { isLoading, pensioner, histories, current } = this.state;
    const {
      fullname,
      email,
      profileImage,
      address,
      city,
      phone,
      dob,
      gender,
      acctNum,
      bank,
      nextOfKinName,
      nextOfKinPhone
    } = pensioner;

    const historyCards = histories.map(history => (
      <div>
        <ProfileDetail title="Account Number" answer={history.accountNumber} />
        <ProfileDetail title="Bank" answer={history.bank} />
        <ProfileDetail title="Amount" answer={history.amount} />
        <ProfileDetail
          title="Date"
          answer={convertISOToReadableDate(history.createdAt)}
        />
        <hr className="mb-4 mt-4" />
      </div>
    ));

    return (
      <div>
        <div className="bg-gray-100 font-sans w-full min-h-screen m-0">
          <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            <NavBar currentPage={-1} showSearch={false} />
            {isLoading ? (
              <Preloader
                type="page"
                styles="ThreeDots"
                width={80}
                height={80}
                color="blue"
              />
            ) : (
              <div className="pt-24 container mx-auto md:w-1/2">
                <div className="p-6 flex flex-col items-center">
                  <img
                    src={profileImage}
                    alt="profile"
                    className="w-32 h-32 rounded-full"
                  />
                  <div className="mt-2 font-medium text-lg">
                    {fullname.toUpperCase()}
                  </div>
                  <div className="mt-2 font-medium">{email}</div>
                </div>

                <ProfileCard
                  title="Personal Information"
                  index={0}
                  cardClicked={this.cardClicked}
                >
                  {current === 0 && (
                    <Fragment>
                      <ProfileDetail title="Phone Number" answer={phone} />
                      <ProfileDetail title="Gender" answer={gender} />
                      <ProfileDetail
                        title="Date of Birth"
                        answer={convertISOToReadableDate(dob)}
                      />
                      <ProfileDetail title="City" answer={city} />
                      <ProfileDetail title="Address" answer={address} />
                    </Fragment>
                  )}
                </ProfileCard>

                <ProfileCard
                  title="Account Information"
                  index={1}
                  cardClicked={this.cardClicked}
                >
                  {current === 1 && (
                    <Fragment>
                      <ProfileDetail title="Account Number" answer={acctNum} />
                      <ProfileDetail title="Bank Name" answer={bank} />
                    </Fragment>
                  )}
                </ProfileCard>

                <ProfileCard
                  title="Next of Kin Information"
                  index={2}
                  cardClicked={this.cardClicked}
                >
                  {current === 2 && (
                    <Fragment>
                      <ProfileDetail title="Full Name" answer={nextOfKinName} />
                      <ProfileDetail
                        title="Phone Number"
                        answer={nextOfKinPhone}
                      />
                    </Fragment>
                  )}
                </ProfileCard>

                <ProfileCard
                  title="Payment History"
                  index={3}
                  cardClicked={this.cardClicked}
                >
                  {current === 3 && historyCards}
                </ProfileCard>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePensioner;
