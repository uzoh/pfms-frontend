import React, { Component } from "react";

class FormOption extends Component {
  render() {
    const { name, title, onChange, error, values } = this.props;
    return (
      <div className="form-group mb-4 mt-2 flex flex-inline">
        <label htmlFor="fullname">{title}</label>
        <select onChange={onChange} name={name}>
          <option selected disabled>
            Select an option...
          </option>
          {values.map(item => (
            <option>{item}</option>
          ))}
        </select>
        {error && (
          <div className="text-red-600 text-xs text-left mt-1">{error}</div>
        )}
      </div>
    );
  }
}

export default FormOption;
