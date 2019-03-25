const express = require('express');
const students = require('../routes/students');
const employees = require('../routes/employees');
const trainers = require('../routes/trainers');
const groups = require('../routes/groups');

module.exports = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use('/students', students);
    app.use('/employees', employees);
    app.use('/trainers', trainers);
    app.use('/groups', groups);

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
