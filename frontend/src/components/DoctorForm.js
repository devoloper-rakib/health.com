import moment from 'moment';
import { Button, Col, Form, Input, Row, TimePicker } from 'antd';

const DoctorForm = ({ onFinish, initialValues }) => {
	return (
		<Form
			layout='vertical'
			onFinish={onFinish}
			autoComplete='true'
			initialValues={{
				...initialValues,
				...(initialValues && {
					timings: [
						moment(initialValues?.timings[0], 'HH:mm'),
						moment(initialValues?.timings[1], 'HH:mm'),
					],
				}),
			}}
		>
			<h1 className='card-title mt-3'>Personal Information</h1>
			<Row gutter={20}>
				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='First Name'
						name='firstName'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter First Your Name' type='text' />
					</Form.Item>
				</Col>

				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Last Name'
						name='lastName'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter Your Last Name' type='text' />
					</Form.Item>
				</Col>

				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Phone'
						name='phoneNumber'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter Your Phone Number' type='text' />
					</Form.Item>
				</Col>

				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Website'
						name='website'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter Your Website Url' type='text' />
					</Form.Item>
				</Col>

				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Address'
						name='address'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter Your address' type='text' />
					</Form.Item>
				</Col>
			</Row>
			<hr />

			<h1 className='card-title mt-3'>Professional Information</h1>
			<Row gutter={20}>
				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Specialize In '
						name='specialization'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter Your Specialize Sector' type='text' />
					</Form.Item>
				</Col>

				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Experience'
						name='experience'
						rules={[{ required: true }]}
					>
						<Input placeholder='Experience' type='number' />
					</Form.Item>
				</Col>

				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Fee Per Consultation'
						name='feePerConsultation'
						rules={[{ required: true }]}
					>
						<Input placeholder='Enter Your Consultation Fee' type='number' />
					</Form.Item>
				</Col>
				{/* // Point : timings */}
				<Col span={8} lg={8} xs={24} sm={24}>
					<Form.Item
						required
						label='Timings'
						name='timings'
						rules={[{ required: true }]}
					>
						<TimePicker.RangePicker format='HH:mm' />
					</Form.Item>
				</Col>
			</Row>

			<div className='d-flex justify-content-end'>
				<Button htmlType='submit' className='primary-button '>
					Submit
				</Button>
			</div>
		</Form>
	);
};

export default DoctorForm;
