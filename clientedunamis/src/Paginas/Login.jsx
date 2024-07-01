import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import '../Css/login.styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempted', { username, password });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-form-section">
                    <h1>¡Bienvenido a Innova!</h1>
                    <form onSubmit={handleLogin}>
                        <div className="p-field usuario">
                            <InputText 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                placeholder="Usuario" 
                            />
                        </div>
                        <div className="p-field contrasena">
                            <Password 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Contraseña" 
                                feedback={false}
                                inputClassName="p-password-input"
                              
                            />
                        </div>
                        <div className="form-buttons">
                            <Button type="submit" label="Ingresar" className="btn-ingresar" />
                        </div>
                    </form>
                </div>
                <div className="logo-section">
                    <img src="../../logo2.png" alt="Innova Logo" className="logo" />
                </div>
            </div>
        </div>
    );
};

export default Login;