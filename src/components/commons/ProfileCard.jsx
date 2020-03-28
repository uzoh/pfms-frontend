import React from "react";

const ProfileCard = props => {
  const { title, index, cardClicked } = props;
  return (
    <div
      className="rounded p-6 shadow-md mb-8 pointer"
      onClick={() => cardClicked(index)}
    >
      <center className="text-gray-600 mb-4">{title}</center>
      {props.children}
    </div>
  );
};

export default ProfileCard;
