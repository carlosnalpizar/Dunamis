import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/gestionEmpleados.styles.css';

const GestionEmpleados = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Nombre Apellido 1', cedula: '123456789' },
        { id: 2, name: 'Nombre Apellido 2', cedula: '234567890' },
        { id: 3, name: 'Nombre Apellido 3', cedula: '345678901' },
        { id: 4, name: 'Nombre Apellido 4', cedula: '456789012' },
        { id: 5, name: 'Nombre Apellido 5', cedula: '567890123' },
        { id: 6, name: 'Nombre Apellido 6', cedula: '678901234' },
        { id: 7, name: 'Nombre Apellido 7', cedula: '789012345' },
        { id: 8, name: 'Nombre Apellido 8', cedula: '890123456' }
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (employeeId) => {
        console.log(`Editar empleado con ID: ${employeeId}`);
    };

    const handleDelete = (employeeId) => {
        setEmployees(employees.filter(employee => employee.id !== employeeId));
    };

    const filteredEmployees = employees.filter(employee =>
        employee.cedula.includes(searchTerm)
    );

    return (
        <div className="gestion-empleados-container">
            <Card className="gestion-empleados-card">
                <div className="gestion-empleados-header">
                    <h2 className="gestion-empleados-title">Gestión de empleados</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Consultar empleado por cédula"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <Button icon={PrimeIcons.SEARCH} className="p-button-raised p-button-rounded search-button" />
                </div>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Nombre Apellido</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>
                                    <Button
                                         label="Editar"
                                        className="p-button-rounded p-button-warning btnEditar"
                                        onClick={() => handleEdit(employee.id)}
                                    />
                                    <Button
                                         label="Eliminar"
                                        className="p-button-rounded p-button-danger btnEliminar"
                                        onClick={() => handleDelete(employee.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default GestionEmpleados;
