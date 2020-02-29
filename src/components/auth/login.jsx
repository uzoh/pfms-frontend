import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import AuthClient from "../../networks/auth";
import loginImg from "../../images/login.svg";
import FormInput from "../commons/FormInput";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggednIn: false,
      isLoading: false,
      errors: {}
    };
  }

  loginPress = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ isLoading: true, errors: {} });
    const res = await AuthClient.login({
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
      toast.success("Login Successful");
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
    const { isLoggedIn, errors, isLoading, email, password } = this.state;
    return (
      <Fragment>
        {isLoggedIn ? (
          <Redirect to={{ pathname: "/home" }} />
        ) : (
          <form onSubmit={this.loginPress}>
            <div className="base-container" ref={this.props.containerRef}>
              <div className="header">Login</div>
              <div className="content">
                <div className="image">
                  <img src={loginImg} alt="login" />
                </div>

                <div className="form">
                  <FormInput
                    title="Email"
                    name="email"
                    placeholder="Enter Email Address"
                    onChange={this.textChanged}
                    error={errors.email}
                    type="email"
                    value={email}
                  />

                  <FormInput
                    title="Password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={this.textChanged}
                    error={errors.password}
                    type="password"
                    value={password}
                  />
                </div>
              </div>
              <div>
                Don't have an account?{" "}
                <span className="text-blue-500 pointer" onClick={changeState}>
                  Register
                </span>
              </div>
              <div className="footer">
                <button type="submit" className="btn" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        )}
      </Fragment>
    );
  }
}
