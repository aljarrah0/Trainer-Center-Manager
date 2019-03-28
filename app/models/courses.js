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
    courseName: {
        type: String,
        required: true,
        trim: true,
    },
    courseDesc: {
        type: String,
        required: true,
        trim: true,
    },
    courseHours: {
        type: Number,
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
            employeeID: Joi.any()
                .required(),
            providerID: Joi.any()
                .required(),
            courseName: Joi.string()
                .required()
                .trim()
                .min(5)
                .max(255),
            courseDesc: Joi.string()
                .required()
                .trim()
                .min(5)
                .max(255),
            courseHours: Joi.number()
                .integer()
                .required()
                .min(50)
                .max(160),
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
