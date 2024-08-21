import axios from 'axios';

export const pagarSalario = async (empleado) =>{
    const response = await axios.post('http://localhost:4000/pago', empleado);
    return response.data;
}

export const getComprobantePago = async () => {
    try {
        const response = await axios.get(`http://localhost:4000/comprobante`);
        return response;
    } catch (error) {
        console.error('Error al obtener el comprobante de pago:', error);
        throw error; // Propaga el error para que pueda ser manejado en el lugar donde se llame esta función
    }
};