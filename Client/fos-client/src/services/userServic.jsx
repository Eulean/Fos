import axios from "axios";


const API_URL = 'https://localhost:44342/api/User';

const userService = {
    getAll: () => axios.get(API_URL),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    getByEmail: (email) => axios.get(`${API_URL}/email/${email}`),
    create: (user) => axios.post(API_URL, user),
    update: (user) => axios.put(API_URL, user),
    delete: (email) => axios.delete(`${API_URL}/${email}`)
};

export default userService;