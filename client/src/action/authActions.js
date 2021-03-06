import axios from "axios";
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setJWTToken from '../securityUtils/setJWTToken';


export const register = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push('/login');
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(err) {
        console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const login = loginCredential => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", loginCredential);
        const { token } = res.data;
        localStorage.setItem('token', token);
        setJWTToken(token);

        // decoded user
        const decoded = jwt_decode(token);
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        })
    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}


export const logout = () => dispatch => {
    localStorage.removeItem('token');
    setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
}