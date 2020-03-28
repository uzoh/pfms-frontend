import React from "react";

const ProfileDetail = props => {
  const { title, answer } = props;
  return (
    <div className="mb-2">
      <span className="text-gray-700 text-sm">{title}:</span>
      <span className="font-medium"> {answer}</span>
    </div>
  );
};

export default ProfileDetail;
