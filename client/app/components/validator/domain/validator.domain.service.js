angular
    .module("services")
    .service("validatorDomain", class ValidatorDomain {
        constructor (translator, validatorIP, validatorTools) {
            this.translator = translator;
            this.validatorIP = validatorIP;
            this.validatorTools = validatorTools;

            this.defaultOptions = {
                canBeginWithWildcard: false,
                subDomainsCanBeginWithUnderscore: false,
                isSubDomain: false
            };

            this.MAX_DOMAIN_LENGTH = 255;
            this.MAX_SUBDOMAIN_LENGTH = 63;
        }

        /**
         * Determines if a domain name is valid according to OVH rules.
         * @param {String} domainName The name of domain to validate
         * @param {Object} [options] The options
         * @param {boolean} [options.canBeginWithWildcard=false] True if the domain name can be like "*.foo.bar.example.com"
         * @param {boolean} [options.subDomainsCanBeginWithUnderscore=false] True if the domain name can be like "_foo._bar.example.com"
         * @param {boolean} [options.isSubDomain=false] True if the input is actually only part of a domain
         * @returns {ValidationResult} Result of the validation
         */
        validate (domainName, options) {
            if (!_(domainName).isString()) {
                throw new TypeError("domainName argument must be a String");
            }

            if (!_(options).isObject() && !_(options).isUndefined()) {
                return new TypeError("options parameter is optional or an Object");
            }

            const fullOptions = this.validatorTools.constructor.handleOptionParameter(options, this.defaultOptions);

            const validationMethods = [validateDomainLength,
                validateSubDomainQuantity,
                validateSubDomainLength,
                validateWildcardPresence,
                validateUnderscorePresence,
                validateIsNotIP,
                validateGlobalForm];

            for (const validationMethod of validationMethods) {
                const validationResult = validationMethod.bind(this)();

                if (!validationResult.isValid) {
                    return validationResult;
                }
            }

            return { isValid: true };

            function validateDomainLength () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());
                if (punycodedDomainName.length > this.MAX_DOMAIN_LENGTH) {
                    return { isValid: false, message: this.translator.tr("validator_domain_error_length", [this.MAX_DOMAIN_LENGTH]) };
                }

                return { isValid: true };
            }

            function validateSubDomainQuantity () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());
                const subDomainNames = punycodedDomainName.split(".");

                if (!fullOptions.isSubDomain && subDomainNames.length < 2) {
                    return { isValid: false, message: this.translator.tr("validator_domain_error_parts") };
                }

                return { isValid: true };
            }

            function validateSubDomainLength () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());
                const subDomainNames = punycodedDomainName.split(".");
                const tooLongSubDomainName = _(subDomainNames).find((subDomainName) => subDomainName.length > this.MAX_SUBDOMAIN_LENGTH);

                if (_(tooLongSubDomainName).isString()) {
                    return { isValid: false, message: this.translator.tr("validator_domain_error_subdomain_length", [this.MAX_SUBDOMAIN_LENGTH]), invalid: tooLongSubDomainName };
                }

                return { isValid: true };
            }

            function validateWildcardPresence () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());
                const containsWildcard = /^\*\./.test(punycodedDomainName);

                if (!fullOptions.canBeginWithWildcard && containsWildcard) {
                    return { isValid: false, message: this.translator.tr("validator_domain_error_wildcard") };
                }

                return { isValid: true };
            }

            function validateUnderscorePresence () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());
                const subDomainNames = punycodedDomainName.split(".");

                const invalidSubDomainName = _(subDomainNames).find((subDomainName) => {
                    const containsUnderscore = /^\_\w*$/.test(subDomainName);

                    return !fullOptions.subDomainsCanBeginWithUnderscore && containsUnderscore;
                });

                if (_(invalidSubDomainName).isString()) {
                    return { isValid: false, message: this.translator.tr("validator_domain_error_underscore"), invalid: invalidSubDomainName };
                }

                return { isValid: true };
            }

            function validateIsNotIP () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());

                if (this.validatorIP.isValid(punycodedDomainName)) {
                    return { isValid: false, message: this.translator.tr("validator_domain_error_ip") };
                }

                return { isValid: true };
            }

            function validateGlobalForm () {
                const punycodedDomainName = punycode.toASCII(domainName.trim());
                const domainRegExp = /^(\*\.)?(_?[a-zA-Z0-9]+(-*[a-zA-Z0-9]+)*\.)+([a-zA-Z0-9]{2,}(-*[a-zA-Z0-9]+)*)+$/;
                const subDomainRegExp = /^(\*\.)?(_?[a-zA-Z0-9]+(-*[a-zA-Z0-9]+)*\.?)+([a-zA-Z0-9]{2,}(-*[a-zA-Z0-9]+)*)+$/;

                const globalFormIsValid = fullOptions.isSubDomain ? subDomainRegExp.test(punycodedDomainName) : domainRegExp.test(punycodedDomainName);

                if (globalFormIsValid) {
                    return { isValid: true };
                }

                return { isValid: false, message: this.translator.tr("validator_domain_error_general_form") };
            }
        }

        /**
         * Determines if a domain name is valid according to OVH rules.
         * @param {String} domainName The name of domain to validate
         * @param {Object} [options] The options
         * @param {boolean} [options.canBeginWithWildcard=false] True if the domain name can be like "*.foo.bar.example.com"
         * @param {boolean} [options.subDomainsCanBeginWithUnderscore=false] True if the domain name can be like "_foo._bar.example.com"
         * @param {boolean} [options.isSubDomain=false] True if the input is actually only part of a domain
         * @returns {boolean} True if the domain name is valid
         */
        isValid (domainName, options) {
            const isValid = this.validate(domainName, options).isValid;
            return isValid;
        }
    });
