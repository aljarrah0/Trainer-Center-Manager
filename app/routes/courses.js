const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const { Course, validate } = require('../models/courses');

router.get('/', async (req, res) => {
    const courses = await Course.find().sort('courseID').select('-_id -__v');
    res.send(courses);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findOne({ courseID: req.params.id });
    if (!course) return res.status(400).send('not found the group');

    res.send(course);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = new Course(_.pick(req.body,
        [
            'employeeID',
            'providerID',
            'courseName',
            'courseTracks',
            'courseDesc',
            'courseHours',
            'coursePrice',
            'priceAfterDiscount',
        ]));
    if (!course) return res.status(404).send('error in the DB');

    await course.save();
    res.send(course);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateCourse = await Course.findOneAndUpdate({ courseID: req.params.id },
        _.pick(req.body,
            [
                'employeeID',
                'providerID',
                'courseName',
                'courseTracks',
                'courseDesc',
                'courseHours',
                'coursePrice',
                'priceAfterDiscount',
            ]), { new: true, runValidators: true, });
    if (!updateCourse) return res.status(404).send('error in DB');

    res.send(updateCourse);
});

module.exports = router;
