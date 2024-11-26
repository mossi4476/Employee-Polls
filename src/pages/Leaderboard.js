import {connect} from "react-redux";

const Leaderboard = ({users}) => {
    return (
        <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b border-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Answered
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-center">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                          {user.name[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold truncate">{user.name}</span>
                          <br />
                          <span className="text-gray-500 text-sm truncate">{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {Object.keys(user.answers).length}
                    </td>
                    <td className="px-6 py-4 text-center font-medium">
                      {user.questions.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      
    
};

const mapStateToProps = ({users}) => ({
    users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);
