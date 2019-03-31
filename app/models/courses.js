const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Joi = require('joi');

// create group schema
const courseSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim: true,
    },
    providerID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Provider',
        required: true,
        trim: true,
    },
    courseName: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255,
    },
    // Object Shape : Track Name - Track Hours - Track Outlines
    courseTracks :{
        type:[Object],
        required: true,
        trim: true,
    },
    courseDesc: {
        type: String,
        required: true,
        trim: true,
        minlength:5,
        maxlength:255,
    },
    courseHours: {
        type: Number,
        required: true,
        trim: true,
        min:5,
        max:200,
    },
    coursePrice: {
        type: Number,
        required: true,
        trim: true,
        min:500,
        max:5000,
    },
    priceAfterDiscount: {
        type: Number,
        trim: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'courseID' });

const Course = mongoose.model('courses', courseSchema);

function validateCourse(course) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.number()
                .required()
                .integer()
                .positive(),
            providerID: Joi.number()
                .required()
                .integer()
                .positive(),
            courseName: Joi.string()
                .required()
                .trim()
                .min(5)
                .max(255),
            courseTracks: Joi.object()
                .required(),
            courseDesc: Joi.string()
                .required()
                .trim()
                .min(5)
                .max(255),
            courseHours: Joi.number()
                .integer()
                .required()
                .min(5)
                .max(200),
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
