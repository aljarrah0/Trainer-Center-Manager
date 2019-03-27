const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

// create group schema
const courseSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    providerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
        trim: true,
    },
    groupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
        trim: true,
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        trim: true,
    },
    trainerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
        required: true,
        trim: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    courseHours: {
        type: Number,
        required: true,
        trim: true,
    },
    courseDetails: {
        type: String,
        required: true,
        trim: true,
    },
    coursePrice: {
        type: Number,
        required: true,
        trim: true,
    },
    priceAfterDiscount: {
        type: Number,
        trim: true,
    },
    groupStudents: {

    },
    groupSchedule: {
        type: Date,
        default: Date.now(),
        required: true,
        trim: true,
    },
    courseStartDate: {
        type: Date,
        default: Date.now(),
        required: true,
        trim: true,
    },
    courseStartDate: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true,
    }

}).plugin(AutoIncrement, { inc_field: 'courseID' });

const Course = mongoose.model('courses', courseSchema);

function validateCourse(course) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.any()
                .required(),
            providerID: Joi.any()
                .required(),
            groupID: Joi.any()
                .required(),
            studentID: Joi.any()
                .required(),
            trainerID: Joi.any()
                .required(),
            courseName: Joi.string()
                .alphanum()
                .required()
                .trim()
                .min(5)
                .max(255),
            courseHours: Joi.number()
                .integer()
                .required()
                .min(50)
                .max(160),
            courseDetails: Joi.string()
                .alphanum()
                .required()
                .trim()
                .min(5)
                .max(255),
            coursePrice: Joi.number()
                .required()
                .min(500)
                .max(5000),
            priceAfterDiscount: Joi.number(),
        });
    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;
exports.courseSchema = courseSchema;
