import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS } from './types';

export const createProject = (project, history) => async dispatch => {
    try {
        const res = await axios.post(
            "http://localhost:8080/api/project", project
        );
        console.log(res);
        history.push('/dashboard')
    } catch(err) {
        console.log(err.response);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProjects = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/project/projects");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
}