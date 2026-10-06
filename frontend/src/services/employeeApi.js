import axios from 'axios';

const API_URL = "https://employeemanagement-1-y064.onrender.com/api/employees";

export const getEmployees = () => {
    return axios.get(API_URL);
};

export const addEmployee = (employee) => {
    return axios.post(API_URL, employee);
};

export const updateEmployee = (id, employee) => {
    return axios.put(`${API_URL}/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};