import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/estadoEmpleados.styles.css';
import { obtenerEmpleados } from '../api/empleados.api';

const EstadoEmpleados = () => {
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

    const toggleStatus = (employeeId) => {
        console.log('se modifico el estado del empleado con id:', employeeId)
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
                            <tr key={employee.idEmpleado}>
                                <td>{employee.PersonaCedula}</td>
                                <td>
                                    <div className="status-container">
                                        <span className={`status-text ${employee.activo}`}>
                                            {employee.activo === true ? 'Empleado Activo' : 'Empleado Inactivo'}
                                        </span>
                                        <Button
                                            label={employee.activo === true ? 'Desactivar' : 'Activar'}
                                            className={`p-button-raised p-button-rounded ${employee.activo === true ? 'active-button' : 'inactive-button'}`}
                                            onClick={() => toggleStatus(employee.PersonaCedula)}
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
