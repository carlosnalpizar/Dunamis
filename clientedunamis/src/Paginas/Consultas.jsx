import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../Css/consultas.styles.css'; 

const Consultas = () => {
    const [consultas] = useState([
        { id: 1, consulta: 'Salario bruto actual por empleado por periodos específicos' },
        { id: 2, consulta: 'Trabajos extras realizados por ID de empleados' },
        { id: 3, consulta: 'Trabajos extras pagados a empleados periodos específicos' },
        { id: 4, consulta: 'Historial de salarios por empleado' },
        { id: 5, consulta: 'Empleados según sus roles' },
        { id: 6, consulta: 'Empleados activos' },
        { id: 7, consulta: 'Deducciones por ley por periodos específicos' },
        { id: 8, consulta: 'Salarios totales pagados por empleado por tiempos específicos' },
        { id: 9, consulta: 'Horas trabajadas por empleado por periodos específicos' },
        { id: 10, consulta: 'Fecha de contrato de empleado' }
    ]);

    const handleRealizarConsulta = (consultaId) => {
        const consulta = consultas.find(c => c.id === consultaId);
        alert(`Realizar consulta: ${consulta.consulta}`);
    };

    return (
        <div className="consultas-container">
            <Card className="consultas-card">
                <div className="consultas-header">
                    <h2 className="consultas-title">Consultas</h2>
                </div>
                <table className="consultas-table">
                    <thead>
                        <tr>
                            <th>Consulta</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map(consulta => (
                            <tr key={consulta.id}>
                                <td>{consulta.consulta}</td> 
                                <td>
                                    <Button
                                        label="Realizar consulta"
                                        className="p-button-raised p-button-rounded btnConsulta"
                                        onClick={() => handleRealizarConsulta(consulta.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default Consultas;
