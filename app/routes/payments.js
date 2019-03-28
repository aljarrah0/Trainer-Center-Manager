const _ = require('lodash');
const router = require('express').Router();
const { Payment, validate } = require('../models/payments');

router.get('/', async (req, res) => {
    const payments = await Payment.find();
    res.send(payments);
});

router.get('/:id', async (req, res) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(400).send('the payment is not found');
    res.send(payment);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const payment = new Payment(
        _.pick(req.body,
            [
                'employeeID',
                'studentID',
                'courseID',
                'groupID',
                'paymentAmount',
            ]
        )
    );

    if (!payment) return res.status(404).send('error in DB');

    await payment.save();
    res.send(payment);
});

module.exports = router;
