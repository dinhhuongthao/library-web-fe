import React, { createContext, useContext } from 'react';
import { useState } from 'react';
import LoginContext from './LoginContext';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
	const loginState = useContext(LoginContext);
	const [backendCartBook, setBackendCartBook] = useState([]);

	const fetchCartBook = () => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		if (loginState.isLoggedIn.username !== null)
			fetch(
				`http://localhost:8080/cart/${loginState.isLoggedIn.username}`,
				requestOptions
			)
				.then((response) => response.json())
				.then((result) => setBackendCartBook(result))
				.catch((error) => console.log('error', error));
	};

	const deleteItem = (id) => {
		const newList = backendCartBook.filter((item) => item.id !== id);
		setBackendCartBook(newList);
	};

	return (
		<CartContext.Provider
			value={{ backendCartBook, setBackendCartBook, fetchCartBook, deleteItem }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
