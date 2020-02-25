import React from "react";
import logo from "../../logo.svg";
import "./App.scss";
import { Login, Register } from "../auth";
import { isLoggedIn } from "./HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);

    if (isLoggedIn()) {
      window.location.href = "/home";
    }

    this.state = {
      isLogginActive: true
    };
  }

  changeState = () => {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }

    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  };

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";

    return (
      <React.Fragment>
        <div className="text-blue-500 text-center text-3xl m-3 font-bold">
          Pension Funds Management System
        </div>
        <div className="App">
          <div className="login">
            <div className="container">
              {isLogginActive && (
                <Login
                  containerRef={ref => (this.current = ref)}
                  changeState={this.changeState}
                />
              )}
              {!isLogginActive && (
                <Register
                  containerRef={ref => (this.current = ref)}
                  changeState={this.changeState}
                />
              )}
            </div>
            <RightSide
              current={current}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
