import { waitFor } from '@testing-library/react';
import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import LoginContext from './LoginContext';

const Comments = ({ bookcode }) => {
	const [backendComments, setBackendComments] = useState([]);
	console.log('backendComments', backendComments);

	const loginState = useContext(LoginContext);

	const fetchCommemts = () => {
		fetch(`http://localhost:8080/comments/${bookcode}`)
			.then((response) => response.json())
			.then((data) => setBackendComments(data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchCommemts();
	}, []);

	const addComment = async (text, ratingValue) => {
		console.log('addComment', text);
		console.log('rating', ratingValue);
		console.log('user', loginState.isLoggedIn.username);

		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			username: loginState.isLoggedIn.username,
			bookcode,
			body: text,
			rating: ratingValue === null ? 0 : ratingValue,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		await fetch('http://localhost:8080/comments/addComment', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));

		await fetchCommemts();
	};

	return (
		<>
			<CommentForm submitLabel={'Write'} handleSubmit={addComment} />
			<Comment comments={backendComments} />
		</>
	);
};

export default Comments;
