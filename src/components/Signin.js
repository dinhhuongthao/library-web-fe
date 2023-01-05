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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LoginContext from './LoginContext';
import { Label } from '@mui/icons-material';
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

export default function SignIn() {
	const navigate = useNavigate();
	const loginState = useContext(LoginContext);

	const [loginInfor, setLoginInfor] = useState({ username: '', password: '' });
	const [message, setMessage] = useState('xin chao ban');
	const [err, setErr] = useState('');

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
					// loginState.setLoggedIn(true);
					loginState.setLoggedIn({
						username: loginInfor.username,
						role: result.data.role,
					});
					console.log(loginInfor.username);
					if (result.data.role === 'admin') navigate('/book');
					else navigate('/bookstore');
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
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						// noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
							value={loginInfor.username}
							onChange={(e) => {
								setLoginInfor({ ...loginInfor, username: e.target.value });
							}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={loginInfor.password}
							onChange={(e) => {
								setLoginInfor({ ...loginInfor, password: e.target.value });
							}}
						/>
						{err != '' && <Alert severity="warning">{err}</Alert>}
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/signup" variant="body2">
									<Button>{"Don't have an account? Sign Up"}</Button>
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
