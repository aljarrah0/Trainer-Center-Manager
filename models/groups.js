const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');
// create group schema

const groupSchema = new mongoose.Schema({
    epmloyeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    groupID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength:99,
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
    }
}).plugin(AutoIncrement, { inc_field: 'G-id' });

const Group = mongoose.model('groups', groupSchema);


function validateGroup(group) {
    const schema = Joi.object().keys({
        groupID: Joi.string().required().trim(),
        groupName: Joi.string().required().trim(),
        epmloyeeID: Joi.any().required(),
    });
    return Joi.validate(group, schema);
}


exports.Group = Group;
exports.validate = validateGroup;
exports.groupSchema = groupSchema;
