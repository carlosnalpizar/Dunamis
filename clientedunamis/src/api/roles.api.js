import axios from 'axios';

export const getRoles = async () =>
    await axios.get('http://localhost:4000/roles');

