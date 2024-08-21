import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../Css/Reportes.styles.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { obtenerEmpleadosActivos, 
    obtenerEmpleadosAll, 
    obtenerEmpleadosInactivos, 
    obtenerSalariosActuales, 
    obtenerLongevidad, 
    obtenerDeducciones,
    obtenerTrabajosExtras, 
    consultarMasExtras} from '../api/reportes.api'; // Importar las funciones del API

const Reportes = () => {
    const [reportes] = useState([
        { id: 1, reporte: 'Reporte de empleados activos' },
        { id: 2, reporte: 'Reporte de empleados inactivos' },
        { id: 3, reporte: 'Reporte de salarios actuales' },
        { id: 4, reporte: 'Reporte de lista de empleados' },
        { id: 5, reporte: 'Reporte de longevidad de empleados en la empresa' },
        { id: 6, reporte: 'Reporte deducciones por ley' },
        { id: 7, reporte: 'Reporte trabajos extras realizados' },
        { id: 8, reporte: 'Reporte de empleado con más trabajos extra sin cobrar' },
    ]);

    /*
        { id: 2, reporte: 'Reporte salarios pagados este mes' },
        { id: 4, reporte: 'Reporte historial salarial' },
    */


    const toast = React.useRef(null);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handleGenerarReporte = async (reporteId, reporte) => {
        const doc = new jsPDF();
    
        // Obtener la fecha de hoy en formato YYYY-MM-DD
        const fechaHoy = new Date().toISOString().substring(0, 10);
    
        switch (reporteId) {
            case 1:
                doc.text(`Reporte de empleados activos - ${fechaHoy}`, 10, 10);
                try {
                    const response = await obtenerEmpleadosActivos();
                    const empleados = response.data;
                    doc.autoTable({
                        head: [['ID', 'Posición', 'Fecha de Pago', 'Fecha de Ingreso', 'Cantidad de Trabajos Extras', 'Nombre', 'Correo', 'Salario en colones']],
                        body: empleados.map(e => [
                            e.idEmpleado,
                            e.descripcionPosicion,
                            e.fechaDePago.substring(0, 10),  // Extrae solo la fecha
                            e.fechaDeIngreso.substring(0, 10),
                            e.cantidadTrabajosExtras,
                            `${e.nombre} ${e.apellido1} ${e.apellido2}`,
                            e.correo,
                            e.salario
                        ]),
                    });
                } catch (error) {
                    showAlert("Error al generar el reporte de empleados activos");
                }
                break;
            case 2:
                doc.text(`Reporte de empleados inactivos - ${fechaHoy}`, 10, 10);
                try {
                    const response = await obtenerEmpleadosInactivos();
                    const empleados = response.data;
                    doc.autoTable({
                        head: [['ID', 'Posición', 'Fecha de Pago', 'Fecha de Ingreso', 'Cantidad de Trabajos Extras', 'Nombre', 'Correo', 'Salario en colones']],
                        body: empleados.map(e => [
                            e.idEmpleado,
                            e.descripcionPosicion,
                            e.fechaDePago.substring(0, 10),  // Extrae solo la fecha
                            e.fechaDeIngreso.substring(0, 10),
                            e.cantidadTrabajosExtras,
                            `${e.nombre} ${e.apellido1} ${e.apellido2}`,
                            e.correo,
                            e.salario
                        ]),
                    });
                } catch (error) {
                    showAlert("Error al generar el reporte de empleados inactivos");
                }
                break;
            case 3:
                doc.text(`Reporte de salarios actuales - ${fechaHoy}`, 10, 10);
                try {
                    const response = await obtenerSalariosActuales();
                    const salarios = response.data;
                    doc.autoTable({
                        head: [['Cédula', 'Nombre Completo', 'Salario']],
                        body: salarios.map(s => [
                            s.PersonaCedula,
                            `${s.nombre} ${s.apellido1} ${s.apellido2}`,
                            s.salario
                        ]),
                    });
                } catch (error) {
                    showAlert("Error al generar el reporte de salarios actuales");
                }
                break;
            case 4:
                doc.text(`Reporte de lista de empleados - ${fechaHoy}`, 10, 10);
                try {
                    const response = await obtenerEmpleadosAll();
                    const empleados = response.data;
                    doc.autoTable({
                        head: [['ID', 'Posición', 'Salario', 'Fecha de Pago', 'Fecha de Ingreso', 'Cantidad de Trabajos Extras', 'Nombre Completo', 'Correo', 'Activo']],
                        body: empleados.map(e => [
                            e.idEmpleado,
                            e.descripcionPosicion,
                            e.salario,
                            e.fechaDePago.substring(0, 10),  // Extrae solo la fecha
                            e.fechaDeIngreso.substring(0, 10),
                            e.cantidadTrabajosExtras,
                            `${e.nombre} ${e.apellido1} ${e.apellido2}`,
                            e.correo,
                            e.activo ? 'Sí' : 'No'
                        ]),
                    });
                } catch (error) {
                    showAlert("Error al generar el reporte de lista de empleados");
                }
                break;
            case 5:
                    doc.text(`Reporte de longevidad de empleados en la empresa - ${fechaHoy}`, 10, 10);
                    try {
                        const response = await obtenerLongevidad();
                        const longevidad = response.data;
                        doc.autoTable({
                            head: [['Cédula', 'Nombre Completo', 'Posición', 'Salario', 'Fecha de Ingreso', 'Años en la Empresa', 'Meses en la Empresa']],
                            body: longevidad.map(l => [
                                l.PersonaCedula,
                                `${l.nombre} ${l.apellido1} ${l.apellido2}`,
                                l.descripcionPosicion,
                                l.salario,
                                l.fechaDeIngreso.substring(0, 10),  // Extrae solo la fecha
                                l.añosEnEmpresa,
                                l.mesesEnEmpresa
                            ]),
                        });
                    } catch (error) {
                        showAlert("Error al generar el reporte de longevidad de empleados");
                    }
                    break;
            case 6:  
                    doc.text(`Reporte de deducciones por ley - ${fechaHoy}`, 10, 10);
                    try {
                        const response = await obtenerDeducciones();
                        const deducciones = response.data;
                        console.log(deducciones); // Verifica los datos en la consola
                        doc.autoTable({
                            head: [['Tipo de Deducción', 'Descripción', 'Porcentaje']],
                            body: deducciones.map(d => [
                                d.idDeducciones || 'N/A', // Manejo de datos nulos
                                d.descripcionDeduccion || 'N/A',
                                `${d.montoDeduccion ? Math.round(d.montoDeduccion * 100) : '0'}%`

                            ]),
                        });
                    } catch (error) {
                        showAlert("Error al generar el reporte de deducciones por ley");
                    }
                    break;
                    case 7:
                        doc.text(`Reporte de trabajos extras realizados - ${fechaHoy}`, 10, 10);
                        try {
                            const response = await obtenerTrabajosExtras();
                            const trabajosExtras = response.data;
                            doc.autoTable({
                                head: [['ID Trabajo Extra', 'Descripción', 'Cédula', 'Realizado por']],
                                body: trabajosExtras.map(te => [
                                    te.idTrabajosExtra,
                                    te.DescripcionTrabajoExtra,
                                    te.PersonaCedula,
                                    `${te.nombre} ${te.apellido1} ${te.apellido2}`,
                                ]),
                            });
                        } catch (error) {
                            showAlert("Error al generar el reporte de trabajos extras realizados");
                        }
                        break;
                    case 8:
                            doc.text(`Reporte de empleado con más trabajos extra sin cobrar- ${fechaHoy}`, 10, 10);
                            try {
                                const response = await consultarMasExtras(); // Asegúrate de que esta función esté definida en `reportes.api`
                                const empleados = response.data;
                                doc.autoTable({
                                    head: [['ID Empleado', 'Cédula', 'Nombre Completo', 'Cantidad de Trabajos Extras']],
                                    body: empleados.map(e => [
                                        e.idEmpleado,
                                        e.PersonaCedula,
                                        `${e.nombre} ${e.apellido1} ${e.apellido2}`,
                                        e.cantidadTrabajosExtras
                                    ]),
                                });
                            } catch (error) {
                                showAlert("Error al generar el reporte de empleado con más trabajos extra sin cobrar");
                            }
                            break;



                default:
                showAlert("Reporte no disponible.");
                return;
        }
    
        // Guardar el PDF generado con el nombre del reporte y la fecha
        doc.save(`${reporte}_${fechaHoy}.pdf`);
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
                                        onClick={() => handleGenerarReporte(reporte.id, reporte.reporte)}
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
