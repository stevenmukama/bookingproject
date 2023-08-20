import { useEffect } from 'react';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../login/login.css';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [navigate, user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = await Axios.post('/auth/forgotpassword', {
				email,
			});
			toast.success(data.message);
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div className='login'>
			<div className='lContainer'>
				<input
					type='email'
					placeholder='add your email'
					required
					onChange={(e) => setEmail(e.target.value)}
					className='lInput'
				/>
				<button
					// disabled={loading}
					onClick={submitHandler}
					type='submit'
					className='lButton'>
					submit
				</button>
				<Link to='/login'> Go Back </Link>
			</div>
		</div>
	);
};

export default ForgotPassword;
