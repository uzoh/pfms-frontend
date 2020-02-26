import React, { Component } from "react";
import { toast } from "react-toastify";
import NavBar from "../commons/NavBar";
import FormInput from "../commons/FormInput";
import FormTextArea from "../commons/FormTextArea";
import FormOption from "../commons/FormOption";
import FormDate from "../commons/FormDate";
import FormImage from "../commons/FormImage";
import PensionerClient from "../../networks/pensioner";
import { isLoggedIn } from "../views/HomePage";

class NewPensionerForm extends Component {
  constructor(props) {
    super(props);

    if (!isLoggedIn()) {
      window.location.href = "/";
    }

    this.state = {
      errors: {},
      isLoading: false,
      pensioner: {}
    };
  }

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
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
      pensioner: {
        ...pensioner,
        [e.target.name]: e.target.files[0]
      }
    });
  };

  submitForm = async e => {
    e.preventDefault();
    const { pensioner, profileImage } = this.state;

    if (!profileImage) {
      this.setState({ errors: { profileImage: "Profile Image is required" } });
      return;
    }

    this.setState({ isLoading: true, errors: {} });
    const res = await PensionerClient.createPensioner(pensioner);

    this.setState({ isLoading: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      } else {
        this.setState({ errors });
      }
    } else {
      toast.success("Pensioner Created Successfully");
      this.setState({ isLoggedIn: true });
    }
  };

  render() {
    const { errors, isLoading } = this.state;
    return (
      <div>
        <NavBar currentPage={1} />
        <div className="pt-24 container mx-auto base-container">
          <div className="w-5/6 md:w-1/2 h-full mx-auto content shadow rounded p-4 bg-gray-100 mb-4">
            <span className="block p-4 font-medium text-xl">
              <center>CREATE NEW PENSIONER</center>
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
                type="text"
              />
              <FormInput
                title="Email"
                name="email"
                placeholder="Enter Email Address"
                onChange={this.textChanged}
                error={errors.email}
                type="email"
              />

              <FormInput
                title="City"
                name="city"
                placeholder="Enter your City"
                onChange={this.textChanged}
                error={errors.city}
                type="text"
              />

              <FormInput
                title="Phone Number"
                name="phone"
                placeholder="Enter your Phone Number"
                onChange={this.textChanged}
                error={errors.phone}
                type="number"
              />

              <FormDate
                title="Date of Birth"
                onChange={this.textChanged}
                name="dob"
                error={errors.dob}
              />

              <FormInput
                title="Account Number"
                name="acctNum"
                placeholder="Enter your Account Number"
                onChange={this.textChanged}
                error={errors.acctNum}
                type="number"
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
              />

              <FormOption
                title="Gender"
                name="gender"
                onChange={this.textChanged}
                error={errors.gender}
                values={["Male", "Female"]}
              />

              <FormInput
                title="Next of Kin's Name"
                name="nextOfKinName"
                placeholder="Enter the name of your Next of Kin"
                onChange={this.textChanged}
                error={errors.nextOfKinName}
                type="text"
              />
              <FormInput
                title="Next of Kin's Phone Number"
                name="nextOfKinPhone"
                placeholder="Enter the Phone Number of your Next of Kin"
                onChange={this.textChanged}
                error={errors.nextOfKinPhone}
                type="number"
              />

              <FormTextArea
                title="Address"
                name="address"
                placeholder="Enter Home Address"
                onChange={this.textChanged}
                error={errors.address}
              />

              <FormImage
                imageUrl={
                  this.state.profileImage ||
                  "https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png"
                }
                onChange={this.fileSelected}
                name="profileImage"
                error={errors.profileImage}
              />
              <div className="mb-4 mt-4">
                <button type="submit" className="btn" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Create Pensioner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPensionerForm;
