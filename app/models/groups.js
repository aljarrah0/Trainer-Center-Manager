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
        unique: true,
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
            groupName: Joi.string()
                .alphanum()
                .required()
                .trim(),
            employeeID: Joi.any()
                .required(),
        });
    return Joi.validate(group, schema);
}


exports.Group = Group;
exports.validate = validateGroup;
exports.groupSchema = groupSchema;
