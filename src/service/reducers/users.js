import { ADD_ANSWER_USER, ADD_QUESTION_USER, RECEIVE_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case ADD_ANSWER_USER: {
      const { authedUser, qid, answer } = action;

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    }

    case ADD_QUESTION_USER: {
      const { author, qid } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: [...state[author].questions, qid],
        },
      };
    }

    default:
      return state;
  }
}
