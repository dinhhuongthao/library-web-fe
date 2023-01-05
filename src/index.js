// import './bootstrap-custom.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './components/LoginContext';
import { CartProvider } from './components/CartContext';

library.add(fas, far, fab);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<LoginProvider>
				<CartProvider>
					<App />
				</CartProvider>
			</LoginProvider>
		</BrowserRouter>
	</React.StrictMode>
);
