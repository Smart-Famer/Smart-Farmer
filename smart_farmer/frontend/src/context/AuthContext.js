import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    case "UPDATE":
      return {
        user: {
          details: {
            ...state.user.details,
            ...action.payload.details,
          },
          token: action.payload.token,
        },
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [AuthState, dispatchAuthState] = useReducer(authReducer, null, () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(AuthState));
  }, [AuthState]);

  return (
    <AuthContext.Provider value={{ ...AuthState, dispatchAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
