import { GET_BACKLOG_PTS, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from '../action/types';

const initialState = {
    project_tasks: [],
    project_task: {}
}

export default (state=initialState, action) => {
    switch(action.type) {
        case GET_BACKLOG_PTS:
            return {
                ...state,
                project_tasks: action.payload
            }
        case GET_PROJECT_TASK:
            return {
                ...state,
                project_task: action.payload
            }
        case DELETE_PROJECT_TASK:
            return {
                ...state,
                project_tasks: state.project_tasks.filter(project_task => project_task.projectSequence !== action.payload)
            }
        default:
            return state
    }
}