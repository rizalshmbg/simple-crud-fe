import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Register() {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validation, setValidation] = useState([]);

	// func register
	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			// call api register
			await api.post('/api/register', {
				name: name,
				email: email,
				password: password,
			});
			navigate('/login');
		} catch (error) {
			setValidation(error.response.data);
		}
	};

	return (
		<div className='row justify-content-center'>
			<div className='row justify-content-center'>
				<div className='col-md-5'>
					<div className='card border-0 rounded shadow-sm'>
						<div className='card-body'>
							<h4 className='text-center fw-bold'>REGISTER</h4>
							<hr />

							{/* VALIDATION ERROR */}
							{validation.errors && (
								<div className='alert alert-danger mt-2 pb-0'>
									{validation.errors.map((error, i) => {
										const { path, msg } = error;
										console.log(i);
										return (
											<p key={i + 1}>
												{path} : {msg}
											</p>
										);
									})}
								</div>
							)}
							{/* END OF VALIDATION */}

							{/* FORM */}
							<form onSubmit={handleRegister}>
								{/* INPUT FULL NAME */}
								<div className='row'>
									<div className='col-md-12 mb-3'>
										<div className='form-group'>
											<label htmlFor='name' className='mb-1 fw-bold'>
												Full Name
											</label>
											<input
												type='text'
												id='name'
												className='form-control'
												value={name}
												onChange={(e) => setName(e.target.value)}
												placeholder='John Doe'
											/>
										</div>
									</div>
								</div>

								{/* INPUT EMAIL */}
								<div className='row'>
									<div className='col-md-12 mb-3'>
										<div className='form-group'>
											<label htmlFor='email' className='mb-1 fw-bold'>
												Email Address
											</label>
											<input
												type='email'
												id='email'
												className='form-control'
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder='johndoe@gmail.com'
											/>
										</div>
									</div>
								</div>

								{/* INPUT PASSWORD */}
								<div className='row'>
									<div className='col-md-12 mb-3'>
										<div className='form-group'>
											<label htmlFor='password' className='mb-1 fw-bold'>
												Password
											</label>
											<input
												type='password'
												id='password'
												className='form-control'
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder='&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;'
											/>
										</div>
									</div>
								</div>

								{/* BTN REGISTER */}
								<button type='submit' className='btn btn-primary w-100'>
									REGISTER
								</button>
							</form>

							<div>
								<p className='card-text mt-3 text-center'>
									Sudah punya akun? <Link to='/login'>Login</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
