import React, { Component } from "react";

class FormTextArea extends Component {
  render() {
    const { name, title, placeholder, onChange, error, value } = this.props;
    return (
      <div className="form-group mb-2">
        <label htmlFor="fullname">{title}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="bg-gray-400"
          value={value || ""}
        />
        {error && (
          <div className="text-red-600 text-xs text-left mt-1">{error}</div>
        )}
      </div>
    );
  }
}

export default FormTextArea;
