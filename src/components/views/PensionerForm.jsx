import React, { Component } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import NavBar from "../commons/NavBar";
import FormInput from "../commons/FormInput";
import FormTextArea from "../commons/FormTextArea";
import FormOption from "../commons/FormOption";
import FormDate from "../commons/FormDate";
import FormImage from "../commons/FormImage";
import PensionerClient from "../../networks/pensioner";
import { isLoggedIn } from "./HomePage";
import Preloader from "../commons/Preloader";

class PensionerForm extends Component {
  constructor(props) {
    super(props);

    if (!isLoggedIn()) {
      window.location.href = "/";
    }

    const { pensionerID } = this.props.match.params;
    pensionerID && this.fetchPensionerDetails(pensionerID);

    this.state = {
      errors: {},
      isLoading: false,
      pageLoading: pensionerID,
      pensioner: {}
    };
  }

  componentWillReceiveProps() {
    if (this.getFormType() === "Update")
      this.setState({
        errors: {},
        isLoading: false,
        pageLoading: false,
        pensioner: {}
      });
  }

  fetchPensionerDetails = async id => {
    const res = await PensionerClient.fetchSinglePensioner(id);
    this.setState({ pageLoading: false });
    const errors = res.errors;
    if (errors) {
      this.setState({ redirectTo: "/not-found" });
    } else {
      this.setState({ pensioner: res });
    }
  };

  textChanged = e => {
    const { pensioner } = this.state;
    this.setState({
      pensioner: {
        ...pensioner,
        [e.target.name]: e.target.value
      }
    });
  };

  fileSelected = e => {
    const { pensioner } = this.state;
    this.setState({
      ...this.state,
      pensioner: {
        ...pensioner,
        [e.target.name]: e.target.files[0]
      },
      profileImageChanged: true
    });
  };

  submitForm = async e => {
    e.preventDefault();
    const { pensioner, profileImageChanged } = this.state;

    if (!pensioner.profileImage) {
      this.setState({ errors: { profileImage: "Profile Image is required" } });
      return;
    }

    this.setState({ isLoading: true, errors: {} });

    let res;
    let formType = this.getFormType();
    if (formType === "Update") {
      res = await PensionerClient.updatePensioner(
        pensioner,
        profileImageChanged
      );
    } else {
      res = await PensionerClient.createPensioner(pensioner);
    }

    this.setState({ isLoading: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      } else {
        this.setState({ errors });
      }
    } else {
      if (formType === "Update") {
        toast.success("Pensioner Updated Successfully");
      } else {
        toast.success("Pensioner Created Successfully");
      }
      this.setState({ isLoggedIn: true });
    }
  };

  getFormType = () => {
    const { pensionerID } = this.props.match.params;
    return pensionerID ? "Update" : "Create New";
  };

  render() {
    const {
      errors,
      isLoading,
      pageLoading,
      redirectTo,
      pensioner
    } = this.state;
    const {
      fullname,
      email,
      city,
      phone,
      dob,
      acctNum,
      bank,
      gender,
      nextOfKinPhone,
      nextOfKinName,
      address,
      profileImage
    } = pensioner;
    const formType = this.getFormType();

    return (
      <div>
        {redirectTo && <Redirect to={redirectTo} />}
        <NavBar currentPage={formType === "Update" ? -1 : 1} />
        {pageLoading ? (
          <Preloader
            type="page"
            styles="ThreeDots"
            width={80}
            height={80}
            color="blue"
          />
        ) : (
          <div className="pt-24 container mx-auto base-container">
            <div className="w-5/6 md:w-1/2 h-full mx-auto content shadow rounded p-4 bg-gray-100 mb-4">
              <span className="block p-4 font-medium text-xl">
                <center>{formType.toUpperCase()} PENSIONER</center>
              </span>
              <form
                className="form override_form_margin"
                onSubmit={this.submitForm}
              >
                <FormInput
                  title="Full Name"
                  name="fullname"
                  placeholder="Enter your Full Name"
                  onChange={this.textChanged}
                  error={errors.fullname}
                  value={fullname}
                  type="text"
                />
                <FormInput
                  title="Email"
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={this.textChanged}
                  error={errors.email}
                  value={email}
                  type="email"
                />

                <FormInput
                  title="City"
                  name="city"
                  placeholder="Enter your City"
                  onChange={this.textChanged}
                  error={errors.city}
                  value={city}
                  type="text"
                />

                <FormInput
                  title="Phone Number"
                  name="phone"
                  placeholder="Enter your Phone Number"
                  onChange={this.textChanged}
                  error={errors.phone}
                  value={phone}
                  type="number"
                />

                <FormDate
                  title="Date of Birth"
                  onChange={this.textChanged}
                  name="dob"
                  error={errors.dob}
                  value={dob}
                />

                <FormInput
                  title="Account Number"
                  name="acctNum"
                  placeholder="Enter your Account Number"
                  onChange={this.textChanged}
                  error={errors.acctNum}
                  type="number"
                  value={acctNum}
                />

                <FormOption
                  title="Bank"
                  name="bank"
                  onChange={this.textChanged}
                  error={errors.bank}
                  values={[
                    "Ecobank",
                    "UBA",
                    "Union",
                    "GTB",
                    "Stanbic IBTC",
                    "First Bank",
                    "FCMB",
                    "Fidelity"
                  ]}
                  value={bank}
                />

                <FormOption
                  title="Gender"
                  name="gender"
                  onChange={this.textChanged}
                  error={errors.gender}
                  values={["Male", "Female"]}
                  value={gender}
                />

                <FormInput
                  title="Next of Kin's Name"
                  name="nextOfKinName"
                  placeholder="Enter the name of your Next of Kin"
                  onChange={this.textChanged}
                  error={errors.nextOfKinName}
                  value={nextOfKinName}
                  type="text"
                />
                <FormInput
                  title="Next of Kin's Phone Number"
                  name="nextOfKinPhone"
                  placeholder="Enter the Phone Number of your Next of Kin"
                  onChange={this.textChanged}
                  value={nextOfKinPhone}
                  error={errors.nextOfKinPhone}
                  type="number"
                />

                <FormTextArea
                  title="Address"
                  name="address"
                  placeholder="Enter Home Address"
                  onChange={this.textChanged}
                  error={errors.address}
                  value={address}
                />

                <FormImage
                  onChange={this.fileSelected}
                  name="profileImage"
                  value={
                    profileImage ||
                    "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"
                  }
                  error={errors.profileImage}
                />
                <div className="mb-4 mt-4">
                  <button type="submit" className="btn" disabled={isLoading}>
                    {isLoading ? "Loading..." : `${formType} Pensioner`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PensionerForm;
