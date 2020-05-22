import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from "jwt-decode";

import store from './store';
import Landing from './components/Layout/Landing';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import ProtectedRoute from './securityUtils/ProtectedRoute';

import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './action/types';
import { logout } from './action/authActions';

import './App.css';


const token = localStorage.getItem('token');
if (token) {
	setJWTToken(token);
	const decoded = jwt_decode(token); 
	store.dispatch({
		type: SET_CURRENT_USER,
		payload: decoded
	})

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logout());
		window.location.href = '/'
	}
}

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Header/>
					{
						// Public Routes
					}
					<Route path='/' exact component={Landing}/>
					<Route path='/register' exact component={Register}/>
					<Route path='/login' exact component={Login}/>

					{
						// Private Routes
					}
					{/* <Route path='/dashboard' exact component={Dashboard}/>
					<Route path='/addProject' exact component={AddProject}/>
					<Route path='/updateProject/:id' exact component={UpdateProject}/>
					<Route path='/projectBoard/:id' exact component={ProjectBoard}/>
					<Route path='/addProjectTask/:id' exact component={AddProjectTask}/>
					<Route path='/updateProjectTask/:backlog_id/:pt_id' exact component={UpdateProjectTask}/> */}

					<Switch>
						<ProtectedRoute path='/dashboard' exact component={Dashboard}/>
						<ProtectedRoute path='/addProject' exact component={AddProject}/>
						<ProtectedRoute path='/updateProject/:id' exact component={UpdateProject}/>
						<ProtectedRoute path='/projectBoard/:id' exact component={ProjectBoard}/>
						<ProtectedRoute path='/addProjectTask/:id' exact component={AddProjectTask}/>
						<ProtectedRoute path='/updateProjectTask/:backlog_id/:pt_id' exact component={UpdateProjectTask}/>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
