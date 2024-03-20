import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Register = () => {
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
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

					<Button className='primary-button my-2' htmlType='submit'>
						{' '}
						Register{' '}
					</Button>

					<Link className='anchor ' to='/login'>
						Click here to Login
					</Link>
				</Form>
			</div>
		</div>
	);
};

export default Register;
