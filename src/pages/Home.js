import { connect } from "react-redux";
import UserCard from "./UserCard";
import { Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import { useState } from "react";
import { TabList, TabPanel } from "@mui/lab";
// import React, { useState } from "react";
import PropTypes from "prop-types";

const Home = ({ authedUser, questions, users }) => {
  const [value, setValue] = useState("1");

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="container mx-auto p-2 sm:p-4">
      <TabContext value={value}>
        <div className="tabs-container border-b border-gray-300">
          <TabList onChange={handleChange} aria-label="Question tabs">
            <Tab label="New Questions" value="1" />
            <Tab label="Done" value="2" />
          </TabList>
        </div>
        <TabPanel value="1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {questions.filter(unanswered).map((question) => (
              <div
                key={question.id}
                className="question-item bg-white p-4 rounded-lg shadow-md"
              >
                <UserCard question={question} author={users[question.author]} />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {questions.filter(answered).map((question) => (
              <div
                key={question.id}
                className="question-item bg-white p-4 rounded-lg shadow-md"
              >
                <UserCard question={question} author={users[question.author]} />
              </div>
            ))}
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );  
};

Home.propTypes = {
  authedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      optionOne: PropTypes.shape({
        votes: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      optionTwo: PropTypes.shape({
        votes: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  users: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Home);
