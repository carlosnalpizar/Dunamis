import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/estadoEmpleados.styles.css';

const EstadoEmpleados = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Nombre Apellido 1', status: 'Activo' },
        { id: 2, name: 'Nombre Apellido 2', status: 'Inactivo' },
        { id: 3, name: 'Nombre Apellido 3', status: 'Activo' },
        { id: 4, name: 'Nombre Apellido 4', status: 'Inactivo' },
        { id: 5, name: 'Nombre Apellido 5', status: 'Activo' },
        { id: 6, name: 'Nombre Apellido 6', status: 'Inactivo' },
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleStatus = (employeeId) => {
        setEmployees(employees.map(employee => 
            employee.id === employeeId 
                ? { ...employee, status: employee.status === 'Activo' ? 'Inactivo' : 'Activo' }
                : employee
        ));
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="estado-empleados-container">
            <Card className="estado-empleados-card">
                <div className="estado-empleados-header">
                    <h2 className="estado-empleados-title">Estado de empleados</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Buscar empleado"
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
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>
                                    <div className="status-container">
                                        <span className={`status-text ${employee.status.toLowerCase()}`}>
                                            {employee.status === 'Activo' ? 'Empleado Activo' : 'Empleado Inactivo'}
                                        </span>
                                        <Button
                                            label={employee.status === 'Activo' ? 'Desactivar' : 'Activar'}
                                            className={`p-button-raised p-button-rounded ${employee.status === 'Activo' ? 'active-button' : 'inactive-button'}`}
                                            onClick={() => toggleStatus(employee.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default EstadoEmpleados;
