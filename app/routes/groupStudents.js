const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { GroupStudent, validate } = require('../models/groupStudents');


router.get('/', (req, res) => {
    res.send('groupStudents');
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const groupStudents = new GroupStudent(
        _.pick(req.body,
            [
                'employeeID',
                'groupID',
                'studentID',
                'trainerID',
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
            ]
        )
    );

    if (!updateGroupStudents) return res.status(404).send('error in DB');

    res.send(updateGroupStudents);
});

module.exports = router;