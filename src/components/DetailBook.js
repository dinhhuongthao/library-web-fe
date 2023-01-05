import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PhotoCamera } from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { default as Grid } from '@mui/material/Unstable_Grid2/Grid2';
import BookForm from './BookForm';
import Comments from './Comments';
import LoginContext from './LoginContext';

const DetailBook = () => {
	const params = useParams();
	const loginState = useContext(LoginContext);
	const [book, setBook] = useState({});
	const bookcode = params.bookcode;
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState(null);

	const onSaveClick = ({ book, selectedFile }) => {
		const formData = new FormData();
		console.log(JSON.stringify(book));
		if (selectedFile) formData.append('file', selectedFile, selectedFile.name);
		formData.append('book', JSON.stringify(book));
		console.log(selectedFile);
		console.log(formData);

		fetch(`http://localhost:8080/book/save/${bookcode}`, {
			method: 'PUT',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		navigate('/book');
	};
	useEffect(() => {
		fetch(`http://localhost:8080/book/${bookcode}`)
			.then((response) => response.json())
			.then((data) => setBook(data))
			.catch((err) => console.log(err));

		// setSelectedFile(book.imageName);
		// if (!selectedFile) {
		// 	setPreview(undefined);
		// 	return;
		// }
		// setPreview(book.imageName);
	}, []);

	console.log(book);

	return (
		/*
		book.title && (
			<div className="section">
				<h1>Edit book</h1>
				<Grid container spacing={2}>
					<Grid xs={12} md={6}>
						<form id="form" encType="multipart/form-data">
							<FormGroup>
								<TextField
									type="text"
									value={book.title}
									onChange={(e) => setBook({ ...book, title: e.target.value })}
									required
									id="outlined-required"
									label="Title"
									error={book.title === ''}
								/>
							</FormGroup>
							<FormGroup className="mt-6">
								<TextField
									type="text"
									value={book.author}
									onChange={(e) => setBook({ ...book, author: e.target.value })}
									required
									id="outlined-required"
									label="Author"
									error={book.author === ''}
								/>
							</FormGroup>
							<FormGroup className="mt-6">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Category
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={book.category}
										label="Category"
										onChange={(e) =>
											setBook({ ...book, category: e.target.value })
										}
										defaultValue=""
									>
										<MenuItem value="Adventure stories">
											Adventure stories
										</MenuItem>
										<MenuItem value="Classics">Classics</MenuItem>
										<MenuItem value="Crime">Crime</MenuItem>
										<MenuItem value="Fairy tales, fables, and folk tales">
											Fairy tales, fables, and folk tales
										</MenuItem>
										<MenuItem value="Fantasy">Fantasy</MenuItem>
										<MenuItem value="Historical fiction">
											Historical fiction
										</MenuItem>
										<MenuItem value="Horror">Horror</MenuItem>
										<MenuItem value="Humour and satire">
											Humour and satire
										</MenuItem>
									</Select>
								</FormControl>
							</FormGroup>
							<FormGroup className="mt-6">
								<TextField
									type="date"
									value={book.releaseDate}
									onChange={(e) =>
										setBook({ ...book, releaseDate: e.target.value })
									}
									required
									id="outlined-required"
									label="Release Date"
									error={book.releaseDate === ''}
								/>
							</FormGroup>
							<FormGroup className="mt-6">
								<TextField
									type="number"
									value={book.numOfPages}
									onChange={(e) =>
										setBook({ ...book, numOfPages: e.target.value })
									}
									required
									id="outlined-required"
									label="Number of Pages"
									error={book.numOfPages === ''}
								/>
							</FormGroup>

							<FormGroup className="mt-6">
								<Button variant="contained" component="label" color="secondary">
									<PhotoCamera />
									Upload
									<input
										hidden
										type="file"
										id="file"
										onChange={(e) => {
											setSelectedFile(e.target.files[0]);
											setPreview(e.target.files[0]);
										}}
									/>
								</Button>
							</FormGroup>

							<FormGroup className="mt-6">
								<Button onClick={onSaveClick} variant="contained">
									Save
								</Button>
								<Button variant="outlined" color="primary">
									<Link to="/book">Cancel</Link>
								</Button>
							</FormGroup>
						</form>
					</Grid>
					<Grid xs={12} md={6} className="border">
						<img
							src={preview || book.imageName}
							alt=""
							className="preview-img"
						/>
					</Grid>
				</Grid>
			</div>
		)
		*/

		<React.Fragment>
			<div className="page">
				{book.title && (
					<BookForm
						title={
							loginState.isLoggedIn.role === 'admin'
								? 'EDIT BOOK'
								: 'BOOK DETAIL' + ' ' + book.title
						}
						book={book}
						selectedFile={selectedFile}
						onSubmit={onSaveClick}
					/>
				)}
				<Comments bookcode={bookcode} />
			</div>
		</React.Fragment>
	);
};

export default DetailBook;
