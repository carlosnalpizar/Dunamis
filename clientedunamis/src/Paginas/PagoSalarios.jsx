import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import '../Css/PagoSalarios.styles.css';
import { obtenerEmpleadosActivos } from '../api/empleados.api';
import { getComprobantePago, pagarSalario } from '../api/salarios.api'; 
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const PagoSalarios = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerEmpleadosActivos();
                setEmployees(response.data);
            } catch (error) {
                setError('Error al cargar los datos');
                console.error('Error al obtener empleados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const showAlert = (message, severity) => {
        toast.current.show({ severity, summary: 'Alerta', detail: message, life: 3000 });
    };

    const generateReportPDF = async (comprobante, infodeducciones) => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const fechaHoy = new Date().toISOString().substring(0, 10);
    
        // Encabezado
        doc.setFontSize(20);
        doc.text(`Reporte de Pago Realizado`, 105, 20, null, null, 'center');
        doc.setFontSize(12);
        doc.text(`Fecha: ${fechaHoy}`, 105, 30, null, null, 'center');
    
        // Espaciado antes de los detalles
        doc.setFontSize(16);
        doc.text('Detalles del Pago', 14, 50);
    
        // Agregar ID de Pago
        doc.setFontSize(12);
        doc.text(`Consecutivo del Pago: ${comprobante.idPago}`, 14, 60);
    
        // Formatear la fecha sin la zona horaria
        const fechaPagoFormateada = comprobante.fechaComprobante.split('T')[0];
    
        // Crear la tabla con ajustes en los estilos
        doc.autoTable({
            startY: 70,
            head: [['Cédula', 'Nombre Completo', 'Fecha de Pago', 'Monto Final', 'Descripción']],
            body: [
                [
                    comprobante.cedulaEmpleado,
                    `${comprobante.nombreEmpleado} ${comprobante.apellido1Empleado} ${comprobante.apellido2Empleado}`,
                    fechaPagoFormateada, // Fecha formateada
                    `$${comprobante.montoFinal.toFixed(2)}`,
                    comprobante.descripcion
                ]
            ],
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontSize: 14 },
            bodyStyles: { fontSize: 14, cellPadding: 6 }, // Ajuste de padding
            columnStyles: {
                0: { cellWidth: 25 }, // Cédula
                1: { cellWidth: 55 }, // Nombre Completo
                2: { cellWidth: 30 }, // Fecha de Pago
                3: { cellWidth: 30 }, // Monto
                4: { cellWidth: 60 }, // Descripción ajustable y más ancha
            },
            styles: { font: 'helvetica', halign: 'center', valign: 'middle', overflow: 'linebreak' }, // Ajuste de desbordamiento
            tableWidth: 'wrap', // Ajustar el ancho de la tabla al contenido
        });
    
        const finalY = doc.lastAutoTable.finalY;
    
        // Espaciado antes de la tabla de deducciones
        doc.setFontSize(16);
        doc.text('Deducciones Aplicadas', 14, finalY + 20);
    
        // Crear la tabla con deducciones
        doc.autoTable({
            startY: finalY + 30,
            head: [['Tipo de Deducción', 'Descripción', 'Monto']],
            body: infodeducciones.map(deduccion => [
                deduccion.tipoDeduccion,
                deduccion.descripcionDeduccion,
                `${(deduccion.montoDeduccion * 100).toFixed(2)}%`
            ]),
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontSize: 14 },
            bodyStyles: { fontSize: 14, cellPadding: 6 }, // Ajuste de padding
            columnStyles: {
                0: { cellWidth: 30 }, // Tipo de Deducción
                1: { cellWidth: 80 }, // Descripción
                2: { cellWidth: 30 }, // Monto
            },
            styles: { font: 'helvetica', halign: 'center', valign: 'middle', overflow: 'linebreak' }, // Ajuste de desbordamiento
            tableWidth: 'wrap', // Ajustar el ancho de la tabla al contenido
        });
    
        doc.setFontSize(10);
        doc.text(`Generado por el sistema de pago`, 14, doc.lastAutoTable.finalY + 10);
        doc.text(`Firma del Responsable`, 14, doc.lastAutoTable.finalY + 30);
    
        // Esperar 2 segundos antes de guardar el PDF
        setTimeout(() => {
            doc.save(`Comprobante_Pago_${comprobante.cedulaEmpleado}_${fechaHoy}.pdf`);
        }, 2000); // 2000 milisegundos = 2 segundos
    };
    
    const handlePay = async (employeeId) => {
        try {
            await pagarSalario({ cedula: employeeId });
            const response = await getComprobantePago(); // Asegúrate de que esta función obtenga los datos correctos
            const { comprobante, infodeducciones } = response.data; // Desestructurar la respuesta
            await generateReportPDF(comprobante, infodeducciones);
            showAlert('Salario pagado con éxito y reporte generado', 'success');
        } catch (error) {
            showAlert(`Error al pagar el salario: ${error.response?.data || error.message}`, 'error');
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.PersonaCedula.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="pago-salarios-container">
            <Toast ref={toast} />
            <Card className="pago-salarios-card">
                <div className="pago-salarios-header">
                    <h2 className="pago-salarios-title">Pago salarios</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Buscar empleado por cédula o nombre"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <Button icon={PrimeIcons.SEARCH} className="p-button-raised p-button-rounded search-button" />
                </div>
                {filteredEmployees.length > 0 ? (
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre y Apellidos</th>
                                <th>Fecha de Pago</th>
                                <th>Pagar Salario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee => {
                                const fechaDePago = new Date(employee.fechaDePago).toISOString().split('T')[0];
                                const yaPagado = employee.salarioPagado; // Asume que este campo indica si ya se pagó

                                return (
                                    <tr key={employee.PersonaCedula}>
                                        <td>{employee.PersonaCedula}</td>
                                        <td>{employee.nombre} {employee.apellido1} {employee.apellido2}</td>
                                        <td className={fechaDePago === todayDateString ? 'fecha-pago-destacada' : ''}>
                                            {fechaDePago} {/* Convertimos la fecha a un formato legible */}
                                        </td>
                                        <td>
                                            <Button
                                                label="Pagar Salario"
                                                className={`p-button-raised p-button-rounded pay-button ${fechaDePago !== todayDateString ? 'disabled' : ''}`}
                                                onClick={() => handlePay(employee.PersonaCedula)}
                                                disabled={fechaDePago !== todayDateString || yaPagado}
                                            />
                                        </td>
                                    </tr>
                                );
                                
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No se encontraron empleados.</p>
                )}
            </Card>
        </div>
    );
};

export default PagoSalarios;
