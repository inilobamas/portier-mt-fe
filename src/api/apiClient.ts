import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Change to your API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
