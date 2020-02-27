import React from "react";
import { Link } from "react-router-dom";

const PensionerCard = props => {
  const { profileImage, fullname, email, id } = props;

  return (
    <div className="sm:w-1/4 p-2">
      <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
        <div className="mb-3">
          <img
            className="w-auto mx-auto rounded-full h-40"
            src={profileImage}
            alt="pensioner profile"
          />
        </div>
        <h2 className="text-xl font-medium text-gray-700">
          {fullname.toUpperCase()}
        </h2>
        <span className="text-blue-500 block mb-5">{email}</span>

        <Link
          to={`pensioner/${id}`}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default PensionerCard;
