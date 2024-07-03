import axios from 'axios';

export const getBitacoras = async () =>
    await axios.get('http://localhost:4000/bitacora');

