const mongoose = require('mongoose');
const Joi = require('joi');
const cities = require('full-countries-cities').getCities('egypt'); // Returns an array of city names of the particular country.
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

// create the schema employees
const employeesSchema = new mongoose.Schema({
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
        maxlength: 14,
    },
    homeTel: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 12,
    },
    mobile1: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 11,
        validate: {
            validator: value => validator.isMobilePhone(value, 'ar-EG'),
            message: 'the mobile1 is not correct',
        },
    },
    mobile2: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 11,
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
    creationDate: {
        type: Date,
        default: Date.now(),
        trim: true,
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'employeeID' });

// create the student class into DB
const Employee = mongoose.model('employees', employeesSchema);

function validationEmployee(employee) {

    const schema = Joi.object()
        .keys({
            fullNameArabic: Joi.string()
                .required()
                .max(255)
                .min(3)
                .trim(),
            fullNameEnglish: Joi.string()
                .required()
                .max(255)
                .min(3)
                .trim(),
            nationalID: Joi.string()
                .regex(/^([0-9]*)$/, { name: 'numbers' })
                .length(14)
                .required()
                .trim(),
            homeTel: Joi.string()
                .regex(/^([0-9]*)$/, { name: 'numbers' })
                .length(12)
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
        });
    return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validationEmployee;
exports.employeesSchema = employeesSchema;
