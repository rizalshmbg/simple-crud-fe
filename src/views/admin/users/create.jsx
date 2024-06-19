import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../../../components/SidebarMenu';
import api from '../../../services/api';

// get token from cookies
const token = Cookies.get('token');

export default function UsersCreate() {
	// use navigate
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validation, setValidation] = useState([]);

	// func store user
	const storeUser = async (e) => {
		e.preventDefault();

		// call api
		api.defaults.headers.common['Authorization'] = token;
		await api
			.post('/api/admin/users', {
				name: name,
				email: email,
				password: password,
			})
			.then(() => {
				// redirect ke halaman users
				navigate('/admin/users');
			})
			.catch((error) => {
				// assign error to state validation
				setValidation(error.response.data);
			});
	};

	return (
		<div className='container mt-5 mb-5'>
			<div className='row'>
				<div className='col-md-2'>
					<SidebarMenu />
				</div>
				<div className='col-md-10'>
					<div className='card border-0 rounded shadow-sm'>
						<div className='card-header fw-bold'>ADD USER</div>
						<div className='card-body'>
							{validation.errors && (
								<div className='alert alert-danger mt-2 pb-0'>
									{validation.errors.map((error, i) => {
										const { path, msg } = error;

										return (
											<p key={i}>
												{path} : {msg}
											</p>
										);
									})}
								</div>
							)}

							{/* FORM */}
							<form onSubmit={storeUser}>
								{/* FULL NAME */}
								<div className='form-group mb-3'>
									<label htmlFor='name' className='mb-1 fw-bold'>
										Full Name
									</label>
									<input
										type='text'
										id='name'
										className='form-control'
										placeholder='Input name here'
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								{/* EMAIL */}
								<div className='form-group mb-3'>
									<label htmlFor='email' className='mb-1 fw-bold'>
										Email Address
									</label>
									<input
										type='email'
										id='email'
										className='form-control'
										placeholder='Input email here'
										value={email}
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
										className='form-control'
										placeholder='Input password here'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								{/* BTN SUBMIT */}
								<button
									type='submit'
									className='btn btn-sm btn-primary fw-bold'
								>
									SAVE
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
