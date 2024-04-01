import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onFinish = async (values) => {
		console.log('Received values of form: ', values);
		try {
			dispatch(showLoading());
			const response = await axios.post('/api/user/register', values);
			dispatch(hideLoading());
			if (response.data.success) {
				toast.success(response.data.message);
				toast('Redirecting to login page');
				navigate('/login');
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			dispatch(hideLoading());
			toast.error('Something went wrong');
		}
	};

	return (
		<div className='authentication'>
			<div className='authentication-form card p-3'>
				<h1 className='card-title'>Nice to Meet You</h1>

				<Form layout='vertical' onFinish={onFinish}>
					<Form.Item label='Name' name='name'>
						<Input placeholder='Enter your name' type='text' />
					</Form.Item>

					<Form.Item label='Email' name='email'>
						<Input placeholder='Enter your Email Address' type='email' />
					</Form.Item>

					<Form.Item label='Password' name='password'>
						<Input placeholder='Enter your Password' type='password' />
					</Form.Item>

					<div className='d-flex flex-column'>
						<Button
							className='primary-button my-2 full-width-button'
							htmlType='submit'
						>
							Register
						</Button>

						<Link className='anchor ' to='/login'>
							Click here to Login
						</Link>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default Register;
