const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const { Student, validate } = require('../models/students');

router.get('/', async (req, res) => {
    const student = await Student.find().sort('S-id');
    res.send(student);
});

router.get('/:id', async (req, res) => {
    const validateID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validateID) return res.status(400).send('the ID is not Correct');

    const student = await Student.findById(req.params.id);
    if (!student) res.status(404).send('the student with the given ID was not found');
    res.send(student);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let student = await Student.findOne({ email: req.body.email });
    if (student) return res.status(404).send('the student already registration');

    student = new Student(_.pick(req.body,
        [
            'fullNameArabic',
            'fullNameEnglish',
            'nationalID',
            'homeTell',
            'mobile1',
            'mobile2',
            'email',
            'registerDate',
            'gender',
            'studentsType',
            'city',
            'address',
            'epmloyeeID',
        ]));
    await student.save();
    res.send(student);
});

router.put('/:id', async (req, res) => {
    const validateID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validateID) return res.status(400).send('the ID is not Correct');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateStudent = await Student.findByIdAndUpdate(req.params.id,
        _.pick(req.body,
            [
                'fullNameArabic',
                'fullNameEnglish',
                'nationalID',
                'homeTell',
                'mobile1',
                'mobile2',
                'email',
                'registerDate',
                'gender',
                'studentsType',
                'city',
                'address',
                'epmloyeeID',
            ]), {
            new: true,
            runValidators: true,
        });
    if (!updateStudent) return res.status(404).send('the student with the given ID was not found');

    res.send(updateStudent);
});

module.exports = router;
