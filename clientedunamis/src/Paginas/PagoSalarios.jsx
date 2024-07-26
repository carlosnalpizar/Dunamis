import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import '../Css/PagoSalarios.styles.css';
import { obtenerEmpleadosActivos } from '../api/empleados.api';

const PagoSalarios = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await obtenerEmpleadosActivos();
                setEmployees(response.data);
            } catch (error) {
                setError('Error al cargar los datos');
                console.error('Error al obtener empleados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const handlePay = (employeeId) => {
        if (searchTerm.trim() === '') {
            showAlert('Por favor, ingrese un término de búsqueda.');
            return;
        }

        console.log(`Pagar a empleado con ID: ${employeeId}`);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: `Salario pagado al empleado con ID: ${employeeId}`, life: 3000 });
    };

    const filteredEmployees = employees.filter(employee =>
        employee.PersonaCedula.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="pago-salarios-container">
            <Toast ref={toast} />
            <Card className="pago-salarios-card">
                <div className="pago-salarios-header">
                    <h2 className="pago-salarios-title">Pago salarios</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Buscar empleado por cédula o nombre"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <Button icon={PrimeIcons.SEARCH} className="p-button-raised p-button-rounded search-button" />
                </div>
                {filteredEmployees.length > 0 ? (
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Cédula</th>
                                <th>Nombre y Apellidos</th>
                                <th>Pagar Salario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map(employee => (
                                <tr key={employee.PersonaCedula}>
                                    <td>{employee.PersonaCedula}</td>
                                    <td>{employee.nombre} {employee.apellido1} {employee.apellido2}</td>
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
                ) : (
                    <p>No se encontraron empleados.</p>
                )}
            </Card>
        </div>
    );
};

export default PagoSalarios;
