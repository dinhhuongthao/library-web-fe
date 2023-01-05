import React, { createContext } from 'react';
import { useState } from 'react';

const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState({ username: null, role: null });

	return (
		<LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
