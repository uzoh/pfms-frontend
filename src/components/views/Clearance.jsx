import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";
import NavBar from "../commons/NavBar";
import { isLoggedIn } from "../views/HomePage";
import FormInput from "../commons/FormInput";
import ClearanceClient from "../../networks/clearance";
import Preloader from "../commons/Preloader";

class HomePage extends Component {
  constructor(props) {
    super(props);

    const loggedIn = isLoggedIn();
    this.state = {
      isLoggedIn: loggedIn,
      errors: {},
      email: "",
      isLoading: loggedIn,
      imageUrl: "",
      clearances: []
    };

    if (this.state.isLoggedIn) {
      this.fetchPendingClearance();
    }

    this.widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dn4pokov0",
        uploadPreset: "y2xpulok"
      },
      (error, result) => {
        this.checkUploadResult(result);
      }
    );
  }

  fetchPendingClearance = async () => {
    const clearances = await ClearanceClient.fetchPendingClearance();
    this.setState({ ...this.state, clearances, isLoading: false });
  };

  checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      this.setState({ imageUrl: resultEvent.info.secure_url, errors: {} });
    }
  };

  textChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showWidget = () => {
    this.widget.open();
  };

  submitForm = async e => {
    e.preventDefault();
    const { imageUrl, email } = this.state;
    if (imageUrl === "")
      return this.setState({
        errors: { evidence: "Image evidence is required" }
      });
    this.setState({ isLoading: true });

    const res = await ClearanceClient.submitClearance({
      email,
      picture: imageUrl
    });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      } else {
        this.setState({ errors });
      }
    } else {
      toast.success("Clearance submitted successfully");
      this.setState({ ...this.state, email: "", imageUrl: "", errors: {} });
    }
    this.setState({ isLoading: false });
  };

  approveClearance = async ({ pensionerID }) => {
    this.setState({ isLoading: true });
    const res = await ClearanceClient.approveClearance(pensionerID);

    this.setState({ isLoading: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      }
    } else {
      toast.success("Clearance Approved");
      window.location.reload();
    }
  };

  declineClearance = async ({ pensionerID }) => {
    this.setState({ isLoading: true });
    const res = await ClearanceClient.declineClearance(pensionerID);

    this.setState({ isLoading: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      }
    } else {
      toast.success("Clearance Declined");
      window.location.reload();
    }
  };

  constructClearanceCell = (clearance, index) => {
    const { picture, Pensioner } = clearance;
    const { fullname, profileImage } = Pensioner;
    return (
      <div className="bg-gray-300 block w-full m-2 p-2 rounded shadow pointer hover:bg-gray-400 flex items-center">
        <div className="ml-2">{index}.</div>
        <img
          src={profileImage}
          alt="pensioner"
          className="w-8 h-8 rounded-full ml-4"
        />
        <div
          className="w-full ml-4"
          onClick={() => {
            this.showFullPicture(picture);
          }}
        >
          {fullname.toUpperCase()}
        </div>
        <button
          className="bg-green-500 p-2 rounded hover:bg-green-600 mr-4"
          onClick={() => {
            this.approveClearance(clearance);
          }}
        >
          Approve
        </button>
        <button
          className="bg-red-500 p-2 rounded hover:bg-red-600"
          onClick={() => {
            this.declineClearance(clearance);
          }}
        >
          Decline
        </button>
      </div>
    );
  };

  showFullPicture = picture => {
    window.open(picture, "_blank");
  };

  render() {
    const {
      isLoggedIn,
      errors,
      email,
      isLoading,
      imageUrl,
      clearances
    } = this.state;

    let clearanceCells = clearances.map((clearance, index) =>
      this.constructClearanceCell(clearance, index + 1)
    );

    if (clearanceCells.length === 0) {
      clearanceCells = (
        <div className="text-gray-500 text-center w-full">
          There are no pending clearance submissions
        </div>
      );
    }

    return (
      <div className={!isLoggedIn && "bg-blue-600"}>
        <div className="font-sans w-full min-h-screen m-0">
          <div className="font-sans leading-normal tracking-normal">
            {isLoggedIn ? (
              <Fragment>
                <NavBar currentPage={3} showSearch={false} />
                <div className="pt-24 container mx-auto">
                  <div className="flex flex-col sm:flex-row flex-wrap">
                    {isLoading ? (
                      <Preloader
                        type="page"
                        styles="ThreeDots"
                        width={80}
                        height={80}
                        color="blue"
                      />
                    ) : (
                      clearanceCells
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="container mx-auto">
                <div className="text-white text-center text-3xl p-8 font-bold">
                  Pension Funds Management System
                </div>
                <div className="container mx-auto base-container">
                  <div className="w-5/6 md:w-1/2 h-full mx-auto content shadow-lg rounded p-4 bg-gray-100 mb-4">
                    <span className="block p-4 font-medium text-2xl">
                      <center>Clearance Form</center>
                    </span>
                    <form
                      className="form override_form_margin"
                      onSubmit={this.submitForm}
                    >
                      <FormInput
                        title="Email"
                        name="email"
                        placeholder="Enter Email Address"
                        onChange={this.textChanged}
                        error={errors.email}
                        type="email"
                        value={email}
                      />

                      <button
                        className="text-blue-600"
                        onClick={this.showWidget}
                      >
                        Upload Evidence
                      </button>
                      <span className="text-red-500">{errors.evidence}</span>
                      {imageUrl !== "" && (
                        <span>Image Successfully Uploaded</span>
                      )}

                      <div className="mb-4 mt-4">
                        <button
                          type="submit"
                          className="btn"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : `Submit Clearance`}
                        </button>
                      </div>
                    </form>
                  </div>
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
