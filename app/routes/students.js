const router = require('express').Router();
const _ = require('lodash');
const { Student, validate } = require('../models/students');
const {Employee} = require('../models/employees');

router.get('/', async (req, res) => {
    const student = await Student.find().select('-_id -__v').sort('studentID');
    res.send(student);
});

router.get('/:id', async (req, res) => {
    const student = await Student.findOne({ studentID: req.params.id }).select('-_id -__v');
    if (!student) res.status(404).send('the student with the given ID was not found');
    res.send(student);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({employeeID:req.body.employeeID});
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const nationalID = await Student.findOne({nationalID:req.body.nationalID});
    if (nationalID) return res.status(400).send('the nationalID is exist');

    const mobile1 = await Student.findOne({mobile1:req.body.mobile1});
    if (mobile1) return res.status(400).send('the mobile1 is exist');

    const mobile2 = await Student.findOne({mobile2:req.body.mobile1});
    if (mobile2) return res.status(400).send('the mobile2 is exist');

    let student = await Student.findOne({ email: req.body.email });
    if (student) return res.status(404).send('the student already registration');

    student = new Student(_.pick(req.body,
        [
            'employeeID',
            'fullNameArabic',
            'fullNameEnglish',
            'nationalID',
            'homeTell',
            'mobile1',
            'mobile2',
            'email',
            'gender',
            'studentsType',
            'city',
            'address',
        ]));
    await student.save();
    res.send(student);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({employeeID:req.body.employeeID});
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const mobile2 = await Student.findOne({mobile2:req.body.mobile1});
    if (mobile2) return res.status(400).send('the mobile2 is exist');

    const updateStudent = await Student.findOneAndUpdate({ studentID: req.params.id },
        _.pick(req.body,
            [
                'employeeID',
                'fullNameArabic',
                'fullNameEnglish',
                'nationalID',
                'homeTell',
                'mobile1',
                'mobile2',
                'email',
                'gender',
                'studentsType',
                'city',
                'address',
            ]), { new: true, runValidators: true, });
            console.log('----------->HOHO')
    if (!updateStudent) return res.status(404).send('the student with the given ID was not found...');

    res.send(updateStudent);
});

module.exports = router;
