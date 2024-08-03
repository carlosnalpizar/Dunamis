import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import ModalConsultas from '../modals/ModalConsultas';
import ModalPeriodos from '../modals/ModalPeriodos';
import ModalDeducciones from '../modals/ModalDeducciones';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [periodModalVisible, setPeriodModalVisible] = useState(false);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [deduccionesModalVisible, setDeduccionesModalVisible] = useState(false);
    const toast = React.useRef(null);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const modalMapping = {
        1: () => setPeriodModalVisible(true),
        2: () => setModalVisible(true),
        3: () => setPeriodModalVisible(true),
        4: () => setModalVisible(true),
        7: () => setDeduccionesModalVisible(true),
        8: () => setPeriodModalVisible(true),
        9: () => setPeriodModalVisible(true),
        10: () => setModalVisible(true)
    };

    const handleRealizarConsulta = (consultaId) => {
        const consulta = consultas.find(c => c.id === consultaId);

        if (!consulta) {
            showAlert('Consulta no encontrada. Intente de nuevo.');
            return;
        }

        setSelectedConsulta(consultaId);

        const showModal = modalMapping[consultaId];
        if (showModal) {
            showModal();
        } else {
            showAlert(`Realizando consulta: ${consulta.consulta}`);
        }
        switch (consultaId) {
            case 1:
                showAlert(`Realizando consulta: ${consulta.consulta}. Asegúrese de tener los periodos específicos.`);
                break;
            case 2:
                showAlert(`Realizando consulta: ${consulta.consulta}. Necesita el ID del empleado.`);
                break;
            case 3:
                showAlert(`Realizando consulta: ${consulta.consulta}. Especifique el periodo requerido.`);
                break;
            case 4:
                showAlert(`Realizando consulta: ${consulta.consulta}. Revise el historial completo.`);
                break;
            case 5:
                showAlert(`Realizando consulta: ${consulta.consulta}. Filtrando por roles.`);
                break;
            case 6:
                showAlert(`Realizando consulta: ${consulta.consulta}. Obteniendo lista de empleados activos.`);
                break;
            case 7:
                showAlert(`Realizando consulta: ${consulta.consulta}. Verificando deducciones.`);
                break;
            case 8:
                showAlert(`Realizando consulta: ${consulta.consulta}. Calculando salarios totales.`);
                break;
            case 9:
                showAlert(`Realizando consulta: ${consulta.consulta}. Contabilizando horas trabajadas.`);
                break;
            case 10:
                showAlert(`Realizando consulta: ${consulta.consulta}. Consultando fechas de contrato.`);
                break;
            default:
                showAlert(`Realizar consulta: ${consulta.consulta}`);

        }
        

    };
    const handleAceptar = (data) => {
        console.log('Datos de consulta:', data);
        setModalVisible(false);
        setPeriodModalVisible(false);
        setDeduccionesModalVisible(false);
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
        </div>
    );
};

export default Consultas;
