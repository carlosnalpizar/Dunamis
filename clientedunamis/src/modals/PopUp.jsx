import React from 'react';
import { Button } from 'primereact/button';
import '../Css/popup.styles.css'; // Asegúrate de tener los estilos adecuados

const PopupContent = ({ consultaId, data, onClose }) => {
    // Renderiza diferentes estructuras de tabla según la consulta
    switch (consultaId) {
        case 1:
            return (
                <table className="popup-table">
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Salario Bruto</th>
                            {/* Agrega más encabezados según lo que necesites */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => (
                            <tr key={row.id}>
                                <td>{row.empleado}</td>
                                <td>{row.salarioBruto}</td>
                                {/* Agrega más celdas según los datos */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
            case 2:
                return (
                    <table className="popup-table">
                        <thead>
                            <tr>
                                <th>ID Trabajo Extra</th>
                                <th>Descripción del Trabajo Extra</th>
                                <th>ID Empleado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(row => (
                                <tr key={row.idTrabajosExtra}>
                                    <td>{row.idTrabajosExtra}</td>
                                    <td>{row.DescripcionTrabajoExtra}</td>
                                    <td>{row.idEmpleado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 6:
                    return (
                        <table className="popup-table">
                            <thead>
                                <tr>
                                    <th>ID Empleado</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(row => (
                                    <tr key={row.idEmpleado}>
                                        <td>{row.idEmpleado}</td>
                                        <td>{row.nombre}</td>
                                        <td>{row.apellido1} {row.apellido2}</td>
                                        <td>{row.activo?'Activo':'Inactivo'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    );

                    case 7:
            return (
                <table className="popup-table">
                    <thead>
                        <tr>
                            <th>ID Deducción</th>
                            <th>Descripción de Deducción</th>
                            <th>Monto de Deducción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => (
                            <tr key={row.idDeducciones}>
                                <td>{row.idDeducciones}</td>
                                <td>{row.descripcionDeduccion}</td>
                                <td>{row.montoDeduccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        default:
            return <div>No hay datos disponibles</div>;
    }
};

const Popup = ({ visible, consultaId, data, onClose }) => {
    if (!visible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <Button
                    icon="pi pi-times"
                    className="popup-close"
                    onClick={onClose}
                />
                <PopupContent consultaId={consultaId} data={data} />
            </div>
        </div>
    );
};

export default Popup;
