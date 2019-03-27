const router = require('express').Router();
const _ = require('lodash');
const { GroupStudent, validate } = require('../models/groupStudents');


router.get('/', (req, res) => {
    res.send('groupStudents');
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const groupStudents = new GroupStudent(_.pick(req.body, [
        'groupID',
        'studentID',
    ]));

    if (!groupStudents) return res.status(404).send('error in DB');

    await groupStudents.save();
    res.send(groupStudents);
});

module.exports = router;