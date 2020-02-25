import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import loginImg from "../../login.svg";
import AuthClient from "../../networks/auth";
import FormInput from "../commons/FormInput";

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errors: {},
      isLoggedIn: false
    };
  }

  registerPress = async e => {
    e.preventDefault();
    const { fullname, email, password } = this.state;
    this.setState({ isLoading: true, errors: {} });
    const res = await AuthClient.register({
      fullname,
      email,
      password
    });

    this.setState({ isLoading: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      } else {
        this.setState({ errors });
      }
    } else {
      toast.success("Registration Successful");
      this.setState({ isLoggedIn: true });
    }
  };
  textChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { changeState } = this.props;
    const { isLoading, errors, isLoggedIn } = this.state;

    return (
      <Fragment>
        {isLoggedIn ? (
          <Redirect to={{ pathname: "/home" }} />
        ) : (
          <form onSubmit={this.registerPress}>
            <div className="base-container" ref={this.props.containerRef}>
              <div className="header">Register</div>
              <div className="content">
                <div className="image">
                  <img src={loginImg} alt="registration" />
                </div>
                <div className="form">
                  <FormInput
                    title="Full Name"
                    name="fullname"
                    placeholder="Enter Full Name"
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
                    title="Password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={this.textChanged}
                    error={errors.password}
                    type="password"
                  />
                </div>
              </div>
              <div>
                Already have an account?{" "}
                <span className="text-blue-500 pointer" onClick={changeState}>
                  Login
                </span>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="btn"
                  onClick={this.registerPress}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        )}
      </Fragment>
    );
  }
}
