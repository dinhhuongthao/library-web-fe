import { Button, FormControl, Input, InputLabel } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginContext from './LoginContext';

const Login = () => {
	const loginState = useContext(LoginContext);

	const [message, setMessage] = useState('xin chao ban');
	const [err, setErr] = useState('');

	const [loginInfor, setLoginInfor] = useState({ username: '', password: '' });

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (loginInfor.username === 'dht' && loginInfor.password === 'dht')
		// 	navigate('/book');
		// else alert('Wrong username and password! Please try again..');

		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		let raw = JSON.stringify(loginInfor);

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};
		fetch('http://localhost:8080/login', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.data.status === 'login successfully') {
					loginState.setLoggedIn({ username: loginInfor.username });
					console.log(loginInfor.username);
					// navigate('/book');
				} else {
					setErr(result.data.message);
				}
				console.log(result);
			})
			.catch((error) => console.log('error', error));
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Username:</InputLabel>
					<Input
						id="component-simple"
						value={loginInfor.username}
						onChange={(e) => {
							setLoginInfor({ ...loginInfor, username: e.target.value });
						}}
						required
					/>
				</FormControl>
				<br />
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Password:</InputLabel>
					<Input
						id="standard-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						variant="standard"
						value={loginInfor.password}
						onChange={(e) => {
							setLoginInfor({ ...loginInfor, password: e.target.value });
						}}
						required
					/>
					<Link to="/signup">Sign Up</Link>
					<Button variant="outline" type="submit">
						Login
					</Button>
				</FormControl>
				<div>{err}</div>
			</form>
		</div>
	);
};

export default Login;
