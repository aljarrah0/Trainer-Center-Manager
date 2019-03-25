const router = require('express').Router();
const _ = require('lodash');
const { Group, validate } = require('../models/groups');

router.get('/', (req, res) => {
    res.send('groups');
});

router.get('/:id', (req, res) => {
    res.send('groups');
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const group = new Group(_.pick(req.body, ['groupID', 'groupName']));
    if (!group) return res.status(404).send('error in the DB');

    await group.save();
    res.send(group);
});

router.put('/', (req, res) => {
    res.send('groups');
});


module.exports = router;
