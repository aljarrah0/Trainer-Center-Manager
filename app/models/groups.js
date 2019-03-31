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
        minlength:1,
        maxlength:255,
    },
     // day - from - to 
     groupSchedule: {
        type: [Object],
        required:true,
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
            groupSchedule: Joi.object()
                .required(),
            groupStartDate: Joi.date()
                .required(),
            groupEndDate: Joi.date()
                .required(),
        });
    return Joi.validate(group, schema);
}


exports.Group = Group;
exports.validate = validateGroup;
exports.groupSchema = groupSchema;
