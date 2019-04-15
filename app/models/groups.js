const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

// create group schema

const groupSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    groupName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
    },
    groupSchedule: {
        type: [{
            day: {
                type: String,
                required: true,
            },
            from: {
                type: Number,
                required: true,
            },
            to: {
                type: Number,
                required: true,
            },
        }],
        required: true,
        trim: true,
    },
    groupStartDate: {
        type: Date,
        required: true,
        trim: true,
    },
    groupEndDate: {
        type: Date,
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
            employeeID: Joi.number()
                .required()
                .integer()
                .positive(),
            groupName: Joi.string()
                .required()
                .trim(),
            groupSchedule: Joi.array()
                .items(Joi.object({
                    day: Joi.string().required(),
                    from: Joi.number().required().min(0).max(23),
                    to: Joi.number().required().min(0).max(23),
                }))
                .required(),
            groupStartDate: Joi.date()
                .required(),
        });
    return Joi.validate(group, schema);
}


exports.Group = Group;
exports.validate = validateGroup;
exports.groupSchema = groupSchema;
