import './App.css';
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
	const [userName, setName]=useState('')
	const [email, setEmail]=useState('')
	const [password, setPassword]=useState('')

	async function Register(event) {
		event.preventDefault()
		
		const response = await fetch('/api/register', {
      method: 'POST', 
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName,
				email,
				password,
			}),
		})
		const data = await response.json()
		console.log(data)
	}

  return (
	<div>
		<div>
			<h1>Register</h1>
			<form onSubmit={Register}>
				<input 
					value={userName}
					onChange={(e) => setName(e.target.value)}
					type="text" 
					placeholder="Name" 
				/>
				<input 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email" 
					placeholder="Email" 
				/>
				<input 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password" 
					placeholder="Password" 
				/>
				<input type="submit" value="Register" />
			</form>
		</div>

		<div>
			<Router>
				<Switch>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Switch>
			</Router>
		</div>
	</div>
  );
}

export default App;
