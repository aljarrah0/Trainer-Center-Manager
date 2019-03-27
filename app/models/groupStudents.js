const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const groupStudentsSchema = new mongoose.Schema({
    groupID: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    studentID: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
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
            groupID: Joi.any()
                .required(),
            studentID: Joi.any()
                .required(),
        });
    return Joi.validate(groupStudent, schema);
}

exports.GroupStudent = GroupStudent;
exports.validate = validateGroupStudent;