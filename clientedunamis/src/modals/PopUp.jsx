import React from 'react';
import { Button } from 'primereact/button';
import '../Css/popup.styles.css'; // Asegúrate de tener los estilos adecuados

const PopupContent = ({ consultaId, data, onClose }) => {
    // Renderiza diferentes estructuras de tabla según la consulta
    switch (consultaId) {
        case 1: // Nuevo caso para "Consultar posición y detalles del empleado"
            return (
                <table className="popup-table">
                    <thead>
                        <tr>
                            <th>Descripción de Posición</th>
                            <th>Salario Bruto</th>
                            <th>ID Empleado</th>
                            <th>Cédula del Empleado</th>
                            <th>Fecha de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => (
                            <tr key={row.idEmpleado}>
                                
                                <td>{row.descripcionPosicion}</td>
                                <td>{row.salario}</td>
                                <td>{row.idEmpleado}</td>
                                <td>{row.PersonaCedula}</td>
                                <td>{new Date(row.fechaDePago).toLocaleDateString()}</td>
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
                case 3:
                    return (
                        <table className="popup-table">
                            <thead>
                                <tr>
                                    <th>ID Pago</th>
                                    <th>Monto Final</th>
                                    <th>Fecha Comprobante</th>
                                    <th>Cédula Empleado</th>
                                    <th>Nombre Empleado</th>
                                    <th>Apellido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(row => (
                                    <tr key={row.idPago}>
                                        <td>{row.idPago}</td>
                                        <td>{row.montoFinal}</td>
                                        <td>{new Date(row.fechaComprobante).toLocaleDateString()}</td>
                                        <td>{row.cedulaEmpleado}</td>
                                        <td>{row.nombreEmpleado}</td>
                                        <td>{row.apellido1Empleado} {row.apellido2Empleado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    );

                case 4: // Asegúrate de usar el ID correcto según tu implementación
                    return (
                        <table className="popup-table">
                            <thead>
                                <tr>
                                    <th>ID Deducción</th>
                                    <th>Descripción</th>
                                    <th>Monto Deducción</th>
                                    <th>ID Pago</th>
                                    <th>Tipo Deducción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(row => (
                                    <tr key={row.idDeducciones}>
                                        <td>{row.idDeducciones}</td>
                                        <td>{row.descripcionDeduccion}</td>
                                        <td>{row.montoDeduccion}</td>
                                        <td>{row.idPagos}</td>
                                        <td>{row.tipoDeduccion}</td>
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
            case 8:
            return (
                <table className="popup-table">
                    <thead>
                        <tr>
                            <th>ID Pago</th>
                            <th>Cédula del Empleado</th>
                            <th>Fecha de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => (
                            <tr key={row.idPagos}>
                                <td>{row.idPagos}</td>
                                <td>{row.Empleado_Cedula}</td>
                                <td>{new Date(row.fecha_Pago).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );

            case 9:
            return (
                <table className="popup-table">
                    <thead>
                        <tr>
                            <th>ID Pago</th>
                            <th>Monto Final</th>
                            <th>Fecha del Comprobante</th>
                            <th>Cédula del Empleado</th>
                            <th>Nombre del Empleado</th>
                            <th>Apellido</th>
                            <th>Correo Electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(row => (
                            <tr key={row.idPago}>
                                <td>{row.idPago}</td>
                                <td>{row.montoFinal}</td>
                                <td>{new Date(row.fechaComprobante).toLocaleDateString()}</td>
                                <td>{row.cedulaEmpleado}</td>
                                <td>{row.nombreEmpleado}</td>
                                <td>{row.apellido1Empleado} {row.apellido2Empleado}</td>
                                <td>{row.correoEmpleado}</td>
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
