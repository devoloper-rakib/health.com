import { Link, useLocation, useNavigate } from 'react-router-dom';

import '../layout.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';

const Layout = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.user);

	const userMenu = [
		{
			name: 'Home',
			path: '/',
			icon: 'ri-home-line',
		},
		{
			name: 'Appointments',
			path: '/appointments',
			icon: 'ri-file-list-line',
		},
		{
			name: 'Apply for Doctor',
			path: '/apply-doctor',
			icon: 'ri-hospital-line',
		},
		{
			name: 'Profile',
			path: '/profile',
			icon: 'ri-file-user-fill',
		},
	];

	const doctorMenu = [
		{
			name: 'Home',
			path: '/',
			icon: 'ri-home-line',
		},
		{
			name: 'Appointments',
			path: '/appointments',
			icon: 'ri-file-list-line',
		},

		{
			name: 'Profile',
			path: `/doctor/profile/${user?._id}`,
			icon: 'ri-file-user-fill',
		},
	];

	const adminMenu = [
		{
			name: 'Home',
			path: '/',
			icon: 'ri-home-line',
		},
		{
			name: 'Users',
			path: '/admin/userslist',
			icon: 'ri-user-fill',
		},
		{
			name: 'Doctors',
			path: '/admin/doctorslist',
			icon: 'ri-nurse-fill',
		},

		{
			name: 'Profile',
			path: '/profile',
			icon: 'ri-file-user-fill',
		},
	];

	const menuToBeRendered = user?.isAdmin
		? adminMenu
		: user?.isDoctor
		? doctorMenu
		: userMenu;

	// TODO: Side bar collapsed need to more optimize

	return (
		<div className='main'>
			<div className='d-flex layout'>
				<div className={`sidebar`}>
					<div className='sidebar-header'>
						{!collapsed ? (
							<h3 className='logo'>Health.com</h3>
						) : (
							<h3 className='logo'> Hc </h3>
						)}
					</div>

					<div className='menu'>
						{menuToBeRendered.map((menu, index) => {
							const isActive = location.pathname === menu.path;
							return (
								<div
									className={`d-flex menu-item ${
										isActive && 'active-menu-item'
									}`}
									key={index}
								>
									<i className={menu.icon}></i>

									{!collapsed && <Link to={menu.path}>{menu.name}</Link>}
								</div>
							);
						})}
						<div
							className='d-flex menu-item'
							onClick={() => {
								localStorage.clear();
								navigate('/login');
							}}
						>
							<i className='ri-logout-box-line'></i>
							{!collapsed && <Link to='/login'>Logout</Link>}
						</div>
					</div>
				</div>
				<div className='content'>
					<div className='header'>
						{collapsed ? (
							<i
								className='ri-menu-2-fill header-action-icon'
								onClick={() => setCollapsed(!true)}
							></i>
						) : (
							<i
								className='ri-close-fill header-action-icon'
								onClick={() => setCollapsed(!false)}
							></i>
						)}

						<div className='d-flex align-items-center px-4'>
							<Badge
								onClick={() => navigate('/notifications')}
								count={user?.unseenNotifications.length}
							>
								<i className='ri-notification-line header-action-icon px-3'></i>
							</Badge>

							<Link className='anchor' to='/profile'>
								{user?.name}
							</Link>
						</div>
					</div>
					<div className='body'> {children} </div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
