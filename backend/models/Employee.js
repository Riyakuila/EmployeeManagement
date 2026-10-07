const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: Number,
        required: true,
    },
},{
    timestamps: true
}
);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;