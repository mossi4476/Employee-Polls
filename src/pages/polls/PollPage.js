import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../service/actions/questions";

const PollPage = ({ dispatch, authedUser, users, questions }) => {
  const [isVotedOne, setIsVotedOne] = useState(false);
  const [isVotedTwo, setIsVotedTwo] = useState(false);
  const [question, setQuestion] = useState({});
  const [author, setAuthor] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const ques = Object.values(questions).find((ques) => ques.id === id);
    if (ques) {
      setAuthor(users[ques.author]);
      setQuestion(ques);
      setIsVotedOne(ques.optionOne.votes.includes(authedUser.id));
      setIsVotedTwo(ques.optionTwo.votes.includes(authedUser.id));
    }
    if (!authedUser || !ques) {
      navigate("/404");
    }
  }, [authedUser, questions, users, id, navigate]);

  const choiseAnswer = (e, option) => {
    e.preventDefault();
    dispatch(
      handleAddAnswer(question.id, option === "1" ? "optionOne" : "optionTwo")
    );
  };

  const calcVote = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    return (
      ((question[option].votes.length / numberVotesTotal) * 100).toFixed(2) +
      "%"
    );
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {question && author && (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Poll by {author.id}
          </h1>
          <div className="flex justify-center mb-4">
            <img
              src={author.avatarURL}
              alt="Profile"
              className="h-24 w-24 rounded-full border-2 border-gray-300"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Would you rather?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-lg text-center ${
                isVotedOne ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              <p className="font-bold mb-2">{question.optionOne.text}</p>
              {!isVotedOne && !isVotedTwo && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={(e) => choiseAnswer(e, "1")}
                >
                  Vote
                </button>
              )}
              {(isVotedOne || isVotedTwo) && (
                <p className="text-gray-800 font-bold mt-2">
                  Votes: {question.optionOne.votes.length} (
                  {calcVote("optionOne", question)})
                </p>
              )}
            </div>
            <div
              className={`p-4 rounded-lg text-center ${
                isVotedTwo ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              <p className="font-bold mb-2">{question.optionTwo.text}</p>
              {!isVotedOne && !isVotedTwo && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={(e) => choiseAnswer(e, "2")}
                >
                  Vote
                </button>
              )}
              {(isVotedOne || isVotedTwo) && (
                <p className="text-gray-800 font-bold mt-2">
                  Votes: {question.optionTwo.votes.length} (
                  {calcVote("optionTwo", question)})
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return { authedUser, users, questions };
};

export default connect(mapStateToProps)(PollPage);
