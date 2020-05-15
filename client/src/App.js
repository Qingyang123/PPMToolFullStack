import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import AddProject from './components/Project/AddProject';
import './App.css';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="App">
					<Header/>
					<Route path='/dashboard' exact component={Dashboard}/>
					<Route path='/addProject' exact component={AddProject}/>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
