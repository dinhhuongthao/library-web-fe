import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import {
	MDBBtn,
	MDBCardImage,
	MDBCol,
	MDBIcon,
	MDBInput,
	MDBRow,
	MDBTypography,
} from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import CartContext from './CartContext';
import LoginContext from './LoginContext';

const ShoppingCartItem = ({ bookCartItem, deleteItem }) => {
	const loginState = useContext(LoginContext);
	const cartState = useContext(CartContext);

	const [book, setBook] = useState({});
	const [itemQuantity, setItemQuantity] = useState(bookCartItem.quantity);
	const [open, setOpen] = useState(false);

	const updateCartBook = async () => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			id: bookCartItem.id,
			username: loginState.isLoggedIn.username,
			bookcode: bookCartItem.bookcode,
			quantity: itemQuantity,
		});
		console.log(raw);

		var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		await fetch('http://localhost:8080/cart/update', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));

		await cartState.fetchCartBook();
	};

	const fetchBook = () => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		fetch(`http://localhost:8080/book/${bookCartItem.bookcode}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setBook(result);
			})
			.catch((error) => console.log('error', error));
	};

	const deleteCartBook = () => {
		var requestOptions = {
			method: 'DELETE',
			redirect: 'follow',
		};

		fetch(`http://localhost:8080/cart/${bookCartItem.id}`, requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));

		deleteItem(bookCartItem.id);
	};

	const handleClose = () => setOpen(false);

	const handleYesClick = () => {
		setOpen(false);
		deleteCartBook();
	};

	useEffect(() => {
		fetchBook();
	}, []);

	return (
		<div>
			<MDBRow className="mb-4 d-flex justify-content-between align-items-center">
				<MDBCol md="2" lg="2" xl="2">
					<MDBCardImage
						src={`${book.imageName}`}
						fluid
						className="rounded-3"
						alt="Cotton T-shirt"
					/>
				</MDBCol>
				<MDBCol md="3" lg="3" xl="3">
					<MDBTypography tag="h6" className="text-muted">
						{book.category}
					</MDBTypography>
					<MDBTypography tag="h6" className="text-black mb-0">
						{book.title}
					</MDBTypography>
				</MDBCol>
				<MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
					{/* <MDBBtn
						color="link"
						className="px-2"
						onClick={() => setItemQuantity((prev) => prev++)}
					>
						<MDBIcon fas icon="minus" />
					</MDBBtn> */}

					<MDBInput
						type="number"
						min="0"
						defaultValue={bookCartItem.quantity}
						value={itemQuantity}
						size="sm"
						onChange={(e) => setItemQuantity(e.target.value)}
					/>

					{/* <MDBBtn
						color="link"
						className="px-2"
						onClick={() => setItemQuantity((prev) => prev--)}
					>
						<MDBIcon fas icon="plus" />
					</MDBBtn> */}
				</MDBCol>
				<MDBCol md="3" lg="2" xl="2" className="text-end">
					<MDBTypography tag="h6" className="mb-0">
						VND 0
					</MDBTypography>
				</MDBCol>
				<MDBCol md="1" lg="1" xl="1" className="text-end">
					<MDBBtn
						color="link"
						className="text-primary"
						onClick={() => updateCartBook()}
					>
						Update
					</MDBBtn>
					<MDBBtn
						color="link"
						className="text-danger"
						onClick={() => setOpen(true)}
					>
						<MDBIcon fas icon="times" />
					</MDBBtn>
				</MDBCol>
			</MDBRow>

			<hr className="my-4" />

			<Dialog
				open={open}
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

export default ShoppingCartItem;
