import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/hotels'
					element={<List />}
				/>
				<Route
					path='/hotel/:id'
					element={<Hotel />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/forgotpassword'
					element={<ForgotPassword />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
