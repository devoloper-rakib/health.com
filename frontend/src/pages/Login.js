import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};

	return (
		<div className='authentication'>
			<div className='authentication-form card p-3'>
				<h1 className='card-title'>Welcome Back</h1>

				<Form layout='vertical' onFinish={onFinish}>
					<Form.Item label='Email' name='email'>
						<Input placeholder='Enter your Email Address' type='email' />
					</Form.Item>

					<Form.Item label='Password' name='password'>
						<Input placeholder='Enter your Password' type='password' />
					</Form.Item>

					<Button className='primary-button my-2' htmlType='submit'>
						Login
					</Button>

					<Link className='anchor ' to='/register'>
						Note A user, Click here to register
					</Link>
				</Form>
			</div>
		</div>
	);
};

export default Login;
