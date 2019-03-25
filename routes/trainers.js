const router = require('express').Router();
const _ = require('lodash');
const { Trainer, validate } = require('../models/trainers');

router.get('/', async (req, res) => {
    const trainers = await Trainer.find().sort('name').select('-__v');
    res.send(trainers);
});

router.get('/:id', async (req, res) => {
    const trainer = await Trainer.findById(req.params.id).select('-_id -__v');
    if (!trainer) return res.status(400).send('the trainer not found');

    res.send(trainer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let trainer = await Trainer.findOne({ email: req.body.email });
    if (trainer) return res.status(404).send('the trainer is exist');

    trainer = new Trainer(_.pick(req.body,
        [
            'fullNameArabic',
            'fullNameEnglish',
            'nationalID',
            'homeTell',
            'mobile1',
            'mobile2',
            'mobile2',
            'email',
            'registerDate',
            'gender',
            'address',
            'workTime',
            'priceOfTheHour',
            'city',
        ]));
    await trainer.save();
    res.send(trainer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateTrainer = await Trainer.findByIdAndUpdate(req.params.id, _.pick(req.body,
        [
            'fullNameArabic',
            'fullNameEnglish',
            'nationalID',
            'homeTell',
            'mobile1',
            'mobile2',
            'mobile2',
            'email',
            'registerDate',
            'gender',
            'address',
            'workTime',
            'priceOfTheHour',
            'city',
        ]), { new: true });
    await updateTrainer.save();
    res.send(updateTrainer);
});

module.exports = router;
