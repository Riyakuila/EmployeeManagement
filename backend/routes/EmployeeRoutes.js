const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            message: 'Employee list fetched successfully',
            employees
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch employee list',
            error: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({
            message: 'Employee created successfully',
            employee
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Employee with this email already exists'
            });
        }
        res.status(500).json({
            message:'Failed to create employee',
            error: error.message
        });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message:'Employee updated successfully',
            employee
        });
    } catch (error) {
        res.status(500).json({
            message:'Failed to update employee',
            error: error.message
        });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(
            req.params.id
        );
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message:'Employee deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message:'Failed to delete employee',
            error: error.message
        });
    }
});

module.exports = router;