import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ModalConsultas from '../modals/ModalConsultas';
import ModalPeriodos from '../modals/ModalPeriodos';
import ModalDeducciones from '../modals/ModalDeducciones';
import ModalRoles from '../modals/ModalRoles';
import Popup from '../modals/PopUp'; // Importa el componente Popup
import { consultarComprobantePorPago, consultarPagosXEmpleado, getTexEmpleado } from '../api/consultas.api'; // Importa la función para obtener datos
import { obtenerEmpleadosActivos } from '../api/empleados.api';
import { obtenerDeducciones } from '../api/reportes.api'; // Asegúrate de tener la función para obtener deducciones

import '../Css/consultas.styles.css';

const Consultas = () => {
    const [consultas] = useState([
        { id: 2, consulta: 'Trabajos extras realizados por empleados' },
        { id: 6, consulta: 'Empleados activos' },
        { id: 7, consulta: 'Deducciones por ley' },
        { id: 8, consulta: 'Pagos por Empleado' },
        { id: 9, consulta: 'Consultar pago realizado' },
    ]);


    /*const [consultas] = useState([
        { id: 1, consulta: 'Salario bruto actual por empleado por periodos específicos' },
        { id: 3, consulta: 'Trabajos extras pagados a empleados periodos específicos' },
        { id: 4, consulta: 'Historial de salarios por empleado' },
        { id: 5, consulta: 'Empleados según sus roles' },
        { id: 8, consulta: 'Salarios totales pagados por empleado por tiempos específicos' },
        { id: 9, consulta: 'Horas trabajadas por empleado por periodos específicos' },
        { id: 10, consulta: 'Fecha de contrato de empleado' }
    ]);*/

    const [popupVisible, setPopupVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [periodModalVisible, setPeriodModalVisible] = useState(false);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [deduccionesModalVisible, setDeduccionesModalVisible] = useState(false);
    const [rolesModalVisible, setRolesModalVisible] = useState(false);
    const [popupData, setPopupData] = useState([]); // Estado para los datos del popup
    const toast = React.useRef(null);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const modalMapping = {
        1: () => setPeriodModalVisible(true),
        2: () => setPopupVisible(true),
        3: () => setPeriodModalVisible(true),
        4: () => setModalVisible(true),
        5: () => setRolesModalVisible(true),
        7: () => setDeduccionesModalVisible(true),
        8: () => setPeriodModalVisible(true),
        9: () => setPeriodModalVisible(true),
        10: () => setModalVisible(true)
    };

    const handleRealizarConsulta = async (consultaId) => {
        const consulta = consultas.find(c => c.id === consultaId);

        if (!consulta) {
            showAlert('Consulta no encontrada. Intente de nuevo.');
            return;
        }

        setSelectedConsulta(consultaId);

        if (consultaId === 2) {
            // Ejemplo de ID de empleado; en la práctica, obtén este valor de una entrada del usuario
            const cedulaEmpleado = prompt('Ingrese el ID del empleado:');
            if (!cedulaEmpleado) {
                showAlert('ID del empleado es necesario.');
                return;
            }

            try {
                const response = await getTexEmpleado(cedulaEmpleado);
                setPopupData(response.data);
                setPopupVisible(true);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                showAlert('Error al obtener datos.');
            }
        } else if (consultaId === 6) {
            try {
                const response = await obtenerEmpleadosActivos();
                setPopupData(response.data);
                setPopupVisible(true);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                showAlert('Error al obtener datos de empleados activos.');
            }
        } else if (consultaId === 7) {
            try {
                const response = await obtenerDeducciones();
                setPopupData(response.data);
                setPopupVisible(true);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                showAlert('Error al obtener datos de deducciones.');
            }
        }else if (consultaId === 8) { // Manejo para la consulta de pagos por empleado
            const cedulaEmpleado = prompt('Ingrese la cédula del empleado:');
            if (!cedulaEmpleado) {
                showAlert('Cédula del empleado es necesaria.');
                return;
            }

            try {
                const response = await consultarPagosXEmpleado(cedulaEmpleado);
                setPopupData(response.data);
                setPopupVisible(true);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                showAlert('Error al obtener datos de pagos por empleado.');
            }
        }else if (consultaId === 9) { // Manejo para la consulta de comprobante por pago
            const idPago = prompt('Ingrese el ID del pago:');
            if (!idPago) {
                showAlert('ID del pago es necesario.');
                return;
            }
    
            try {
                const response = await consultarComprobantePorPago(idPago);
                setPopupData(response.data);
                setPopupVisible(true);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                showAlert('Error al obtener datos de comprobante.');
            }
        }  else {
            const showModal = modalMapping[consultaId];
            if (showModal) {
                showModal();
            } else {
                showAlert(`Realizando consulta: ${consulta.consulta}`);
            }
        }
    };

    const handleAceptar = (data) => {
        console.log('Datos de consulta:', data);
        setModalVisible(false);
        setPeriodModalVisible(false);
        setDeduccionesModalVisible(false);
        setRolesModalVisible(false);
        setPopupVisible(false); // Ocultar popup al aceptar
    };

    return (
        <div className="consultas-container">
            <Toast ref={toast} />
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

            <ModalConsultas
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAceptar={handleAceptar}
                selectedConsulta={selectedConsulta}
            />

            <ModalPeriodos
                visible={periodModalVisible}
                onClose={() => setPeriodModalVisible(false)}
                onAceptar={handleAceptar}
                selectedConsulta={selectedConsulta}
            />
            <ModalDeducciones
                visible={deduccionesModalVisible}
                onClose={() => setDeduccionesModalVisible(false)}
                onAceptar={handleAceptar}
            />
            <ModalRoles
                visible={rolesModalVisible}
                onClose={() => setRolesModalVisible(false)}
                onAceptar={handleAceptar}
            />
            <Popup
                visible={popupVisible}
                consultaId={selectedConsulta}
                data={popupData}
                onClose={() => setPopupVisible(false)}
            />
        </div>
    );
};

export default Consultas;
