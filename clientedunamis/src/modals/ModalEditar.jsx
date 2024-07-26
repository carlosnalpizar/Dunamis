import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import '../Css/modalEditar.styles.css';
import { getPosiciones } from '../api/posicion.api';

const ModalEditar = ({ employee, visible, onClose, onSave }) => {
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });
    const [positions, setPositions] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        if (employee) {
            setEditedEmployee({
                ...employee,
                fechaDeIngreso: employee.fechaDeIngreso ? new Date(employee.fechaDeIngreso) : null,
                fechaDePago: employee.fechaDePago ? new Date(employee.fechaDePago) : null,
            });
        }
    }, [employee]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPosiciones();
                setPositions(response.data.map(pos => ({ label: pos.descripcionPosicion, value: pos.idPosicion })));
            } catch (error) {
                console.error('Error al obtener posiciones:', error);
            }
        };
        fetchData();
    }, []);

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployee(prev => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (e) => {
        setEditedEmployee(prev => ({ ...prev, idPosicion: e.value }));
    };

    const handleSave = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const cedulaRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!editedEmployee.nombre || !editedEmployee.apellido1 || !editedEmployee.apellido2 || !editedEmployee.PersonaCedula || !editedEmployee.correo || !editedEmployee.idPosicion) {
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
        if (!cedulaRegex.test(editedEmployee.PersonaCedula)) {
            showAlert('La cédula solo puede contener números.');
            return;
        }
        if (!emailRegex.test(editedEmployee.correo)) {
            showAlert('El correo debe tener un formato válido e incluir "@".');
            return;
        }
        if (!editedEmployee.fechaDeIngreso || !editedEmployee.fechaDePago) {
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
                        <InputText id="cedula" name="PersonaCedula" value={editedEmployee.PersonaCedula || ''} onChange={handleInputChange} disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="correo">Correo</label>
                        <InputText id="correo" name="correo" value={editedEmployee.correo || ''} onChange={handleInputChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="posicion">Posición</label>
                        <Dropdown id="posicion" name="idPosicion" value={editedEmployee.idPosicion} options={positions} onChange={handleDropdownChange} placeholder="Seleccione una posición" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fechaInicio">Fecha de ingreso</label>
                        <Calendar id="fechaInicio" name="fechaDeIngreso" value={editedEmployee.fechaDeIngreso} onChange={(e) => handleInputChange({ target: { name: 'fechaDeIngreso', value: e.value } })} dateFormat="dd/mm/yy" disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fechaFin">Fecha de pago</label>
                        <Calendar id="fechaFin" name="fechaDePago" value={editedEmployee.fechaDePago} onChange={(e) => handleInputChange({ target: { name: 'fechaDePago', value: e.value } })} dateFormat="dd/mm/yy" />
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
