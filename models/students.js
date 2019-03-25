const mongoose = require('mongoose');
const Joi = require('joi');
const cities = require('full-countries-cities').getCities('egypt'); // Returns an array of city names of the particular country.
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

// create the schema students
const studentsSchema = new mongoose.Schema({
    epmloyeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    fullNameArabic: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 3,


    },
    fullNameEnglish: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 3,
        lowercase: true,
    },
    nationalID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 14, // 14 digit in egypt
    },
    homeTell: {
        type: String,
        trim: true,
        maxlength: 12, // +20 50 (7digit)
    },
    mobile1: {
        type: String,
        required: true,
        trim: true,
        maxlength: 13, // +20 (10digit)
        validate: {
            validator: value => validator.isMobilePhone(value, 'ar-EG'),
            message: 'the mobile1 is not correct',

        },
    },
    mobile2: {
        type: String,
        trim: true,
        maxlength: 13, // +20 (10digit)
        validate: {
            validator: value => validator.isMobilePhone(value, 'ar-EG'),
            message: 'the mobile2 is not correct',
        },
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 255,
        minlength: 3,
        validate: {
            validator: value => validator.isEmail(value),
            message: 'the email is not correct',
        },
    },
    registerDate: {
        type: Date,
        default: Date.now(),
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F'],
        uppercase: true,
    },
    studentsType: {
        type: String,
        required: true,
        enum: ['individual', 'corporate', 'univeristy'],
        lowercase: true,
    },
    city: {
        type: String,
        required: true,
        enum: cities,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 5,
    },
}).plugin(AutoIncrement, { inc_field: 'S-id' });

// create the student class into DB
const Student = mongoose.model('students', studentsSchema);

function validationStudents(student) {
    const schema = Joi.object().keys({

        fullNameArabic: Joi.string().required().trim().max(255)
            .min(3),
        fullNameEnglish: Joi.string().required().trim().max(255)
            .min(3),
        nationalID: Joi.string().regex(/^([0-9]*)$/, { name: 'numbers' }).length(14).required(),
        homeTell: Joi.string().regex(/^([0-9]*)$/, { name: 'numbers' }).length(10),
        mobile1: Joi.string().regex(/^([0-9]*)$/, { name: 'numbers' }).length(11).required(),
        mobile2: Joi.string().regex(/^([0-9]*)$/, { name: 'numbers' }).length(11),
        email: Joi.string().required().trim().email({ minDomainAtoms: 2 }),
        registerDate: Joi.date().default(Date()),
        gender: Joi.string().required().trim().uppercase()
            .only(['M', 'F']),
        studentsType: Joi.string().required().trim().lowercase()
            .only(['individual', 'corporate', 'univeristy']),
        city: Joi.string().required().trim().only(cities),
        address: Joi.string().required().trim().max(255)
            .min(5),
        epmloyeeID: Joi.any().required(),
    });
    return Joi.validate(student, schema);
}

// console.log(validationStudents({fullNameArabic:'ahmed'}))
exports.Student = Student;
exports.validate = validationStudents;
exports.studentsSchema = studentsSchema;
