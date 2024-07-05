import axios from 'axios';

export const getPosiciones = async () =>
    await axios.get('http://localhost:4000/posicion');

