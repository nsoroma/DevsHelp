// Import React and Router
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Login from '../src/pages/Login';
import Home from '../src/pages/Home';

// Logs login page or home page
function App() {
    return (
        <Router>
            <Routes>
                <Route 
                    exact path="/"
                    element={<Login />}
                />

                <Route
                    exact path="/home"
                    element={<Home />} 
                />
            </Routes>
        </Router>

    );
}

export default App;