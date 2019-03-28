const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');
// create the schema for payments
const paymentSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        trim: true,
    },
    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        trim: true,
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
        trim: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
    paymentAmount: {
        type: Number,
        required: true,
        trim: true,
    },
}).plugin(AutoIncrement, { inc_field: 'paymentID' });

const Payment = mongoose.model('payments', paymentSchema);

function validatePayment(payment) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.any()
                .required(),
            studentID: Joi.any()
                .required(),
            courseID: Joi.any()
                .required(),
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
