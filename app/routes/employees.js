const router = require('express').Router();
const _ = require('lodash');
const { Employee, validate } = require('../models/employees');

router.get('/', async (req, res) => {
    const employee = await Employee.find().sort('employeeID').select('-_id -__v');
    res.send(employee);
});

router.get('/:id', async (req, res) => {
    const employee = await Employee.findOne({ employeeID: req.params.id }).select('-_id -__v');
    if (!employee) return res.status(404).send('the employee with the given ID was not found');
    res.send(employee);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const nationalID = await Employee.findOne({ nationalID: req.body.nationalID });
    if (nationalID) return res.status(400).send('the nationalID is exist');

    const mobile1 = await Employee.findOne({ mobile1: req.body.mobile1 });
    if (mobile1) return res.status(400).send('the mobile1 is exist');

    const mobile2 = await Employee.findOne({ mobile2: req.body.mobile1 });
    if (mobile2) return res.status(400).send('the mobile2 is exist');

    let employee = await Employee.findOne({ email: req.body.email });
    if (employee) return res.status(404).send('the employee already registration');

    employee = new Employee(_.pick(req.body,
        [
            'fullNameArabic',
            'fullNameEnglish',
            'nationalID',
            'homeTell',
            'mobile1',
            'mobile2',
            'email',
            'gender',
            'city',
            'address',
        ]));
    await employee.save();
    res.send(employee);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // let employee = await Employee.findOne({ email: req.body.email });
    // if (employee) return res.status(404).send('the employee already registration');

    const updateEmployee = await Employee.findOneAndUpdate({ employeeID: req.params.id },
        _.pick(req.body, [
            'fullNameArabic',
            'fullNameEnglish',
            'nationalID',
            'homeTell',
            'mobile1',
            'mobile2',
            'email',
            'gender',
            'city',
            'address',]), { new: true, runValidators: true, });

    if (!updateEmployee) return res.status(404).send('the employee with the given ID was not found');

    res.send(updateEmployee);
});

module.exports = router;
