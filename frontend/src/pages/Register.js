import { Button, Form, Input } from 'antd';

const Register = () => {
	return (
		<div className='authentication'>
			<div className='authentication-form card p-3'>
				<h1 className='card-title'>Nice to Meet You</h1>

				<Form layout='vertical'>
					<Form.Item label='Name' name='name'>
						<Input placeholder='Enter your name' />
					</Form.Item>

					<Form.Item label='Email' name='email'>
						<Input placeholder='Enter your Email Address' />
					</Form.Item>

					<Form.Item label='Password' name='password'>
						<Input placeholder='Enter your Password' />
					</Form.Item>

					<Button className='primary-button mt-2'> Register </Button>
				</Form>
			</div>
		</div>
	);
};

export default Register;
