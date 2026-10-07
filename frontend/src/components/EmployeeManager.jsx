import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../services/employeeApi";

function EmployeeManager() {
    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        salary: "",
    });

    const [editingId, setEditingId] = useState(null);

    const fetchEmployees = async () => {
        try {
            const response = await getEmployees();
            setEmployees(response.data.employees);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateEmployee(editingId, formData);
                toast.success("Employee updated successfully");
            } else {
                await addEmployee(formData);
                toast.success("Employee added successfully");
            }

            setFormData({
                name: "",
                email: "",
                department: "",
                salary: "",
            });

            setEditingId(null);
            fetchEmployees();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleEdit = (employee) => {
        setEditingId(employee._id);

        setFormData({
            name: employee.name,
            email: employee.email,
            department: employee.department,
            salary: employee.salary,
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            toast.success("Employee deleted successfully");
            fetchEmployees();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete employee");
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-5xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Employee Management
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Add, edit and manage employees
                    </p>
                </div>

                <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold text-gray-800">
                        {editingId ? "Edit Employee" : "Add Employee"}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2"
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                        />

                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                        />

                        <div className="flex gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                            >
                                {editingId ? "Update Employee" : "Add Employee"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({
                                            name: "",
                                            email: "",
                                            department: "",
                                            salary: "",
                                        });
                                    }}
                                    className="rounded-md bg-gray-200 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Employees
                        </h2>
                    </div>

                    {employees.length === 0 ? (
                        <div className="px-6 py-10 text-center text-gray-500">
                            No employees found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                                            Name
                                        </th>

                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                                            Email
                                        </th>

                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                                            Department
                                        </th>

                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                                            Salary
                                        </th>

                                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.map((employee) => (
                                        <tr
                                            key={employee._id}
                                            className="border-t border-gray-200"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                {employee.name}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {employee.email}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {employee.department}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                ₹{employee.salary}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(employee)}
                                                        className="rounded-md bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-200"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(employee._id)}
                                                        className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default EmployeeManager;