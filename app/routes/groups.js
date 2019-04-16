const router = require('express').Router();
const _ = require('lodash');
const { Group, validate } = require('../models/groups');
const {Employee} = require('../models/employees');
const {Course} = require('../models/courses');

router.get('/', async (req, res) => {
    const groups = await Group.find().sort('groupID').select('-_id -__v');
    res.send(groups);
});

router.get('/:id', async (req, res) => {
    const group = await Group.findOne({ groupID: req.params.id });
    if (!group) return res.status(400).send('not found the group');

    res.send(group);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({employeeID:req.body.employeeID});
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const courseID = await Course.findOne({courseID:req.body.courseID});
    if (!courseID) return res.status(400).send('the courseID is not correct');

    const group = new Group(_.pick(req.body, [
        'employeeID',
        'courseID',
        'groupName',
        'groupSchedule',
        'groupStartDate',
    ]));

    if (!group) return res.status(404).send('error in the DB');

    await group.save();
    res.send(group);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateGroup = await Group.findOneAndUpdate({ groupID: req.params.id },
        _.pick(req.body, [
            'employeeID',
            'courseID',
            'groupName',
            'groupSchedule',
            'groupStartDate',
        ]), { new: true, runValidators: true, });

    if (!updateGroup) return res.status(404).send('error in DB');

    res.send(updateGroup);
});

module.exports = router;
