import React, { useState } from 'react';
import axios from 'axios';
import './css/login.css';

export const Login = ({ onLoginSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                // Register new user
                await axios.post('/api/auth/register', { username, password });
                alert('Registration successful! Please login.');
                setIsRegistering(false);
            } else {
                // Login - test credentials with /api/auth/login
                await axios.get('/api/auth/login', {
                    auth: {
                        username: username,
                        password: password
                    }
                });

                // Store credentials in localStorage (simple approach)
                localStorage.setItem('auth', btoa(`${username}:${password}`));

                // Configure axios to use basic auth for all requests
                axios.defaults.auth = {
                    username: username,
                    password: password
                };

                onLoginSuccess();
            }
        } catch (err) {
            console.error('Auth error:', err);
            if (err.response?. status === 401) {
                setError('Invalid username or password');
            } else {
                setError(err.response?.data?.error || 'Authentication failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{isRegistering ? 'Register' :  'Login'}</h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target. value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : (isRegistering ? 'Register' : 'Login')}
                    </button>
                </form>

                <p className="toggle-text">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        type="button"
                        className="toggle-button"
                        onClick={() => setIsRegistering(! isRegistering)}
                    >
                        {isRegistering ?  'Login' : 'Register'}
                    </button>
                </p>
            </div>
        </div>
    );
};