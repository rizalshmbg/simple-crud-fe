import SidebarMenu from '../../../components/SidebarMenu';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export default function UsersEdit() {
	const navigate = useNavigate();

	// destruct ID
	const { id } = useParams();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validation, setValidation] = useState('');

	// method fetch detail user
	const fetchDetailUser = async () => {
		// fetch data
		await api.get(`/api/admin/users/${id}`).then((response) => {
			// assign to state
			setName(response.data.data.name);
			setEmail(response.data.data.email);
		});
	};

	useEffect(() => {
		fetchDetailUser();
	}, []);

	// method update user
	const updateUser = async (e) => {
		e.preventDefault();

		// call API
		api.defaults.headers.common['Authorization'] = token;
		await api
			.put(`/api/admin/users/${id}`, {
				name: name,
				email: email,
				password: password,
			})
			.then(() => {
				// redirect ke halaman users
				navigate('/admin/users');
			})
			.catch((error) => {
				// assign error to validation
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
						<div className='card-header fw-bold'>EDIT USER</div>
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
							<form onSubmit={updateUser}>
								{/* FULL NAME */}
								<div className='form-group mb-3'>
									<label htmlFor='name' className='fw-bold'>
										New Full Name
									</label>
									<input
										type='text'
										value={name}
										className='form-control'
										placeholder='Input new full name here'
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								{/* EMAIL */}
								<div className='form-group mb-3'>
									<label htmlFor='email' className='fw-bold'>
										New Email Address
									</label>
									<input
										type='email'
										value={email}
										className='form-control'
										placeholder='Input new email address here'
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								{/* PASSWORD */}
								<div className='form-group mb-3'>
									<label htmlFor='password' className='fw-bold'>
										New Password
									</label>
									<input
										type='password'
										value={password}
										className='form-control'
										placeholder='Input new password here'
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								{/* BTN UPDATE */}
								<button
									type='submit'
									className='btn btn-sm btn-primary fw-bold'
								>
									UPDATE
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
