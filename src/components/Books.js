import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import LoginContext from './LoginContext';
import { useContext } from 'react';
import ShoppingCart from './ShoppingCart';

const Books = () => {
	const loginState = useContext(LoginContext);

	const [books, setBooks] = useState([]);
	// const navigate = useNavigate();

	const [open, setOpen] = React.useState({ show: false, id: null });

	const handleClickOpen = (id) => {
		setOpen((prev) => ({ show: true, id: id }));
	};

	const handleClose = () => {
		setOpen((prev) => ({ show: false, id: null }));
	};

	const handleYesClick = async () => {
		await deleteBook(open.id);
		await handleClose();
		await fetchAllBooks();
	};

	useEffect(() => {
		fetchAllBooks();
	}, []);

	const deleteBook = (id) => {
		handleClose();

		fetch(`http://localhost:8080/book/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json', // Indicates the content
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
			.catch((err) => console.log(err));
	};

	const fetchAllBooks = () => {
		fetch('http://localhost:8080/books')
			.then((response) => response.json())
			.then((data) => setBooks(data))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h2 className="text-center">Books List</h2>
			{loginState.isLoggedIn.username ? (
				`Hello ${loginState.isLoggedIn.username}`
			) : (
				<Link to="/login">Login</Link>
			)}
			<div className="row">
				<Link to="/addBook">
					<button
						className="btn btn-primary"
						// onClick={() => onViewClick(-1)}
					>
						Add Book
					</button>
				</Link>
			</div>

			<div className="row">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Author</th>
							<th>Category</th>
							<th>Release Date</th>
							<th>Number of Pages</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						{books.map((book, index) => (
							<tr key={book.bookcode}>
								<td>{index}</td>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>{book.category}</td>
								<td>{book.releaseDate}</td>
								<td>{book.numOfPages}</td>
								{loginState.isLoggedIn.username !== null && (
									<td>
										<Link to={`/book/${book.bookcode}`}>
											<button className="btn btn-primary">View</button>
										</Link>
										<Button
											variant="contained"
											color="error"
											onClick={() => handleClickOpen(book.bookcode)}
										>
											Delete
										</Button>
									</td>
								)}
								{loginState.isLoggedIn === false && <td></td>}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Dialog
				open={open.show}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'DELETE WARNING'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure deleting this book?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleYesClick}>Yes</Button>
					<Button onClick={handleClose} autoFocus>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Books;
