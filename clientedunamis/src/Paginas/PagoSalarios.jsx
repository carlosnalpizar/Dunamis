import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/PagoSalarios.styles.css';
import { useEffect } from 'react';
import { obtenerEmpleados } from '../api/empleados.api';

const PagoSalarios = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerEmpleados();
                setEmployees(response.data);
            } catch (error) {
                setError('Error al cargar los datos');
                console.error('Error al obtener bitácoras:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePay = (employeeId) => {
        console.log(`Pagar a empleado con ID: ${employeeId}`);
    };

    const filteredEmployees = employees.filter(employee =>
        employee.PersonaCedula.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

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
                            <th>Cedula</th>
                            <th>Pagar Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.PersonaCedula}>
                                <td>{employee.PersonaCedula}</td>
                                <td>
                                    <Button
                                        label="Pagar Salario"
                                        className="p-button-raised p-button-rounded pay-button"
                                        onClick={() => handlePay(employee.PersonaCedula)}
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
