const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
env.config();

const employeeRoutes = require('./routes/EmployeeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('MongoDB Connected Successfully');
})
.catch((error) => {
    console.log("Error: ", error);
});

app.get('/', (req,res) => {
    res.send('API is running');
});

app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
});