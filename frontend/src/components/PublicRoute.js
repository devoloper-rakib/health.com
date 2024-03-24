import { Navigate } from 'react-router-dom';

// TODO: will verify token and localstorage logic to modify the code

const PublicRoute = (props) => {
	if (localStorage.getItem('token')) {
		return <Navigate to='/' />;
		// return props.fallback;
	} else {
		return props.children;
	}
};

export default PublicRoute;
