
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import history from '../history';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password }){
    return (dispatch) => {
        axios.post(`${ROOT_URL}/auth/signin`, {email, password })
        .then(response => {
            
            dispatch({ type: AUTH_USER });

            localStorage.setItem('token', response.data.token);
            
            history.push('/feature');

        })
        .catch(err => {
            dispatch(authError('Bad login info'));
        });
    };
};

export function signupUser({email, password }){
    return (dispatch) => {
        axios.post(`${ROOT_URL}/auth/signup`, {email, password })
        .then(response => {
            
            dispatch({ type: AUTH_USER });

            localStorage.setItem('token', response.data.token);
            
            history.push('/feature');

        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(authError(err.response.data.error));
        });
    };
};

export function signoutUser(){

    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export function fetchMessage(){
    return function(dispatch){
       axios.get(`${ROOT_URL}/api/code`, {
           headers: { authorization: localStorage.getItem('token') }
       }).then((response)=>{
           console.log(response.data.message);
           dispatch({
               type: FETCH_MESSAGE,
               payload: response.data.message
           })
       })
    }
}