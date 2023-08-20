import React from 'react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import './register.css';

const Register = () => {
	const [credentials, setCredentials] = useState({
		email: undefined,
		username: undefined,
		password: undefined,
	});

	const { loading, error, dispatch } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		dispatch({ type: 'REGISTER_START' });
		try {
			const res = await axios.post('/auth/register', credentials);
			dispatch({ type: 'REGISTER_SUCCESS', payload: res.data.details });
			toast.success(res.data.message);
			navigate('/');
		} catch (err) {
			dispatch({ type: 'REGISTER_FAILURE', payload: err.response.data });
			toast.error(err.message);
		}
	};

	return (
		<div className='login'>
			<div className='lContainer'>
				<input
					type='text'
					placeholder='username'
					id='username'
					onChange={handleChange}
					className='lInput'
				/>
				<input
					type='email'
					placeholder='email'
					id='email'
					onChange={handleChange}
					className='lInput'
				/>
				<input
					type='password'
					placeholder='password'
					id='password'
					onChange={handleChange}
					className='lInput'
				/>
				<button
					disabled={loading}
					onClick={handleClick}
					className='lButton'>
					Create account
				</button>
				<div className='loginAccount'>
					Already have an account? <Link to='/login'>Login</Link>
				</div>
				{error && <span>{error.message}</span>}
			</div>
		</div>
	);
};

export default Register;
