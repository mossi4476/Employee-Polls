import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../service/actions/authedUser";
import "../login.css"; // Import file CSS
import PropTypes from "prop-types";

const users = [
  { id: "nguyentiendung", name: "nguyentiendung", password: "1234567" },
  { id: "sarahedo", name: "Sarah Edo", password: "1234567" },
  { id: "johndoe", name: "John Doe", password: "123123" },
  { id: "zoshikanlu", name: "Zenobia Oshikanlu", password: "pass246" },
];

const Login = ({ dispatch, loggedIn }) => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUserChange = (e) => {
    const user = users.find((u) => u.id === e.target.value);
    setSelectedUser(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser.id || !selectedUser.password) {
      alert("Please select a user!");
      return;
    }
    dispatch(handleLogin(selectedUser.id, selectedUser.password));
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active" data-testid="login-heading">
          Sign In
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <select
            className="fadeIn second"
            value={selectedUser.id}
            onChange={handleUserChange}
            data-testid="user-select"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="submit"
            className="fadeIn fourth"
            value="Log In"
            data-testid="loginBtn"
          />
        </form>
        <div id="formFooter">
          <button
            className="underlineHover"
            onClick={() => alert("Feature not implemented yet")}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);
