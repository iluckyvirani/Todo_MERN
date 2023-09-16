import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<nav className='navbar navbar-expand-lg navbar-light bg-light'>
						<a
							className='navbar-brand'
							href='https://www.almabetter.com'
							target='_blank'>
							<img
								src='https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg'
								width='150'
								height='100'
								alt='almabetter.com'
							/>
						</a>
						<Link to='/' className='navbar-brand'>
							MERN-Stack Todo App
						</Link>
						<div className='collpase nav-collapse'>
							<ul className='navbar-nav mr-auto'>
								<li className='navbar-item'>
									<Link to='/' className='nav-link'>
										Todos
									</Link>
								</li>
								<li className='navbar-item'>
									<Link to='/create' className='nav-link'>
										Create Todo
									</Link>
								</li>
							</ul>
						</div>
					</nav>

					<Routes>
						<Route path='/' exact element={<TodosList />} />
						<Route path='/edit/:id' element={<EditTodo />} />
						<Route path='/create' element={<CreateTodo />} />
					</Routes>
				</div>
			</Router>
		);
	}
}

export default App;
