import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/bitacora.styles.css';

const Bitacora = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reportes, setReportes] = useState([
        { accionRealizada: 'Consulta de salario', fecha: '2024-06-15', nombreApellido: 'Nombre Apellido 1' },
        { accionRealizada: 'Se registro un usuario', fecha: '2024-06-16', nombreApellido: 'Nombre Apellido 2' },
        { accionRealizada: 'accion', fecha: '2024-06-17', nombreApellido: 'Nombre Apellido 3' },
        { accionRealizada: 'accion', fecha: '2024-06-18', nombreApellido: 'Nombre Apellido 4' },
        { accionRealizada: 'accion', fecha: '2024-06-19', nombreApellido: 'Nombre Apellido 5' },
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredReportes = reportes.filter(reporte =>
        reporte.nombreApellido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="Bitacora-container">
            <Card className="bitacora-card">
                <div className="bitacora-header">
                    <h2 className="bitacora-title">Bitácora</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Buscar por nombre y apellido"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <Button icon={PrimeIcons.SEARCH} className="p-button-raised p-button-rounded search-button" />
                </div>
                <table className="bitacora-table">
                    <thead>
                        <tr>
                            <th>Acción Realizada</th>
                            <th>Fecha</th>
                            <th>Nombre y Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReportes.map((reporte, index) => (
                            <tr key={index}>
                                <td>{reporte.accionRealizada}</td>
                                <td>{reporte.fecha}</td>
                                <td>{reporte.nombreApellido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default Bitacora;
