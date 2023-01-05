import { Button, FormControl, Input, InputLabel } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginContext from './LoginContext';

const Signup = () => {
	const loginState = useContext(LoginContext);

	const [message, setMessage] = useState('xin chao ban');
	const [err, setErr] = useState('');
	const [signupInfor, setSignupInfor] = useState({
		username: '',
		password: '',
		email: '',
		address: '',
		phone: '',
	});

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (signupInfor.username === 'dht' && signupInfor.password === 'dht')
		// 	navigate('/book');
		// else alert('Wrong username and password! Please try again..');

		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		let raw = JSON.stringify(signupInfor);

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};
		fetch('http://localhost:8080/signup', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				if (result.data.status === 'signup successfully') {
					navigate('/login');
				} else {
					setErr(result.data.message);
				}
				console.log(result);
			})
			.catch((error) => console.log('error', error));
	};

	return (
		<div>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit}>
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Username:</InputLabel>
					<Input
						id="component-simple"
						value={signupInfor.username}
						onChange={(e) => {
							setSignupInfor({ ...signupInfor, username: e.target.value });
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
						value={signupInfor.password}
						onChange={(e) => {
							setSignupInfor({ ...signupInfor, password: e.target.value });
						}}
						required
					/>
				</FormControl>
				<br />
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Email:</InputLabel>
					<Input
						id="email"
						label="Email"
						type="text"
						variant="standard"
						value={signupInfor.email}
						onChange={(e) => {
							setSignupInfor({ ...signupInfor, email: e.target.value });
						}}
						required
					/>
				</FormControl>
				<br />
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Address:</InputLabel>
					<Input
						id="address"
						label="Address"
						type="text"
						variant="standard"
						value={signupInfor.address}
						onChange={(e) => {
							setSignupInfor({ ...signupInfor, address: e.target.value });
						}}
						required
					/>
				</FormControl>
				<br />
				<FormControl variant="standard">
					<InputLabel htmlFor="component-simple">Phone Number:</InputLabel>
					<Input
						id="phone"
						label="Phone Number"
						type="text"
						variant="standard"
						value={signupInfor.phone}
						onChange={(e) => {
							setSignupInfor({ ...signupInfor, phone: e.target.value });
						}}
						required
					/>
				</FormControl>
				<br />
				<Link to="/signup">Login</Link>
				<br />
				<Link to="/book">Home</Link>
				<br />
				<Button variant="outline" type="submit">
					Signup
				</Button>
				<div>{err}</div>
			</form>
		</div>
	);
};

export default Signup;
