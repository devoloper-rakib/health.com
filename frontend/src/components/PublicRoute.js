import { Navigate } from 'react-router-dom';

const PublicRoute = (props) => {
	if (localStorage.getItem('token')) {
		return <Navigate to='/' />;
		// return props.fallback;
	} else {
		return props.children;
	}
};

export default PublicRoute;
