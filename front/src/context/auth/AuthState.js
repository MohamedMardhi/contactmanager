import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

// CREATE INITIAL STATE
const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState);

    // register user
    const register = async formData => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }

    }
    // load user
    const loadUser = () => {
        console.log('load user');
    }
    // login user
    const loginUser = () => {
        console.log('login user');
    }
    // logout user
    const logoutUser = () => {
        console.log('logout user');
    }
    // clear errors
    const clearErrors = () => dispatch({type: CLEAR_ERRORS})
    return (
        <AuthContext.Provider
        value= {{
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            error: state.error,
            register,
            loadUser,
            loginUser,
            logoutUser,
            clearErrors

        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthState;