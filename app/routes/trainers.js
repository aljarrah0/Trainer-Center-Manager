const router = require('express').Router();
const _ = require('lodash');
const { Trainer, validate } = require('../models/trainers');
const { Employee } = require('../models/employees');

router.get('/', async (req, res) => {
    const trainers = await Trainer.find().sort('name').select('-__v');
    res.send(trainers);
});

router.get('/:id', async (req, res) => {
    const trainer = await Trainer.findOne({ trainerID: req.params.id }).select('-_id -__v');
    if (!trainer) return res.status(400).send('the trainer not found');

    res.send(trainer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({ employeeID: req.body.employeeID });
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const nationalID = await Trainer.findOne({ nationalID: req.body.nationalID });
    if (nationalID) return res.status(400).send('the nationalID is exist');

    const mobile1 = await Trainer.findOne({ mobile1: req.body.mobile1 });
    if (mobile1) return res.status(400).send('the mobile1 is exist');

    const mobile2 = await Trainer.findOne({ mobile2: req.body.mobile1 });
    if (mobile2) return res.status(400).send('the mobile2 is exist');

    let trainer = await Trainer.findOne({ email: req.body.email });
    if (trainer) return res.status(404).send('the trainer is exist');

    trainer = new Trainer(
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
                'city',
                'address',
                'contractType',
                'pricePerHour',
            ]));
    await trainer.save();
    res.send(trainer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const updateTrainer = await Trainer.findOneAndUpdate({ trainerID: req.params.id },
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
                'city',
                'address',
                'contractType',
                'pricePerHour',
            ]), { new: true, runValidators: true, });

    if (!updateTrainer) return res.status(404).send('the trainer with the given ID was not found...');
    res.send(updateTrainer);
});

module.exports = router;
