const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { GroupStudent, validate } = require('../models/groupStudents');
const { Employee } = require('../models/employees');
const { Group } = require('../models/groups');
const { Student } = require('../models/students');
const { Trainer } = require('../models/trainers');
const { Course } = require('../models/courses');

router.get('/', (req, res) => {
    res.send('groupStudents');
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({ employeeID: req.body.employeeID });
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const groupID = await Group.findOne({ groupID: req.body.groupID });
    if (!groupID) return res.status(400).send('the groupID is not correct');

    const studentID = await Student.findOne({ studentID: req.body.studentID });
    if (!studentID) return res.status(400).send('the studentID is not correct');

    const trainerID = await Trainer.findOne({ trainerID: req.body.trainerID });
    if (!trainerID) return res.status(400).send('the trainerID is not correct');

    const courseID = await Course.findOne({ courseID: req.body.courseID });
    if (!courseID) return res.status(400).send('the courseID is not correct');

    const groupStudents = new GroupStudent(
        _.pick(req.body,
            [
                'employeeID',
                'groupID',
                'studentID',
                'trainerID',
                'courseID'
            ]
        )
    );

    if (!groupStudents) return res.status(404).send('error in DB');

    await groupStudents.save();
    res.send(groupStudents);
});

router.put('/:id', async (req, res) => {
    const validateID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validateID) return res.status(400).send('the ID in error');

    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const updateGroupStudents = await GroupStudent.findByIdAndUpdate(req.params.id,
        _.pick(req.body,
            [
                'employeeID',
                'groupID',
                'studentID',
                'trainerID',
                'courseID'
            ]
        ), { new: true, runValidators: true, });

    if (!updateGroupStudents) return res.status(404).send('error in DB');

    res.send(updateGroupStudents);
});

module.exports = router;