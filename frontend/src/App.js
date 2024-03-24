import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import { useSelector } from 'react-redux';

function App() {
	const { loading } = useSelector((state) => state.alerts);
	return (
		<BrowserRouter>
			{loading && (
				<div className='spinner-parent'>
					<div className='spinner-border' role='status'></div>
				</div>
			)}

			<Toaster position='top-center' reverseOrder={false} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
