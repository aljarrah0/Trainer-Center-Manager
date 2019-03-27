const express = require('express');
const students = require('../routes/students');
const employees = require('../routes/employees');
const trainers = require('../routes/trainers');
const groups = require('../routes/groups');
const providers = require('../routes/providers');
const courses = require('../routes/courses');
const payments = require('../routes/payments');
const groupStudents = require('../routes/groupStudents');

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use('/students', students);
    app.use('/employees', employees);
    app.use('/trainers', trainers);
    app.use('/groups', groups);
    app.use('/providers', providers);
    app.use('/courses', courses);
    app.use('/payments', payments);
    app.use('/group-students', groupStudents);

    // handle the request invalid
    app.get('*', (req, res) => {
        res.status(400).send('Invalid Url');
    });

    app.post('*', (req, res) => {
        res.status(400).send('Invalid Url');
    });

    app.put('*', (req, res) => {
        res.status(400).send('Invalid Url');
    });
};
