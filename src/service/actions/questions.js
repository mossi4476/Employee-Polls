import {saveQuestion, saveQuestionAnswer} from "../../util/api";
import {addAnswerUser, addQuestionUser} from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function receive(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

function addQuestionAnswer(author, qid, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        author,
        qid,
        answer,
    };
}

export const handleAddQuestion = (firstOption, secondOption) => async (dispatch, getState) => {
    const { authedUser } = getState();

    try {
        const question = await saveQuestion(firstOption, secondOption, authedUser);
        dispatch(addQuestion(question));
        dispatch(addQuestionUser(question));
    } catch (error) {
        console.error("Error adding question:", error);
    }
};


export const handleAddAnswer = (questionId, answer) => async (dispatch, getState) => {
    const { authedUser } = getState();

    try {
        await saveQuestionAnswer(authedUser.id, questionId, answer);
        dispatch(addQuestionAnswer(authedUser.id, questionId, answer));
        dispatch(addAnswerUser(authedUser.id, questionId, answer));
    } catch (error) {
        console.error("Error adding answer:", error);
    }
};

