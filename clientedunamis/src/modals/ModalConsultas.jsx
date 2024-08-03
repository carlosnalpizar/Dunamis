import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../Css/modalConsultas.styles.css';
import 'primeicons/primeicons.css';

const ModalConsultas = ({ visible, onClose, onAceptar }) => {
    const [selectedEmpleado, setSelectedEmpleado] = useState(null);

    const empleados = [
        { label: '1234567890', value: '1234567890' },
        { label: '0987654321', value: '0987654321' },
        { label: '1234567890', value: '1234567890' },
        { label: '0987654321', value: '0987654321' },
        { label: '1234567890', value: '1234567890' },
        { label: '0987654321', value: '0987654321' }
    ];

    const handleAceptar = () => {
        console.log('Empleado seleccionado:', selectedEmpleado);
        onAceptar(selectedEmpleado);
        onClose();
    };

    return (
        <Dialog
            header={<div className="modal-header-title">Escoger Empleado</div>}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onClose}
            footer={
                <div className="modal-footer">
                    <Button label="Aceptar" onClick={handleAceptar} className="btnAceptarModal" />
                    <Button label="Cancelar" onClick={onClose} className="btnCncelarModal" />
                </div>
            }
        >
            <div className="p-field">
                <label htmlFor="empleado">Empleado</label>
                <Dropdown
                    id="empleado"
                    value={selectedEmpleado}
                    options={empleados}
                    onChange={(e) => setSelectedEmpleado(e.value)}
                    placeholder="Selecciona un empleado"
                    filter
                    filterPlaceholder="Buscar..."
                    filterBy="label"
                />
            </div>
        </Dialog>
    );
};

export default ModalConsultas;
