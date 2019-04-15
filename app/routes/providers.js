const router = require('express').Router();
const _ = require('lodash');
const { Provider, validate } = require('../models/providers');
const { Employee } = require('../models/employees');

router.get('/', async (req, res) => {
    const providers = await Provider.find().sort('providerID').select('-_id -__v');
    res.send(providers);
});

router.get('/:id', async (req, res) => {
    const provider = await Provider.findOne({ providerID: req.params.id });
    if (!provider) res.status(404).send('the provider with the given ID was not found');

    res.send(provider);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({ employeeID: req.body.employeeID });
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const provider = new Provider(_.pick(req.body, [
        'employeeID',
        'providerName',
        'providerDesc',
    ]));
    await provider.save();
    res.send(provider);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const employeeID = await Employee.findOne({ employeeID: req.body.employeeID });
    if (!employeeID) return res.status(400).send('the employeeID is not correct');

    const updateProvider = await Provider.findOneAndUpdate({ providerID: req.params.id },
        _.pick(req.body, [
            'employeeID',
            'providerName',
            'providerDesc',
        ]), { new: true, runValidators: true, });

    if (!updateProvider) return res.status(404).send('the Provider with the given ID was not found');

    res.send(updateProvider);
});

module.exports = router;
