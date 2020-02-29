import React, { Component } from "react";

class FormDate extends Component {
  render() {
    const { name, title, onChange, error, value } = this.props;
    var date = (value || "").split("T");
    return (
      <div className="form-group mb-2 flex flex-inline">
        <label htmlFor="fullname">{title}</label>
        <input
          type="date"
          name={name}
          max="2010-01-31"
          onChange={onChange}
          value={date[0] || ""}
        />
        {error && (
          <div className="text-red-600 text-xs text-left mt-1">{error}</div>
        )}
      </div>
    );
  }
}

export default FormDate;
