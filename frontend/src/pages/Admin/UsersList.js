import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';

import { showLoading, hideLoading } from '../../redux/alertsSlice';
import Layout from '../../components/Layout';

const UsersList = () => {
	const [users, setUsers] = useState([]);
	const dispatch = useDispatch();

	const getUserData = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.get(
				`/api/admin/get-all-users`,

				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);

			dispatch(hideLoading());

			if (response.data.success) {
				setUsers(response.data.data);
			}
		} catch (error) {
			dispatch(hideLoading());
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			render: (record) => {
				return record.slice(0, 10);
			},
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			render: (text, record) => {
				return (
					<div className='d-flex'>
						<button className='btn btn-danger anchor'>Block</button>
					</div>
				);
			},
		},
	];

	return (
		<Layout>
			<h1 className='page-header'>User List</h1>

			<Table columns={columns} dataSource={users} />
		</Layout>
	);
};

export default UsersList;
