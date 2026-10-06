# Employee Management System

A simple full-stack Employee Management System built to practice and demonstrate **CRUD operations** using the MERN stack.

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Add a new employee
- View all employees
- Update employee details
- Delete an employee
- Toast notifications for successful and failed operations
- Responsive user interface

### Employee Details

Each employee contains:

- Name
- Email
- Department
- Salary


## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Riyakuila/EmployeeManagement.git
```

---

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## API Endpoints

Base URL:

```text
http://localhost:5000/api/employees
```

## Author

**Riya Kuila**

GitHub: `https://github.com/Riyakuila`