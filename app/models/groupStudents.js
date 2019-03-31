const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const groupStudentsSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    groupID: {
        type: Number,
        required: true,
        trim: true
    },
    studentID: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: true,
        trim: true,
    },
    trainerID: {
        type: mongoose.Types.ObjectId,
        ref: 'Trainer',
        required: true,
        trim: true,
    },
    courseID: {
        type: mongoose.Types.ObjectId,
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
            employeeID: Joi.any()
                .required(),
            groupID: Joi.any()
                .required(),
            studentID: Joi.any()
                .required(),
            trainerID: Joi.any()
                .required()
        });
    return Joi.validate(groupStudent, schema);
}

exports.GroupStudent = GroupStudent;
exports.validate = validateGroupStudent;