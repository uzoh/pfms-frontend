import React, { Component } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import classNames from "classnames";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import menuImage from "../../images/menuIcon.png";
import PensionerClient from "../../networks/pensioner";

class PensionerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  deleteBtnClicked = id => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this Pensioner?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.deletePensioner(id);
          }
        },
        {
          label: "No",
          onClick: onclose
        }
      ]
    });
  };

  deletePensioner = async id => {
    this.setState({ isLoading: true });
    const res = await PensionerClient.deletePensioner(id);
    this.setState({ isLoading: false });
    const errors = res.errors;
    if (errors) {
      if (errors.global) {
        toast.error(errors.global);
      } else {
        this.setState({ errors });
      }
    } else {
      toast.success("Pensioner Deleted Successfully");
      this.props.removePensionerFromList(id);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { profileImage, fullname, email, id } = this.props;
    const { isLoading } = this.state;

    return (
      <div
        className={classNames("sm:w-1/4 p-2 relative", {
          "opacity-50": isLoading
        })}
      >
        <img
          src={menuImage}
          alt="Menu button"
          className="absolute right-0 top-0 mr-2 mt-4 w-8 pointer menu-btn"
        />
        <div className="w-20 text-center shadow rounded pointer absolute position-right right-0 bg-white top-0 mt-12 tooltip hidden">
          <Link to={`/edit-pensioner/${id}`}>
            <div className="hover:bg-gray-300 p-2">Edit</div>
          </Link>
          <div
            className="text-red-600 hover:bg-gray-300 p-2"
            onClick={() => {
              this.deleteBtnClicked(id);
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
  }
}

export default PensionerCard;
