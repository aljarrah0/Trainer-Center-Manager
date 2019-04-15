const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const groupStudentsSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    groupID: {
        type: mongoose.Schema.Types.Number,
        required: true,
        trim: true
    },
    studentID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Student',
        required: true,
        trim: true,
    },
    trainerID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Trainer',
        required: true,
        trim: true,
    },
    courseID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Group',
        required: true,
        trim: true
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'groupStudentsID' });

const GroupStudent = mongoose.model('group-student', groupStudentsSchema);

function validateGroupStudent(groupStudent) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.number()
                .required(),
            groupID: Joi.number()
                .required(),
            studentID: Joi.number()
                .required(),
            trainerID: Joi.number()
                .required(),
            courseID: Joi.number()
                .required(),
        });
    return Joi.validate(groupStudent, schema);
}

exports.GroupStudent = GroupStudent;
exports.validate = validateGroupStudent;