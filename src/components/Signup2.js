import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import LoginContext from './LoginContext';
import { Alert } from '@mui/material';

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				DHT
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUp() {
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
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						// noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="username"
									name="username"
									required
									fullWidth
									id="username"
									label="Username"
									autoFocus
									value={signupInfor.username}
									onChange={(e) => {
										setSignupInfor({
											...signupInfor,
											username: e.target.value,
										});
										setErr('');
									}}
									error={err === '' ? false : true}
									helperText={err}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={signupInfor.password}
									onChange={(e) => {
										setSignupInfor({
											...signupInfor,
											password: e.target.value,
										});
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={signupInfor.email}
									onChange={(e) => {
										setSignupInfor({ ...signupInfor, email: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="address"
									label="Address"
									name="address"
									autoComplete="address"
									value={signupInfor.address}
									onChange={(e) => {
										setSignupInfor({ ...signupInfor, address: e.target.value });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="phone"
									label="Phone Number"
									name="phone"
									autoComplete="phone"
									value={signupInfor.phone}
									onChange={(e) => {
										setSignupInfor({ ...signupInfor, phone: e.target.value });
									}}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link to="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
