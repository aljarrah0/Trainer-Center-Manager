const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

// create group schema

const groupSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    groupName: {
        type: String,
        required: true,
        trim: true,
    },
    groupSchedule: {
        type: Date,
        trim: true,
    },
    groupStartDate: {
        type: Date,
        required: true,
        trim: true,
    },
    groupEndDate: {
        type: Date,
        required: true,
        trim: true,
    },
    hourFrom: {
        type: Number,
        required: true,
        trim: true,
    },
    hourTo: {
        type: Number,
        required: true,
        trim: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'groupID' });

const Group = mongoose.model('groups', groupSchema);

function validateGroup(group) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.any()
                .required(),
            groupName: Joi.string()
                .required()
                .trim(),
            groupSchedule: Joi.date()
                .required(),
            groupStartDate: Joi.date()
                .required(),
            groupEndDate: Joi.date()
                .required(),
            hourFrom: Joi.number()
                .integer()
                .required(),
            hourTo: Joi.number()
                .integer()
                .required(),
        });
    return Joi.validate(group, schema);
}


exports.Group = Group;
exports.validate = validateGroup;
exports.groupSchema = groupSchema;
