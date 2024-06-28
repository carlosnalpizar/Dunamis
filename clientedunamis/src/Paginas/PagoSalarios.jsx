import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/PagoSalarios.styles.css';

const PagoSalarios = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Nombre Apellido 1' },
        { id: 2, name: 'Nombre Apellido 2' },
        { id: 3, name: 'Nombre Apellido 3' },
        { id: 4, name: 'Nombre Apellido 4' },
        { id: 5, name: 'Nombre Apellido 5' },
        { id: 6, name: 'Nombre Apellido 6' },
        { id: 7, name: 'Nombre Apellido 7' },
        { id: 8, name: 'Nombre Apellido 8' }
    ]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePay = (employeeId) => {
        console.log(`Pagar a empleado con ID: ${employeeId}`);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pago-salarios-container">
            <Card className="pago-salarios-card">
                <div className="pago-salarios-header">
                    <h2 className="pago-salarios-title">Pago salarios</h2>
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
                            <th>Pagar Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>
                                    <Button
                                        label="Pagar Salario"
                                        className="p-button-raised p-button-rounded pay-button"
                                        onClick={() => handlePay(employee.id)}
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

export default PagoSalarios;
