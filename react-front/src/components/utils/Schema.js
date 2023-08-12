const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)
export const patientSchema = Joi.object({
    patient: Joi.object({
        name: Joi.object({
            title: Joi.string().required().escapeHTML().label('Title'),
            firstName: Joi.string().required().escapeHTML().label('First Name'),
            lastName: Joi.string().required().escapeHTML().label('Last Name'),
        }).required(),
        dob: Joi.date().required(),
        gender: Joi.string().required().escapeHTML().label('Gender'),
        image: Joi.object({
            public_id: Joi.string().allow('').optional().escapeHTML(),
            url: Joi.string().allow('').optional().escapeHTML(),
        }),
        contacts: Joi.object({
            phone: Joi.string().required().escapeHTML().label('Phone'),
            email: Joi.string().required().escapeHTML().label('Email'),
        }).required(),
        address: Joi.object({
            addressL1: Joi.string().required().escapeHTML().label('Address Line 1'),
            addressL2: Joi.string().allow('').optional().escapeHTML(),
            postCode: Joi.string().required().escapeHTML().label('PostCode'),
            country: Joi.string().required().escapeHTML().label('Country'),
        }).required()
    }).required(),
});