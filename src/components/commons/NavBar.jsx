import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import AuthClient from "../../networks/auth";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarActive: false,
      searchActive: false
    };
  }

  logout = () => {
    AuthClient.logout();
  };

  toggleSearchBar = () => {
    const { searchActive } = this.state;
    this.setState({ searchActive: !searchActive });
  };

  toggleNavbar = () => {
    const { navbarActive } = this.state;
    this.setState({ navbarActive: !navbarActive });
  };

  render() {
    const { searchActive, navbarActive } = this.state;
    const { searchTextChanged, currentPage, showSearch } = this.props;
    return (
      <nav id="header" className="fixed w-full z-50">
        <div className="relative w-full z-10 fixed top-0 bg-gray-200 border-b border-grey-light">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-4">
            <div className="pl-4 flex items-center">
              <svg
                className="h-5 pr-3 fill-current text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M17.94 11H13V9h4.94A8 8 0 0 0 11 2.06V7H9V2.06A8 8 0 0 0 2.06 9H7v2H2.06A8 8 0 0 0 9 17.94V13h2v4.94A8 8 0 0 0 17.94 11zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
              </svg>
              <Link
                to="/home"
                className="text-blue-500 text-base no-underline hover:no-underline font-extrabold text-xl"
              >
                PFMS
              </Link>
              {showSearch && (
                <div
                  id="search-toggle"
                  className="search-icon cursor-pointer pl-6"
                  onClick={this.toggleSearchBar}
                >
                  <svg
                    className="fill-current pointer-events-none text-grey-darkest w-4 h-4 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                  </svg>
                </div>
              )}
            </div>

            <div className="pr-4">
              <button
                id="nav-toggle"
                onClick={this.toggleNavbar}
                className="block lg:hidden flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-black hover:border-purple appearance-none focus:outline-none"
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </button>
            </div>

            <div
              className={classNames(
                "w-full flex-grow lg:flex lg:flex-1 lg:content-center lg:justify-end lg:w-auto lg:block mt-2 lg:mt-0 z-20",
                {
                  hidden: !navbarActive,
                  "pl-4": navbarActive
                }
              )}
              id="nav-content"
            >
              <ul className="list-reset lg:flex justify-end items-center">
                <li className="mr-3 py-2 lg:py-0">
                  <Link
                    to="/new-pensioner"
                    className={classNames(
                      "text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4",
                      {
                        "text-blue-600": currentPage === 1
                      }
                    )}
                  >
                    New Pensioner
                  </Link>
                </li>
                <li className="mr-3 py-2 lg:py-0">
                  <Link
                    to="/payment"
                    className={classNames(
                      "text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4",
                      {
                        "text-blue-600": currentPage === 2
                      }
                    )}
                  >
                    Payment
                  </Link>
                </li>
                <li className="mr-3 py-2 lg:py-0">
                  <Link
                    to="/clearance"
                    className={classNames(
                      "text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4",
                      {
                        "text-blue-600": currentPage === 3
                      }
                    )}
                  >
                    Clearance
                  </Link>
                </li>
                <li className="mr3 py-2 lg:py-0">
                  <span
                    className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600 pointer"
                    onClick={this.logout}
                  >
                    Logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={classNames("relative w-full bg-white shadow-xl", {
            hidden: !searchActive
          })}
          id="search-content"
        >
          <div className="container mx-auto py-4 text-black">
            <input
              id="searchfield"
              type="search"
              placeholder="Search for Pensioner..."
              autoFocus
              onChange={searchTextChanged}
              className="w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl"
            />
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
