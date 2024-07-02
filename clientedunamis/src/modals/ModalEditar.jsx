import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import '../Css/modalEditar.styles.css';

const ModalEditar = ({ employee, visible, onClose, onSave }) => {
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });

    useEffect(() => {
        setEditedEmployee({ ...employee });
    }, [employee]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedEmployee);
    };

    return (
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
                    <InputText id="cedula" name="cedula" value={editedEmployee.cedula || ''} onChange={handleInputChange} />
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
                    <Calendar id="fechaInicio" name="fechaInicio" value={editedEmployee.fechaInicio} onChange={handleInputChange} dateFormat="dd/mm/yy"  />
                </div>
                <div className="input-group">
                    <label htmlFor="fechaFin">Fecha de fin</label>
                    <Calendar id="fechaFin" name="fechaFin" value={editedEmployee.fechaFin} onChange={handleInputChange} dateFormat="dd/mm/yy" />
                </div>
            </div>
            <div className="modal-footer">
                <Button label="Modificar" onClick={handleSave} className="btnModificar" />
                <Button label="Cancelar" onClick={onClose} className=" btnCancelar" />
            </div>
        </Dialog>
    );
};

export default ModalEditar;