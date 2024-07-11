import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import '../Css/login.styles.css';
import { inicioSesion } from '../api/login.api'; // Importa tu función de inicio de sesión
import Cookies from 'universal-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const cookie = new Cookies();
        const fechaExpiracionCookie = new Date();
        fechaExpiracionCookie.setTime(fechaExpiracionCookie.getTime() + 60000*60); //una hora

        try {
            const response = await inicioSesion(username, password);

            if (response.status === 200) {
                console.log('Inicio de sesión exitoso:', response.data);
                cookie.set('user', username, { expires: fechaExpiracionCookie, path: '/' });
                cookie.set('pass', password, { expires: fechaExpiracionCookie, path: '/' });
                window.location.href = `/inicio`;
                cookie.set('loggeado', true, { expires: fechaExpiracionCookie, path: '/' });
                /*const cookies= new Cookies();
                const prueba = cookies.get('user')
                console.log(prueba)*/
            } else {
                setError(response.data.mensaje || 'Error al iniciar sesión');
                console.log('Error al iniciar sesión:', response.data);
            }
        } catch (error) {
            setError('Error de red. Por favor, intenta nuevamente.');
            console.log('Error al intentar iniciar sesión:', error);
        }
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
                        {error && <p className="error-message">{error}</p>}
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
