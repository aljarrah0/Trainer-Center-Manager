const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// create the schema providers
const providersSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.Number,
        ref: 'Employee',
        required: true,
        trim:true,
    },
    providerName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
        lowercase: true,
    },
    providerDesc: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
        lowercase: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
}).plugin(AutoIncrement, { inc_field: 'providerID' });

// create the Provider class into DB
const Provider = mongoose.model('providers', providersSchema);

function validationProvider(provider) {
    const schema = Joi.object()
        .keys({
            employeeID: Joi.number()
                .required()
                .integer()
                .positive(),
            providerName: Joi.string()
                .required()
                .lowercase()
                .min(3)
                .max(255)
                .trim(),
            providerDesc: Joi.string()
                .alphanum()
                .required()
                .lowercase()
                .min(3)
                .max(255)
                .trim(),

        });
    return Joi.validate(provider, schema);
}

exports.Provider = Provider;
exports.validate = validationProvider;
exports.providersSchema = providersSchema;
