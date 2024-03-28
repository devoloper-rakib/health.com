import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { Table } from 'antd';

const DoctorsList = () => {
	const [doctors, setDoctors] = useState([]);
	const dispatch = useDispatch();

	const getDoctorData = async () => {
		try {
			dispatch(showLoading());
			const response = await axios.get('/api/admin/get-all-doctors', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			dispatch(hideLoading());
			if (response.data.success) {
				setDoctors(response.data.data);
			}
		} catch (error) {
			dispatch(hideLoading());
		}
	};

	useEffect(() => {
		getDoctorData();
	}, []);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			render: (text, record) => (
				<span className='normal-text'>
					{record?.firstName || record?.name} {record?.lastName}
				</span>
			),
		},

		{
			title: 'Created At',
			dataIndex: 'createdAt',
			render: (record) => {
				return record.slice(0, 10);
			},
		},
		{
			title: 'Phone',
			dataIndex: 'phoneNumber',
		},
		{
			title: 'status',
			dataIndex: 'status',
		},
		{
			title: 'Actions',
			dataIndex: 'actions',
			render: (text, record) => (
				<div className='d-flex'>
					{record.status === 'pending' && (
						<span className='anchor'>Approve</span>
					)}
					{record.status === 'approved' && (
						<span className='anchor'>Block</span>
					)}
				</div>
			),
		},
	];

	return (
		<Layout>
			<h1 className='page-header'>Doctor List</h1>
			<hr />
			<Table columns={columns} dataSource={doctors} />
		</Layout>
	);
};

export default DoctorsList;
