import './css/App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Route, Routes } from 'react-router-dom';
import { AddBook, DetailBook, Books, Login } from './components';
import Signup from './components/Signup';
import SignIn from './components/Signin';
import Signup2 from './components/Signup2';
import Comment from './components/Comment';
import Comments from './components/Comments';
import ShoppingCart from './components/ShoppingCart';
import Header from './components/Header';
import Bookstore from './components/Bookstore';

function App() {
	return (
		<div className="App">
			<Header></Header>
			<Routes>
				<Route path="/addBook" element={<AddBook />} />

				<Route path="/book/:bookcode" element={<DetailBook />}></Route>
				<Route path="/book" element={<Books />}></Route>
				<Route path="/bookstore" element={<Bookstore />}></Route>
				<Route path="/login" element={<SignIn />}></Route>
				<Route path="/signup" element={<Signup2 />}></Route>
				<Route path="/cart" element={<ShoppingCart />}></Route>
			</Routes>
			{/* <Footer /> */}
			{/* <DisplayText /> */}
			{/* <ShoppingCart /> */}
		</div>
	);
}

export default App;
