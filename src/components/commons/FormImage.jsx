import React, { Component, Fragment } from "react";

class FormImage extends Component {
  render() {
    const { name, onChange, error, value } = this.props;
    let imageUrl = value;
    if (value.name) {
      imageUrl = URL.createObjectURL(value);
    }
    return (
      <Fragment>
        <img
          src={imageUrl}
          id="office-img-preview"
          alt="Profile"
          className="w-32 h-32 mt-4 rounded-full"
        />
        <input
          type="file"
          accept="image/x-png,image/jpeg"
          className="mb-4 mt-2"
          onChange={onChange}
          name={name}
        />
        {error && (
          <div className="text-red-600 text-xs text-left mt-1">{error}</div>
        )}
      </Fragment>
    );
  }
}

export default FormImage;
