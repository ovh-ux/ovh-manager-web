angular
    .module("services")
    .service("validatorEmail", class ValidatorEmail {
        constructor (translator, validatorDomain, validatorTools) {
            this.translator = translator;
            this.validatorDomain = validatorDomain;
            this.validatorTools = validatorTools;

            this.defaultOptions = {
                isOnlyLocalPart: false
            };
        }

        /**
         * Determines if an email address is valid according to a set of rules
         * @param {String} emailAddress The email address to validate
         * @param {Object} [options] The options
         * @param {boolean} [options.isOnlyLocalPart=false] True if only the local part (before the @) part of the email is submitted
         * @return {validationResult} Result of the validation
         */
        validate (emailAddress, options) {
            if (!_(emailAddress).isString()) {
                throw new TypeError("emailAddress argument must be a String");
            }

            if (!_(options).isObject() && !_(options).isUndefined()) {
                return new TypeError("options parameter is optional or an Object");
            }

            const fullOptions = this.validatorTools.constructor.handleOptionParameter(options, this.defaultOptions);
            const emailParts = emailAddress.split("@");
            const validationMethods = [];

            if (!fullOptions.isOnlyLocalPart) {
                validationMethods.push(validateParts, validateDomain);
            }

            validationMethods.push(validateLocalPart);

            for (const validationMethod of validationMethods) {
                const validationResult = validationMethod.bind(this)();

                if (!validationResult.isValid) {
                    return validationResult;
                }
            }

            return { isValid: true };

            function validateParts () {
                if (emailParts.length === 2) {
                    return { isValid: true };
                }

                return { isValid: false, message: this.translator.tr("validator_email_error_parts") };
            }

            function validateLocalPart () {
                const localPartRegex = /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*$/;

                const localPart = fullOptions.isOnlyLocalPart ? emailAddress : emailParts[0];

                if (localPartRegex.test(localPart)) {
                    return { isValid: true };
                }

                return { isValid: false, message: this.translator.tr("validator_email_error_localPart") };
            }

            function validateDomain () {
                const domainName = emailParts[1];
                const domainNameValidation = this.validatorDomain.validate(domainName);
                return domainNameValidation;
            }
        }

        /**
         * Determines if an email address is valid according to a set of rules
         * @param {String} emailAddress The email address to validate
         * @param {Object} [options] The options
         * @param {boolean} [options.isOnlyLocalPart=false] True if only the local part (before the @) part of the email is submitted
         * @return {boolean} True is the email address is valid
         */
        isValid (emailAddress, options) {
            const isValid = this.validate(emailAddress, options).isValid;

            return isValid;
        }
    });
