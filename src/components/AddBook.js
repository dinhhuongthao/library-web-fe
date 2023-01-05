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
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { default as Grid } from '@mui/material/Unstable_Grid2/Grid2';
import BookForm from './BookForm';

function AddBook() {
	const [book, setBook] = useState({
		title: '',
		author: '',
		category: 'Adventure stories',
		releaseDate: '',
		numOfPages: '',
	});
	// const [errorTexts, setErrorTexts] = useState({
	// 	titleError: '',
	// 	authorError: '',
	// 	categoryError: '',
	// });
	const [selectedFile, setSelectedFile] = useState(null);
	const [preview, setPreview] = useState(null);

	// const book = {};
	// const selectedFile = null;

	const navigate = useNavigate();

	const onSaveClick = ({ book, selectedFile }) => {
		// if (book.title === '') {
		// 	setErrorTexts({ ...errorTexts, titleError: 'Please enter book title' });
		// } else {
		// 	setErrorTexts({ ...errorTexts, titleError: '' });
		// }
		if (
			book.title === '' ||
			book.author === '' ||
			book.category === '' ||
			selectedFile === null
		) {
			return;
		}

		console.log(JSON.stringify(book));

		const formData = new FormData();
		console.log(JSON.stringify(book));
		formData.append('file', selectedFile, selectedFile.name);
		formData.append('book', JSON.stringify(book));
		console.log(selectedFile);
		console.log(formData);

		fetch('http://localhost:8080/upload-file', {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		navigate('/book');
	};

	// useEffect(() => {
	// 	if (!selectedFile) {
	// 		setPreview(undefined);
	// 		return;
	// 	}

	// 	const objectUrl = URL.createObjectURL(selectedFile);
	// 	setPreview(objectUrl);

	// 	// free memory when ever this component is unmounted
	// 	return () => URL.revokeObjectURL(objectUrl);
	// }, [selectedFile]);

	return (
		/*
		<div className="section">
			<h1>Add a new book</h1>
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
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={book.category}
									label="Category"
									onChange={(e) =>
										setBook({ ...book, category: e.target.value })
									}
								>
									<MenuItem value={'Adventure stories'}>
										Adventure stories
									</MenuItem>
									<MenuItem value={'Classics'}>Classics</MenuItem>
									<MenuItem value={'Crime'}>Crime</MenuItem>
									<MenuItem value={'Fairy tales, fables, and folk tales'}>
										Fairy tales, fables, and folk tales
									</MenuItem>
									<MenuItem value={'Fantasy'}>Fantasy</MenuItem>
									<MenuItem value={'Historical fiction'}>
										Historical fiction
									</MenuItem>
									<MenuItem value={'Horror'}>Horror</MenuItem>
									<MenuItem value={'Humour and satire'}>
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
									}}
								/>
							</Button>
						</FormGroup>

						<FormGroup className="mt-6">
							<Button onClick={onSaveClick} variant="contained">
								Save
							</Button>
							<Button variant="contained" color="warning">
								<Link to="/book">Cancel</Link>
							</Button>
						</FormGroup>
					</form>
				</Grid>
				<Grid xs={12} md={6} className="border">
					<img src={preview} alt="" className="preview-img" />
				</Grid>
			</Grid>
		</div>
		*/
		<BookForm
			title="Add New Book"
			book={book}
			selectedFile={selectedFile}
			onSubmit={onSaveClick}
		/>
	);
}

export default AddBook;
