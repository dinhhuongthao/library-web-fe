import { Button, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useContext } from 'react';
import LoginContext from './LoginContext';

const CommentForm = ({ handleSubmit, submitLabel }) => {
	const [text, setText] = useState('');
	const [ratingValue, setRatingValue] = useState(null);
	const loginState = useContext(LoginContext);

	const isTextareaDisabled = text.length === 0;

	const resetForm = () => {
		setText('');
		setRatingValue(null);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		handleSubmit(text, ratingValue);
		resetForm();
	};

	return (
		<form onSubmit={onSubmit} style={{ textAlign: 'left' }}>
			<h2>Comments</h2>
			Write your comment
			{/* <Typography component="legend">Controlled</Typography> */}
			<br />
			<Rating
				name="simple-controlled"
				value={ratingValue}
				onChange={(event, newValue) => {
					setRatingValue(newValue);
				}}
			/>
			<br />
			<textarea
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
				disabled={loginState.isLoggedIn.username === null}
				width="100%"
			></textarea>
			<br />
			<Button className="" variant="contained" disabled={isTextareaDisabled}>
				{submitLabel}
			</Button>
		</form>
	);
};

export default CommentForm;
