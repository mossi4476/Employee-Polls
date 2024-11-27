import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../service/actions/authedUser";
import PropTypes from "prop-types";
import React, { useState } from "react";

const Header = ({ dispatch, authedUserId, avatarURL }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(handleLogout());
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 p-6 shadow-lg rounded-b-xl">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-bold text-2xl tracking-wide" data-testid="heading">
          Employee Polls
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:bg-white hover:text-teal-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={`w-full ${menuOpen ? "block" : "hidden"} lg:block lg:w-auto`}>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-300 mr-4 text-xl cursor-pointer transition-colors"
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-300 mr-4 text-xl cursor-pointer transition-colors"
          >
            Leaderboard
          </Link>
          <Link
            to="/new"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-300 text-xl cursor-pointer transition-colors"
          >
            New
          </Link>
        </div>
      </div>
      <div className="flex items-center mt-4 lg:mt-0 space-x-4">
        <img
          src={avatarURL}
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-white shadow-lg"
        />
        <span className="font-medium text-white" data-testid="userName">
          {authedUserId}
        </span>
        <button
          onClick={onLogout}
          className="text-sm px-4 py-2 leading-none rounded bg-white text-teal-500 hover:bg-teal-500 hover:text-white border border-white transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUserId: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
  avatarURL: authedUser.avatarURL,
});

export default connect(mapStateToProps)(Header);
