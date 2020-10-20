import { types } from "../types";

let initialState = {
  isLoading: false,
  isUserExist: false,
  user: {},
};

function authReducer(auth = initialState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return { ...auth, isLoading: true };
    case types.AUTH_SUCCESS:
      return { ...auth, isLoading: false, isUserExist: true, user: action.user, };
    case types.AUTH_FAILD:
      return { ...auth, isLoading: false };

    // sing out
    case types.SING_OUT:
      return { ...auth, isLoading: false, isUserExist: false, user: {}, };

    default:
      return auth;
  }
}

export default authReducer;
