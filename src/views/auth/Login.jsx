import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Cookies from 'js-cookie';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
	const navigate = useNavigate();

	const { setIsAuthenticated } = useContext(AuthContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validation, setValidation] = useState([]);
	const [loginFailed, setLoginFailed] = useState([]);

	// func login
	const handleLogin = async (e) => {
		e.preventDefault();

		// call api login
		try {
			const response = await api.post('/api/login', {
				email,
				password,
			});
			const { token, user } = response.data.data;

			// set token and user to cookie
			Cookies.set('token', token);
			Cookies.set('user', JSON.stringify(user));

			// assign true to state "isAuthenticated"
			setIsAuthenticated(true);
			navigate('/admin/dashboard', { replace: true });
		} catch (error) {
			// assign error to state "validation"
			setValidation(error.response.data);

			// assign error to state "loginFailed"
			setLoginFailed(error.response.data);
		}
	};

	return (
		<div className='row justify-content-center mt-5'>
			<div className='col-md-4'>
				<div className='card border-0 rounded shadow-sm'>
					<div className='card-body'>
						<h4 className='text-center fw-bold'>LOGIN</h4>
						<hr />

						{/* VALIDATION ERROR */}
						{validation.errors && (
							<div className='alert alert-danger mt-2 pb-0'>
								{validation.errors.map((error, i) => {
									const { path, msg } = error;
									return (
										<p key={i + 1}>
											{path} : {msg}
										</p>
									);
								})}
							</div>
						)}

						{/* LOGIN FAILED */}
						{loginFailed.message && (
							<div className='alert alert-danger mt-2'>
								{loginFailed.message}
							</div>
						)}

						{/* FORM */}
						<form onSubmit={handleLogin}>
							{/* EMAIL */}
							<div className='form-group mb-3'>
								<label htmlFor='email' className='mb-1 fw-bold'>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									value={email}
									className='form-control'
									placeholder='johndoe@gmail.com'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* PASSWORD */}
							<div className='form-group mb-3'>
								<label htmlFor='password' className='mb-1 fw-bold'>
									Password
								</label>
								<input
									type='password'
									id='password'
									value={password}
									className='form-control'
									placeholder='&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>

							{/* BTN LOGIN */}
							<button type='submit' className='btn btn-primary w-100'>
								LOGIN
							</button>
						</form>

						<div>
							<p className='card-text mt-3 text-center'>
								Belum punya akun? <Link to='/register'>Register</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
