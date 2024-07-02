import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/estadoEmpleados.styles.css';

const ReportesSolicitados = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reportes, setReportes] = useState([
        { id: 1, tipo: 'Reporte salario pagado', nombreApellido: 'Nombre Apellido 1' },
        { id: 2, tipo: 'Tipo Reporte', nombreApellido: 'Nombre Apellido 2' },
        { id: 3, tipo: 'Tipo Reporte', nombreApellido: 'Nombre Apellido 3' },
        { id: 4, tipo: 'Tipo Reporte', nombreApellido: 'Nombre Apellido 4' },
        { id: 5, tipo: 'Tipo Reporte', nombreApellido: 'Nombre Apellido 5' },
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredReportes = reportes.filter(reporte =>
        reporte.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporte.nombreApellido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="estado-empleados-container">
            <Card className="estado-empleados-card">
                <div className="estado-empleados-header">
                    <h2 className="estado-empleados-title">Lista de Reportes Solicitados</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Buscar reporte"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <Button icon={PrimeIcons.SEARCH} className="p-button-raised p-button-rounded search-button" />
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Tipo de Reporte</th>
                            <th>Usuario que solicitó</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReportes.map(reporte => (
                            <tr key={reporte.id}>
                                <td>{reporte.tipo}</td>
                                <td>{reporte.nombreApellido}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ReportesSolicitados;
