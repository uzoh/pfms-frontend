import React from "react";
import { Link } from "react-router-dom";
import menuImage from "../../images/menuIcon.png";

const deletePensioner = id => {
  console.log("The pensioner with ID: " + id + " will be deleted");
};

const PensionerCard = props => {
  const { profileImage, fullname, email, id } = props;

  return (
    <div className="sm:w-1/4 p-2 relative">
      <img
        src={menuImage}
        alt="Menu button"
        className="absolute right-0 top-0 mr-2 mt-4 w-8 pointer menu-btn"
      />
      <div className="w-20 text-center shadow rounded pointer absolute position-right right-0 bg-white top-0 mt-12 tooltip hidden">
        <Link to={`/edit-pensioner/${id}`}>
          <div className="hover:bg-gray-300">Edit</div>
        </Link>
        <div
          className="text-red-600 hover:bg-gray-300"
          onClick={() => {
            deletePensioner(id);
          }}
        >
          Delete
        </div>
      </div>
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
