import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../Css/Reportes.styles.css'; 

const Reportes = () => {
    const [reportes] = useState([
        { id: 1, reporte: 'Reporte de salarios actuales' },
        { id: 2, reporte: 'Reporte salarios pagados' },
        { id: 3, reporte: 'Reporte deducciones por ley' },
        { id: 4, reporte: 'Reporte historial salarial' },
        { id: 5, reporte: 'Reporte de desglose salarial' },
        { id: 6, reporte: 'Reporte trabajos extras realizados y pagados' },
        { id: 7, reporte: 'Reporte de longevidad de empleados en la empresa' },
        { id: 8, reporte: 'Reporte de lista de empleados' },
        { id: 9, reporte: 'Reporte del pago realizado' },
        { id: 10, reporte: 'Reporte de empleados activos' }
    ]);

    const handleGenerarReporte = (reporteId) => {
        const reporte = reportes.find(r => r.id === reporteId);
        alert(`Generar reporte: ${reporte.reporte}`);
       
    };

    return (
        <div className="reportes-container">
            <Card className="reportes-card">
                <div className="reportes-header">
                    <h2 className="reportes-title">Reportes</h2>
                </div>
                <table className="reportes-table">
                    <thead>
                        <tr>
                            <th>Reporte</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportes.map(reporte => (
                            <tr key={reporte.id}>
                                <td>{reporte.reporte}</td> 
                                <td>
                                    <Button
                                        label="Generar reporte"
                                        className="p-button-raised p-button-rounded btnReporte"
                                        onClick={() => handleGenerarReporte(reporte.id)}
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

export default Reportes;
