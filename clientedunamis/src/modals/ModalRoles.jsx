import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../Css/modalRoles.styles.css'
import 'primeicons/primeicons.css';

const ModalRoles = ({ visible, onClose, onAceptar }) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [filteredEmpleados, setFilteredEmpleados] = useState([]);

    const roles = [
        { label: 'Administrador', value: 'admin' },
        { label: 'Desarrollador', value: 'developer' },
        { label: 'Diseñador', value: 'designer' },
        { label: 'Analista', value: 'analyst' }
    ];

    const empleados = [
        { nombre: 'Juan Pérez', rol: 'admin' },
        { nombre: 'Ana Gómez', rol: 'developer' },
        { nombre: 'Luis Rodríguez', rol: 'designer' },
        { nombre: 'Marta López', rol: 'analyst' },
        { nombre: 'Carlos Fernández', rol: 'admin' },
        { nombre: 'Sofía Martínez', rol: 'developer' }
    ];

    const handleRoleChange = (e) => {
        const role = e.value;
        setSelectedRole(role);
        const filtered = empleados.filter(emp => emp.rol === role);
        setFilteredEmpleados(filtered);
    };

    const handleAceptar = () => {
        onAceptar({ role: selectedRole, empleados: filteredEmpleados });
        onClose();
    };

    return (
        <Dialog
            header={<div className="modal-header-title">Seleccionar Rol</div>}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={onClose}
            footer={
                <div className="modal-footer">
                    <Button label="Aceptar" onClick={handleAceptar} className="btnAceptarModalRo" />
                    <Button label="Cancelar" onClick={onClose} className="btnCancelarModalRo" />
                </div>
            }
        >
            <div className="p-field">
                <label htmlFor="roles">Rol</label>
                <Dropdown
                    id="roles"
                    value={selectedRole}
                    options={roles}
                    onChange={handleRoleChange}
                    placeholder="Selecciona un rol"
                />
            </div>
            {selectedRole && (
                <div className="p-field">
                    <label>Empleados en el rol seleccionado</label>
                    <ListBox
                        options={filteredEmpleados.map(emp => ({ label: emp.nombre, value: emp.nombre }))}
                        listStyle={{ maxHeight: '200px' }}
                        filter
                        filterPlaceholder="Buscar..."
                    />
                </div>
            )}
        </Dialog>
    );
};

export default ModalRoles;
