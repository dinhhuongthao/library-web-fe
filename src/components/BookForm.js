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
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { default as Grid } from '@mui/material/Unstable_Grid2/Grid2';
import LoginContext from './LoginContext';
import { MDBInput } from 'mdb-react-ui-kit';
import BuyingForm from './BuyingForm';

const BookForm = (props) => {
	const loginState = useContext(LoginContext);
	const [title, setTitle] = useState(props.title);
	const [isDisabled, setIsDisabled] = useState(
		title === 'Add New Book' ? false : true
	);
	const [book, setBook] = useState(props.book);
	const [errorTexts, setErrorTexts] = useState({
		titleError: '',
		authorError: '',
		categoryError: '',
	});
	const [selectedFile, setSelectedFile] = useState(props.selectedFile);
	const [preview, setPreview] = useState(
		selectedFile ? URL.createObjectURL(selectedFile) : null
	);

	const navigate = useNavigate();

	const onSubmitHandler = (e) => {
		e.preventDefault();
		props.onSubmit({ book, selectedFile });
	};

	if (title === 'Add New Book') {
	} else if (title === 'Edit Book') {
	}

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	return (
		<div className="section">
			<h1>{title}</h1>
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
								disabled={isDisabled}
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
								disabled={isDisabled}
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
									defaultValue="Aventure stories"
									required
									disabled={isDisabled}
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
								disabled={isDisabled}
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
								disabled={isDisabled}
							/>
						</FormGroup>

						{loginState.isLoggedIn.role === 'admin' && (
							<FormGroup className="mt-6">
								<Button
									variant="contained"
									component="label"
									color="secondary"
									disabled={isDisabled}
								>
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
						)}

						{/* BUYING */}
						<BuyingForm bookcode={book.bookcode}></BuyingForm>

						<FormGroup className="mt-6">
							{title === 'Add New Book' && (
								<Button onClick={onSubmitHandler} variant="contained">
									Add
								</Button>
							)}
							{loginState.isLoggedIn.role === 'admin' &&
								title === 'Edit Book' &&
								isDisabled === true && (
									<Button
										onClick={(e) => {
											e.preventDefault();
											setIsDisabled(false);
										}}
										variant="contained"
									>
										Edit
									</Button>
								)}
							{title === 'Edit Book' && !isDisabled && (
								<Button onClick={onSubmitHandler} variant="contained">
									Save
								</Button>
							)}

							{loginState.isLoggedIn.role === 'admin' && (
								<Button variant="outlined" color="primary">
									<Link to="/book">Cancel</Link>
								</Button>
							)}
						</FormGroup>
					</form>
				</Grid>
				<Grid xs={12} md={6} className="border">
					<img
						src={preview || book.imageName}
						alt=""
						className="preview-img"
						style={{ maxHeight: '450px' }}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default BookForm;
