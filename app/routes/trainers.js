const router = require('express').Router();
const _ = require('lodash');
const mongoose = require('mongoose');
const { Trainer, validate } = require('../models/trainers');

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
    const validateID = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validateID) return res.status(400).send('the ID is not Correct');

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateTrainer = await Trainer.findByIdAndUpdate(req.params.id,
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

    if (!updateTrainer) return res.status(404).send('error in DB');
    res.send(updateTrainer);
});

module.exports = router;
