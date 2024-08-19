import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../Css/Reportes.styles.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { obtenerEmpleadosActivos, obtenerEmpleadosInactivos} from '../api/reportes.api'; // Importar las funciones del API

const Reportes = () => {
    const [reportes] = useState([
        { id: 1, reporte: 'Reporte de empleados activos' },
        { id: 2, reporte: 'Reporte de empleados inactivos' },
    ]);

    /*const [reportes] = useState([
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
    ]);*/


    const toast = React.useRef(null);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handleGenerarReporte = async (reporteId) => {
        const doc = new jsPDF();

        switch (reporteId) {
            case 1:
                doc.text("Reporte de empleados activos", 10, 10);
                try {
                    const response = await obtenerEmpleadosActivos();
                    const empleados = response.data;
                    doc.autoTable({
                        head: [['ID', 'Posición', 'Fecha de Pago', 'Fecha de Ingreso', 'Extras', 'Nombre', 'Correo']],
                        body: empleados.map(e => [
                            e.idEmpleado,
                            e.idPosicion,
                            e.fechaDePago.substring(0, 10),  // Extrae solo la fecha
                            e.fechaDeIngreso.substring(0, 10),
                            e.cantidadTrabajosExtras,
                            `${e.nombre} ${e.apellido1} ${e.apellido2}`,
                            e.correo
                        ]),
                    });
                } catch (error) {
                    showAlert("Error al generar el reporte de empleados activos");
                }
                break;
            case 2:
                doc.text("Reporte de empleados inactivos", 10, 10);
                try {
                    const response = await obtenerEmpleadosInactivos();
                    const empleados = response.data;
                    doc.autoTable({
                        head: [['ID', 'Posición', 'Fecha de Pago', 'Fecha de Ingreso', 'Extras', 'Nombre', 'Correo']],
                        body: empleados.map(e => [
                            e.idEmpleado,
                            e.idPosicion,
                            e.fechaDePago.substring(0, 10),  // Extrae solo la fecha
                            e.fechaDeIngreso.substring(0, 10),
                            e.cantidadTrabajosExtras,
                            `${e.nombre} ${e.apellido1} ${e.apellido2}`,
                            e.correo
                        ]),
                    });
                } catch (error) {
                    showAlert("Error al generar el reporte de empleados inactivos");
                }
                break;
            default:
                showAlert("Reporte no disponible.");
                return;
        }

        // Guardar el PDF generado
        doc.save(`reporte_${reporteId}.pdf`);
    };

    return (
        <div className="reportes-container">
            <Toast ref={toast} />
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
