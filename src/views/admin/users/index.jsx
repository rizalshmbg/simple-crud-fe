import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../../../components/SidebarMenu';
import api from '../../../services/api';

export default function UsersIndex() {
	const [users, setUsers] = useState([]);

	const fetchDataUsers = async () => {
		// get token from cookies inside the func to ensure it's up-to-date
		const token = Cookies.get('token');
		if (token) {
			// set authorization header with token
			api.defaults.headers.common['Authorization'] = token;

			// fetch data from API with Axios
			try {
				const response = await api.get('/api/admin/users');
				const { data } = response.data;
				setUsers(data);
			} catch (error) {
				console.error('There was an error fetching the users!', error);
			}
		} else {
			console.error('Token is not available!');
		}
	};

	useEffect(() => {
		fetchDataUsers();
	}, []);

	const deleteUser = async (id) => {
		// get token from cookies inside the function to ensure it's up-to-date
		const token = Cookies.get('token');

		if (token) {
			// set authorization header with token
			api.defaults.headers.common['Authorization'] = token;

			try {
				// fetch data from API with Axios
				await api.delete(`/api/admin/users/${id}`);

				// call method fetchDataUsers
				fetchDataUsers();
			} catch (error) {
				console.error('There was an error deleting the user!', error);
			}
		} else {
			console.error('Token is not available!');
		}
	};

	return (
		<div className='container mt-5 mb-5'>
			<div className='row'>
				<div className='col-md-2'>
					<SidebarMenu />
				</div>
				<div className='col-md-10'>
					<div className='card border-0 rounded shadow-sm'>
						<div className='card-header d-flex justify-content-between align-items-center'>
							<span className='fw-bold'>USERS</span>
							<Link
								to='/admin/users/create'
								className='btn btn-sm btn-success rounded shadow-sm border-0 fw-bold'
							>
								ADD USER
							</Link>
						</div>
						<div className='card-body'>
							<table className='table table-bordered'>
								<thead className='bg-dark text-white'>
									<tr>
										<th scope='col'>Full Name</th>
										<th scope='col'>Email Address</th>
										<th scope='col' style={{ width: '17%' }}>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{users.length > 0 ? (
										users.map((user, i) => {
											const { id, name, email } = user;

											return (
												<tr key={i + 1}>
													<td>{name}</td>
													<td>{email}</td>
													<td className='text-center'>
														<Link
															to={`/admin/users/edit/${id}`}
															className='btn btn-sm btn-warning rounded-sm shadow border-0 me-2'
														>
															EDIT
														</Link>
														<button
															className='btn btn-sm btn-danger rounded-sm shadow border-0'
															onClick={() => deleteUser(id)}
														>
															DELETE
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan='4' className='text-center'>
												<div className='alert alert-danger mb-0'>
													Data belum tersedia!
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
