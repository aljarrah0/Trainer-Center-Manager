const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

// create the schema for payments
const paymentSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    studentID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Student',
        required: true,
        trim: true,
    },
    courseID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Course',
        required: true,
        trim: true,
    },
    groupID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Group',
        required: true,
        trim: true,
    },
    paymentAmount: {
        type: Number,
        required: true,
        trim: true,
        min: 1,
        max: 5000,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'paymentID' });

const Payment = mongoose.model('payments', paymentSchema);

function validatePayment(payment) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.number()
                .required()
                .integer()
                .positive(),
            studentID: Joi.number()
                .required()
                .integer()
                .positive(),
            courseID: Joi.number()
                .required()
                .integer()
                .positive(),
            groupID: Joi.number()
                .required()
                .integer()
                .positive(),
            paymentAmount: Joi.number()
                .integer()
                .required()
                .min(1)
                .max(5000),
        });
    return Joi.validate(payment, schema);
}

exports.Payment = Payment;
exports.validate = validatePayment;
