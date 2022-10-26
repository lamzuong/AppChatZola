import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    // user: JSON.parse(localStorage.getItem('user')) || null,
    user: null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    // const now = new Date();

    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(state.user));
    //     localStorage.setItem('expiry', JSON.stringify(now.getTime()) + 10);
    // }, [state.user]);

    // if (now.getTime() > JSON.parse(localStorage.getItem('expiry'))) {
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('expiry');
    // }
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
