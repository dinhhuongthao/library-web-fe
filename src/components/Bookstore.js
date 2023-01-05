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

const Bookstore = () => {
	const loginState = useContext(LoginContext);

	const [books, setBooks] = useState([]);
	// const navigate = useNavigate();

	useEffect(() => {
		fetchAllBooks();
	}, []);

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
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>#</th>
							<th>Cover</th>
							<th>Title</th>
							<th>Author</th>
							<th>Action</th>
						</tr>
					</thead>

					<tbody>
						{books.map((book, index) => (
							<tr key={book.bookcode}>
								<td>{index}</td>
								<td>
									<img src={`${book.imageName}`} alt="" width={50} />
								</td>
								<td>{book.title}</td>
								<td>{book.author}</td>
								{loginState.isLoggedIn.username !== null && (
									<td>
										<Link to={`/book/${book.bookcode}`}>
											<button className="btn btn-primary">View</button>
										</Link>
									</td>
								)}
								{loginState.isLoggedIn === false && <td></td>}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Bookstore;
