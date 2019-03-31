const mongoose = require('mongoose');
const Joi = require('joi');
const cities = require('full-countries-cities').getCities('egypt'); // Returns an array of city names of the particular country.
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

// create the schema students
const trainersSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim: true,
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
    homeTel: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 12, // +20 50 (7digit)
    },
    mobile1: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 13, // +20 (10digit)
        validate: {
            validator: value => validator.isMobilePhone(value, 'ar-EG'),
            message: 'the mobile1 is not correct',
        },
    },
    mobile2: {
        type: String,
        trim: true,
        unique: true,
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
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        lowercase: true,
        trim: true,
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
        lowercase: true,
    },
    contractType: {
        type: String,
        required: true,
        trim: true,
        enum: ['full time', 'part time'],
        lowercase: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
        trim: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'trainerID' });

// create the student class into DB
const Trainer = mongoose.model('trainers', trainersSchema);

function validationTrainers(trainer) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.number()
                .required()
                .integer()
                .positive(),
            fullNameArabic: Joi.string()
                .required()
                .trim()
                .max(255)
                .min(3),
            fullNameEnglish: Joi.string()
                .required()
                .trim()
                .max(255)
                .min(3),
            nationalID: Joi.string()
                .regex(/^([0-9]*)$/, { name: 'numbers' })
                .length(14)
                .required(),
            homeTel: Joi.string()
                .regex(/^([0-9]*)$/, { name: 'numbers' })
                .length(10)
                .trim(),
            mobile1: Joi.string()
                .regex(/^([0-9]*)$/, { name: 'numbers' })
                .length(11)
                .required()
                .trim(),
            mobile2: Joi.string()
                .regex(/^([0-9]*)$/, { name: 'numbers' })
                .length(11)
                .trim(),
            email: Joi.string()
                .required()
                .email({ minDomainAtoms: 2 })
                .trim(),
            gender: Joi.string()
                .required()
                .lowercase()
                .only(['male', 'female'])
                .trim(),
            city: Joi.string()
                .required()
                .only(cities)
                .trim(),
            address: Joi.string()
                .required()
                .max(255)
                .min(5)
                .trim(),
            contractType: Joi.string()
                .required()
                .lowercase()
                .only(['full time', 'part time'])
                .trim(),
            pricePerHour: Joi.number().required(),
        });
    return Joi.validate(trainer, schema);
}

exports.Trainer = Trainer;
exports.validate = validationTrainers;
exports.trainersSchema = trainersSchema;
