import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../Css/modalEditar.styles.css';

const ModalEditar = ({ employee, visible, onClose, onSave }) => {
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });
    const toast = useRef(null);

    useEffect(() => {
        setEditedEmployee({ ...employee });
    }, [employee]);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const cedulaRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!editedEmployee.nombre || !editedEmployee.apellido1 || !editedEmployee.apellido2 || !editedEmployee.cedula || !editedEmployee.correo || !editedEmployee.posicion) {
            showAlert('Todos los campos son obligatorios.');
            return;
        }
        if (!nameRegex.test(editedEmployee.nombre)) {
            showAlert('El nombre solo puede contener letras.');
            return;
        }
        if (!nameRegex.test(editedEmployee.apellido1)) {
            showAlert('El primer apellido solo puede contener letras.');
            return;
        }
        if (!nameRegex.test(editedEmployee.apellido2)) {
            showAlert('El segundo apellido solo puede contener letras.');
            return;
        }
        if (!cedulaRegex.test(editedEmployee.cedula)) {
            showAlert('La cédula solo puede contener números.');
            return;
        }
        if (!emailRegex.test(editedEmployee.correo)) {
            showAlert('El correo debe tener un formato válido e incluir "@".');
            return;
        }
        if (!editedEmployee.fechaInicio || !editedEmployee.fechaFin) {
            showAlert('Debe seleccionar las fechas.');
            return;
        }
        onSave(editedEmployee);
    };

    return (
        <>
            <Toast ref={toast} />
            <Dialog 
                header="Modificar Empleado" 
                visible={visible} 
                onHide={onClose}
                className="modal-editar"
                style={{ width: '500px' }}
            >
                <div className="modal-content">
                    <div className="input-group">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText id="nombre" name="nombre" value={editedEmployee.nombre || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="apellido1">Apellido 1</label>
                        <InputText id="apellido1" name="apellido1" value={editedEmployee.apellido1 || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="apellido2">Apellido 2</label>
                        <InputText id="apellido2" name="apellido2" value={editedEmployee.apellido2 || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cedula">Cédula</label>
                        <InputText id="cedula" name="cedula" value={editedEmployee.PersonaCedula || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="correo">Correo</label>
                        <InputText id="correo" name="correo" value={editedEmployee.correo || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="posicion">Posición</label>
                        <InputText id="posicion" name="posicion" value={editedEmployee.posicion || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fechaInicio">Fecha de inicio</label>
                        <Calendar id="fechaInicio" name="fechaInicio" value={editedEmployee.fechaInicio} onChange={(e) => handleInputChange({ target: { name: 'fechaInicio', value: e.value } })} dateFormat="dd/mm/yy"  />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fechaFin">Fecha de fin</label>
                        <Calendar id="fechaFin" name="fechaFin" value={editedEmployee.fechaFin} onChange={(e) => handleInputChange({ target: { name: 'fechaFin', value: e.value } })} dateFormat="dd/mm/yy" />
                    </div>
                </div>
                <div className="modal-footer">
                    <Button label="Modificar" onClick={handleSave} className="btnModificar" />
                    <Button label="Cancelar" onClick={onClose} className=" btnCancelar" />
                </div>
            </Dialog>
        </>
    );
};

export default ModalEditar;
