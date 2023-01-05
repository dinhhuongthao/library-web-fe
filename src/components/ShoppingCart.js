import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardText,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBInput,
	MDBRow,
	MDBTypography,
} from 'mdb-react-ui-kit';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartContext from './CartContext';
import LoginContext from './LoginContext';
import ShoppingCartItem from './ShoppingCartItem';

export default function QuantityEdit() {
	const loginState = useContext(LoginContext);
	const cartContext = useContext(CartContext);

	// const [backendCartBook, setBackendCartBook] = useState([]);

	// const fetchCartBook = () => {
	// 	var requestOptions = {
	// 		method: 'GET',
	// 		redirect: 'follow',
	// 	};

	// 	fetch(
	// 		`http://localhost:8080/cart/${loginState.isLoggedIn.username}`,
	// 		requestOptions
	// 	)
	// 		.then((response) => response.json())
	// 		.then((result) => setBackendCartBook(result))
	// 		.catch((error) => console.log('error', error));
	// };

	// const deleteItem = (id) => {
	// 	const newList = backendCartBook.filter((item) => item.id !== id);
	// 	setBackendCartBook(newList);
	// };

	useEffect(() => {
		console.log('fetch after', loginState.isLoggedIn.username);
		// if (loginState.isLoggedIn.username !== null) fetchCartBook();
	}, [loginState.isLoggedIn.username]);

	return (
		<section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
			<MDBContainer className="py-5 h-100">
				<MDBRow className="justify-content-center align-items-center h-100">
					<MDBCol size="12">
						<MDBCard
							className="card-registration card-registration-2"
							style={{ borderRadius: '15px' }}
						>
							<MDBCardBody className="p-0">
								<MDBRow className="g-0">
									<MDBCol lg="8">
										<div className="p-5">
											<div className="d-flex justify-content-between align-items-center mb-5">
												<MDBTypography
													tag="h1"
													className="fw-bold mb-0 text-black"
												>
													Shopping Cart
												</MDBTypography>
												<MDBTypography className="mb-0 text-muted">
													{`${cartContext.backendCartBook.length} items`}
												</MDBTypography>
											</div>

											<hr className="my-4" />

											{console.log(
												'backendcartbook',
												cartContext.backendCartBook
											)}

											{cartContext.backendCartBook.map((bookItem) => {
												console.log(bookItem);
												return (
													<ShoppingCartItem
														key={bookItem.id}
														bookCartItem={bookItem}
														deleteItem={cartContext.deleteItem}
													/>
												);
											})}

											<div className="pt-5">
												<Link to="/bookstore">
													<MDBTypography tag="h6" className="mb-0">
														<MDBCardText className="text-body">
															<MDBIcon fas icon="long-arrow-alt-left me-2" />{' '}
															Back to shop
														</MDBCardText>
													</MDBTypography>
												</Link>
											</div>
										</div>
									</MDBCol>
									<MDBCol lg="4" className="bg-grey">
										<div className="p-5">
											<MDBTypography
												tag="h3"
												className="fw-bold mb-5 mt-2 pt-1"
											>
												Summary
											</MDBTypography>

											<hr className="my-4" />

											<div className="d-flex justify-content-between mb-4">
												<MDBTypography tag="h5" className="text-uppercase">
													items {cartContext.backendCartBook.length}
												</MDBTypography>
												<MDBTypography tag="h5">VND 0</MDBTypography>
											</div>

											<MDBTypography tag="h5" className="text-uppercase mb-3">
												Shipping
											</MDBTypography>

											<div className="mb-4 pb-2">
												<select
													className="select p-2 rounded bg-grey"
													style={{ width: '100%' }}
												>
													<option value="1">
														Standard-Delivery- VND 15 000
													</option>
													<option value="2">Two</option>
													<option value="3">Three</option>
													<option value="4">Four</option>
												</select>
											</div>

											<MDBTypography tag="h5" className="text-uppercase mb-3">
												Give code
											</MDBTypography>

											<div className="mb-5">
												<MDBInput size="lg" label="Enter your code" />
											</div>

											<hr className="my-4" />

											<div className="d-flex justify-content-between mb-5">
												<MDBTypography tag="h5" className="text-uppercase">
													Total price
												</MDBTypography>
												<MDBTypography tag="h5">VND 0</MDBTypography>
											</div>

											<MDBBtn color="dark" block size="lg">
												Register
											</MDBBtn>
										</div>
									</MDBCol>
								</MDBRow>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
}
