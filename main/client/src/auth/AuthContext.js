import { createContext, useEffect, useReducer } from "react";
import { isValidToken } from "../utils/jwt";
import apiService from "../api/axios";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT_SUCCESS = "AUTH.LOGOUT_SUCCESS";
// const UPDATE_SUCCESS = "AUTH.UPDATE_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.currentUser,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // case UPDATE_SUCCESS:
    //   const { firstName, lastName, coverUrl } = action.payload;
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       firstName,
    //       lastName,
    //       coverUrl,
    //     },
    //   };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  // console.log({ inSetSession: accessToken });
  if (accessToken) {
    //valid accessToken, then save it to localStorage
    window.localStorage.setItem("accessToken", accessToken);
    //also add it to Authorization of axios api call
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // console.log(apiService.defaults.headers.common.Authorization);
  } else {
    //if not, remove and delete any previous token
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // updatedProfile

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data.user;
          // console.log(user);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        console.log(error);
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    console.log({ email, password });
    const response = await apiService.post("/auth/login", { email, password });
    const { currentUser, accessToken } = response.data;
    // console.log(response);
    // console.log(currentUser);
    // console.log(accessToken);
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { currentUser },
    });
    callback();
    // console.log("didnt return callback");
  };

  const register = async ({ email, password }, callback) => {
    const response = await apiService.post("/users", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = async (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT_SUCCESS });
    callback();
  };

  // useEffect(() => {}, [updatedProfile])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
