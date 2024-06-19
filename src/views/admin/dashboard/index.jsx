import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import SidebarMenu from '../../../components/SidebarMenu';

export default function Dashboard() {
	const [user, setUser] = useState([]);

	useEffect(() => {
		// get user data from cookies
		const userData = Cookies.get('user');

		// assign user data to state user
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	return (
		<div className='container mt-5 mb-5'>
			<div className='row'>
				<div className='col-md-2'>
					<SidebarMenu />
				</div>
				<div className='col-md-10'>
					<div className='card border-0 rounded shadow-sm'>
						<div className='card-header fw-bold'>DASHBOARD</div>
						<div className='card-body'>
							Selamat datang, <strong>{user?.name}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
