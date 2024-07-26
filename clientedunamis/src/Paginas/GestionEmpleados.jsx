import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import ModalEditar from '../modals/ModalEditar';
import '../Css/gestionEmpleados.styles.css';
import { obtenerEmpleadosActivos } from '../api/empleados.api';

const GestionEmpleados = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [displayModal, setDisplayModal] = useState(false);
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

    const showAlert = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Alerta', detail: message, life: 3000 });
    };

    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: message, life: 3000 });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEdit = (employeeId) => {
        const employee = employees.find(emp => emp.idEmpleado === employeeId);
        setSelectedEmployee(employee);
        setDisplayModal(true);
    };

    const handleModalClose = () => {
        setDisplayModal(false);
        setSelectedEmployee(null);
    };

    const handleSave = (updatedEmployee) => {
        setEmployees(employees.map(emp => (emp.idEmpleado === updatedEmployee.idEmpleado ? updatedEmployee : emp)));
        handleModalClose();
        showSuccess('Empleado actualizado exitosamente.');
    };

    const filteredEmployees = employees.filter(employee =>
        employee.PersonaCedula.toString().includes(searchTerm)
    );

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="gestion-empleados-container">
            <Toast ref={toast} />
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
                            <th>Cedula, Nombre y Apellidos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map(employee => (
                                <tr key={employee.idEmpleado}>
                                    <td>{employee.PersonaCedula} - {employee.nombre} {employee.apellido1} {employee.apellido2}</td>
                                    <td>
                                        <Button
                                            label="Editar"
                                            className="p-button-rounded p-button-warning btnEditar"
                                            onClick={() => handleEdit(employee.idEmpleado)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No se encontraron empleados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
            {selectedEmployee && (
                <ModalEditar
                    employee={selectedEmployee}
                    visible={displayModal}
                    onClose={handleModalClose}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default GestionEmpleados;
