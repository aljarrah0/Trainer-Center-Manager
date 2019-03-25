const mongoose = require('mongoose');
const Joi = require('joi');
const cities = require('full-countries-cities').getCities('egypt'); // Returns an array of city names of the particular country.
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

// create the schema students
const trainersSchema = new mongoose.Schema({
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
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F'],
        uppercase: true,
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
    workTime: {
        type: String,
        required: true,
        trim: true,
        enum: ['full-time', 'part-time'],
        lowercase: true,
    },
    priceOfTheHour: {
        type: Number,
        required() { return this.workTime === 'part-time'; },
        trim: true,
    },
}).plugin(AutoIncrement, { inc_field: 'T-id' });

// create the student class into DB
const Trainer = mongoose.model('trainers', trainersSchema);

function validationTrainers(trainer) {
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
        city: Joi.string().required().only(cities).trim(),
        address: Joi.string().required().trim().max(255)
            .min(5),
        workTime: Joi.string().required().trim().lowercase()
            .only(['full-time', 'part-time']),
        priceOfTheHour: Joi.number(),
    });
    return Joi.validate(trainer, schema);
}

exports.Trainer = Trainer;
exports.validate = validationTrainers;
exports.trainersSchema = trainersSchema;
