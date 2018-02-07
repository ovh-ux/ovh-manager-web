/**
 * @typedef {Object} ValidationResult Result of a validation
 * @property {boolean} isValid True if the validation passed
 * @property {String} [message] Message containing hints about how to pass the validation
 * @property {*} [invalid] Part of the input that is invalid
 */
angular
    .module("services")
    .service("Validator", class Validator {
        constructor (validatorDomain, validatorEmail, validatorIP, validatorURL) {
            this.domain = validatorDomain;
            this.ip = validatorIP;
            this.url = validatorURL;
            this.email = validatorEmail;
        }
    });
