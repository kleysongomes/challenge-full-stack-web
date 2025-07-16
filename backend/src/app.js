const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes); //Toda rota que começar com /students será tratada pelo student.routes.js

module.exports = app;
