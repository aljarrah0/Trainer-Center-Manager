const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');
// create group schema

const groupSchema = new mongoose.Schema({
    groupID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    groupName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
}).plugin(AutoIncrement, { inc_field: 'G-id' });

const Group = mongoose.model('groups', groupSchema);


function validateGroup(group) {
    const schema = Joi.object().keys({
        groupID: Joi.string().required().trim(),
        groupName: Joi.string().required().trim(),
    });
    return Joi.validate(group, schema);
}


exports.Group = Group;
exports.validate = validateGroup;
exports.groupSchema = groupSchema;
