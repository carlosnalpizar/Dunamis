import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import '../Css/bitacora.styles.css';
import { getBitacoras } from '../api/bitacora.api';

const Bitacora = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBitacoras();
                setReportes(response.data);
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

    // Filtrado dinámico
    const filteredReportes = reportes.filter(reporte =>
        reporte.PersonaCedula && reporte.PersonaCedula.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );    

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="Bitacora-container">
            <Card className="bitacora-card">
                <div className="bitacora-header">
                    <h2 className="bitacora-title">Bitácora</h2>
                </div>
                <div className="search-container">
                    <InputText
                        placeholder="Buscar por número de cédula"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <Button icon={PrimeIcons.SEARCH} className="p-button-raised p-button-rounded search-button" />
                </div>
                {filteredReportes.length > 0 ? (
                    <table className="bitacora-table">
                        <thead>
                            <tr>
                                <th>Acción Realizada</th>
                                <th>Fecha</th>
                                <th>Cédula</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReportes.map((reporte, index) => (
                                <tr key={index}>
                                    <td>{reporte.AccionRealizada}</td>
                                    <td>{new Date(reporte.fecha).toLocaleDateString()}</td>
                                    <td>{reporte.PersonaCedula}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No se encontraron reportes.</p>
                )}
            </Card>
        </div>
    );
};

export default Bitacora;
