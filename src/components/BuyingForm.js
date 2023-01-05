import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormGroup,
} from '@mui/material';
import { MDBInput } from 'mdb-react-ui-kit';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import CartContext from './CartContext';
import LoginContext from './LoginContext';

const BuyingForm = ({ bookcode }) => {
	const loginState = useContext(LoginContext);
	const cartState = useContext(CartContext);

	const [quantity, setQuantity] = useState(0);

	const [open, setOpen] = React.useState({ show: false, curr_quantity: 0 });

	const handleClickOpen = (quantity) => {
		setOpen((prev) => ({ show: true, curr_quantity: quantity }));
	};

	const handleClose = () => {
		setOpen((prev) => ({ show: false, curr_quantity: 0 }));
	};

	const fetchAddCart = () => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		var raw = JSON.stringify({
			username: loginState.isLoggedIn.username,
			bookcode,
			quantity,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch('http://localhost:8080/cart/save', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));

		console.log('fetch add cart');
	};

	const handleSubmit = async () => {
		if (quantity > 0) {
			handleClickOpen(quantity);
			await fetchAddCart();
			await cartState.fetchCartBook();
			setQuantity(0);
		} else {
			alert('You have to buy at least 1 item');
		}
	};

	return (
		<div>
			<FormGroup className="mt-6">
				<MDBInput
					type="number"
					min="0"
					value={quantity}
					onChange={(e) => {
						console.log(e.target.value);
						setQuantity(e.target.value);
					}}
					size="sm"
				/>
				<Button
					onClick={(e) => {
						e.preventDefault();
						// handleClickOpen();
						handleSubmit();
					}}
					variant="contained"
					disabled={quantity == 0}
				>
					Buy
				</Button>
			</FormGroup>

			<Dialog
				open={open.show}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">BUYING STATUS</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{`Buying ${open.curr_quantity} of this book successfully`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{/* <Button onClick={handleSubmit}>Yes</Button> */}
					<Button onClick={handleClose} autoFocus>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default BuyingForm;
