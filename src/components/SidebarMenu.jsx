import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthContext';

const SidebarMenu = () => {
	const navigate = useNavigate();

	const { setIsAuthenticated } = useContext(AuthContext);

	// func logout
	const handleLogout = () => {
		// remove token and user on cookies
		Cookies.remove('token');
		Cookies.remove('user');

		// assign false to state "isAuthenticated"
		setIsAuthenticated(false);

		// redirect to login
		navigate('/login', { replace: true });
	};

	return (
		<div className='card border-0 rounded shadow-sm'>
			<div className='card-header fw-bold'>MAIN MENU</div>
			<div className='card-body'>
				<div className='list-group'>
					<Link
						to='/admin/dashboard'
						className='list-group-item list-group-item-action'
					>
						Dashboard
					</Link>
					<Link
						to='/admin/users'
						className='list-group-item list-group-item-action'
					>
						Users
					</Link>
					{/* <a
						href='#'
						className='list-group-item list-group-item-action pe-auto'
					>
						Logout
					</a> */}
					<button
						type='button'
						onClick={handleLogout}
						className='list-group-item list-group-item-action'
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default SidebarMenu;
