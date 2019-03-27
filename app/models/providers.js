const mongoose = require('mongoose');
const Joi = require('joi');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// create the schema providers
const providersSchema = new mongoose.Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    providerName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 3,
        lowercase: true,
    },
    providerDesc: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 3,
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
            providerName: Joi.string()
                .alphanum()
                .required()
                .lowercase()
                .max(255)
                .min(3)
                .trim(),
            providerDesc: Joi.string()
                .alphanum()
                .required()
                .lowercase()
                .max(255)
                .min(3)
                .trim(),
            employeeID: Joi.any()
                .required(),
        });
    return Joi.validate(provider, schema);
}

exports.Provider = Provider;
exports.validate = validationProvider;
exports.providersSchema = providersSchema;
