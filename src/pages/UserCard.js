import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UserCard = ({ question, author }) => {
  return (
    <div className="m-4 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-w-md mx-auto flex items-center space-x-4">
      <div className="shrink-0">
        <img
          className="h-16 w-16 rounded-full border-4 border-white shadow-md"
          src={author?.avatarURL}
          alt={author?.name}
        />
      </div>
      <div className="flex-grow overflow-hidden">
        <div className="text-xl font-semibold text-white truncate">
          {question.author}
        </div>
        <p className="text-sm text-gray-200 italic">
          {new Date(question.timestamp).toDateString()}
        </p>
      </div>
      <Link
        to={`/questions/${question.id}`}
        className="bg-white text-indigo-700 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 hover:text-white transition-colors flex items-center space-x-2"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.293 9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L15.586 15H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z" />
        </svg>
        <span>Show</span>
      </Link>
    </div>
  );
  
};

export default connect()(UserCard);
