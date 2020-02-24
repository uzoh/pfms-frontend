import React, { Component } from "react";

class FormInput extends Component {
  render() {
    const { type, name, title, placeholder, onChange, error } = this.props;
    return (
      <div className="form-group mb-2">
        <label htmlFor="fullname">{title}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && (
          <div className="text-red-600 text-xs text-left mt-1">{error}</div>
        )}
      </div>
    );
  }
}

export default FormInput;
