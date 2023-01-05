import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import LoginContext from './LoginContext';
import { useEffect } from 'react';
import CartContext from './CartContext';

function Header() {
	const [openedDrawer, setOpenedDrawer] = useState(false);

	const loginState = useContext(LoginContext);
	const cartContext = useContext(CartContext);

	function toggleDrawer() {
		setOpenedDrawer(!openedDrawer);
	}

	function changeNav(event) {
		if (openedDrawer) {
			setOpenedDrawer(false);
		}
	}

	useEffect(() => {
		cartContext.fetchCartBook();
	}, [loginState.isLoggedIn.username]);

	return (
		<header>
			<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/" onClick={changeNav}>
						<FontAwesomeIcon
							icon={['fab', 'bootstrap']}
							className="ms-1"
							size="lg"
						/>

						<span className="ms-2 h5">Shop</span>
					</Link>

					<div
						className={
							'navbar-collapse offcanvas-collapse ' +
							(openedDrawer ? 'open' : '')
						}
					>
						<ul className="navbar-nav me-auto mb-lg-0">
							<li className="nav-item">
								<Link
									to={
										loginState.isLoggedIn.role === 'user'
											? '/bookstore'
											: 'book'
									}
									className="nav-link"
									replace
									// onClick={changeNav}
								>
									Books
								</Link>
							</li>
						</ul>
						<Link to="/cart">
							<button
								type="button"
								className="btn btn-outline-dark me-3 d-none d-lg-inline"
							>
								<FontAwesomeIcon icon={['fas', 'shopping-cart']} />
								<span className="ms-3 badge rounded-pill bg-dark">
									{cartContext.backendCartBook.length}
								</span>
							</button>
						</Link>
						<ul className="navbar-nav mb-2">
							<li className="nav-item dropdown">
								<div
									className="nav-link dropdown-toggle"
									data-toggle="dropdown"
									id="userDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									onClick={toggleDrawer}
								>
									<FontAwesomeIcon icon={['fas', 'user-alt']} />
								</div>
							</li>
							<div style={{ display: `${openedDrawer ? 'flex' : 'none'}` }}>
								{loginState.isLoggedIn.username ? (
									`Hello ${loginState.isLoggedIn.username}`
								) : (
									<>
										<div>
											<Link
												to="/login"
												className="dropdown-item"
												onClick={changeNav}
											>
												Login
											</Link>
										</div>
										<div>
											<Link
												to="/signup"
												className="dropdown-item"
												onClick={changeNav}
											>
												Sign Up
											</Link>
										</div>
									</>
								)}
							</div>
						</ul>
					</div>

					<div className="d-inline-block d-lg-none">
						<button type="button" className="btn btn-outline-dark">
							<FontAwesomeIcon icon={['fas', 'shopping-cart']} />
							<span className="ms-3 badge rounded-pill bg-dark">0</span>
						</button>
						<button
							className="navbar-toggler p-0 border-0 ms-3"
							type="button"
							// onClick={toggleDrawer}
						>
							<span className="navbar-toggler-icon"></span>
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;
