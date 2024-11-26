export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_AUTHED_USER = "LOGOUT_AUTHED_USER";

export function setAuthUser(authedUser) {
    return {
        type: SET_AUTHED_USER,
        authedUser,
    };
}

export function logOutUser() {
    return {
        type: LOGOUT_AUTHED_USER,
    };
}

export const handleLogin = (username, password) => (dispatch, getState) => {
    const users = getState().users;

    const authenticatedUser = Object.values(users).find(user => 
        user.id === username && user.password === password
    );

    if (authenticatedUser) {
        dispatch(setAuthUser(authenticatedUser));
    } else {
        alert("Login failed. Please check your username and password.");
    }
};


export function handleLogout() {
    return (dispatch) => {
        return dispatch(logOutUser());
    };
}
