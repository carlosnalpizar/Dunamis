import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import '../Css/login.styles.css';
import { inicioSesion } from '../api/login.api';
import Cookies from 'universal-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const toast = React.useRef(null);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            showAlert('Por favor, ingresa usuario y contraseña.');
            return;
        }

        const cookie = new Cookies();
        const fechaExpiracionCookie = new Date();
        fechaExpiracionCookie.setTime(fechaExpiracionCookie.getTime() + 60000 * 60); // una hora

        try {
            const response = await inicioSesion(username, password);

            if (response.status === 200) {
                const userData = response.data.usuario[0];
                console.log('Inicio de sesión exitoso:', response.data);
                cookie.set('user', userData.idUsuario, { expires: fechaExpiracionCookie, path: '/' });
                cookie.set('pass', userData.contrasena, { expires: fechaExpiracionCookie, path: '/' });
                cookie.set('loggeado', true, { expires: fechaExpiracionCookie, path: '/' });
                cookie.set('rol', userData.idRoles, { expires: fechaExpiracionCookie, path: '/' });
                window.location.href = `/principal`;
            } else {
                if (response.data.mensaje === 'Usuario o contraseña incorrectos') {
                    showAlert('Usuario o contraseña incorrectos.');
                } else {
                    showAlert(response.data.mensaje || 'Error al iniciar sesión');
                }
                console.log('Error al iniciar sesión:', response.data);
            }
        } catch (error) {
            setError('Por favor, intenta nuevamente.');
            showAlert('Por favor, intenta nuevamente.');
            console.log('Error al intentar iniciar sesión:', error);
        }
    };

    return (
        <div className="login-container">
            <Toast ref={toast} />
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




/*USO DE COOKIES
                const cookies= new Cookies();
                const prueba = cookies.get('user')
                console.log(prueba)*/