import React from 'react';
import { Card } from 'primereact/card';
import '../Css/inicio.styles.css';

const Inicio = () => {
    return (
        <div className="inicio-container">
            <Card className="hero-card">
                <div className="hero-section">
                    <div className="text-section">
                        <h1 className="welcome-message">Bienvenido a Innova</h1>
                        <p className="description">
                            Innova es una plataforma innovadora diseñada para ofrecer soluciones tecnológicas avanzadas, nuestro objetivo es mejorar la eficiencia y productividad a través de herramientas fáciles de usar.
                        </p>
                    </div>
                    <img src="/home.png" alt="Beautiful scenery" className="hero-image" />
                </div>
            </Card>
            <div className="cards-container">
                <Card title=" Gestión de Empleados" style={{ width: '25em', marginBottom: '2em' }}>
                    <p className="p-m-0">
                    Permite registrar nuevos empleados, mantener sus perfiles actualizados y gestionar información crucial.
                    </p>
                </Card>
                <Card title="Pagos" style={{ width: '25em', marginBottom: '2em' }}>
                    <p className="p-m-0">
                    Automatiza el proceso de cálculo de pago para los empleados, garantizando precisión y cumplimiento normativo.
                    </p>
                </Card>
                <Card title="Generación de PDF" style={{ width: '25em', marginBottom: '2em' }}>
                    <p className="p-m-0">
                    Permite descargar informacion relevante en formato PDF de manera rápida y sencilla.
                    </p>
                </Card>
            </div>
        </div>
    );
}

export default Inicio;
