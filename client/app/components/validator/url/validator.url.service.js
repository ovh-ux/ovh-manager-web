angular
    .module("services")
    .service("validatorURL", class ValidatorURL {
        constructor (translator, validatorDomain, validatorIP, validatorTools) {
            this.translator = translator;
            this.validatorDomain = validatorDomain;
            this.validatorIP = validatorIP;
            this.validatorTools = validatorTools;

            this.defaultOptions = {
                acceptedProtocols: ["http", "https"]
            };

            this.MAX_URL_LENGTH = 2083;
            this.PORT_MIN_VALUE = 1;
            this.PORT_MAX_VALUE = 65535;
        }


        /**
         * Determines if an URL is valid according to OVH rules.
         * @param {String} url Theurl to validate
         * @param {Object} [options] The options
         * @param {String[]} [options.acceptedProtocols=["http", "https"]] The protocols accepted for this validation
         * @returns {ValidationResult} Result of the validation
         */
        validate (url, options) {
            if (!_(url).isString()) {
                throw new TypeError("url argument must be a String");
            }

            const fullOptions = this.validatorTools.constructor.handleOptionParameter(options, this.defaultOptions);
            const trimmedURL = url.trim();

            let urlAsURI;

            try {
                urlAsURI = buildURI.bind(this)();

                const validationMethods = [validateLength,
                    validateCharacters,
                    validateProtocol,
                    validatePort,
                    validateHostname];

                for (const validationMethod of validationMethods) {
                    const validationResult = validationMethod.bind(this)();

                    if (!validationResult.isValid) {
                        return validationResult;
                    }
                }

                return { isValid: true };
            } catch (error) {
                return { isValid: !_(error).isError(), message: error.message };
            }

            function isURLProtocolKnown () {
                const uri = new URI(trimmedURL);
                const protocol = uri.protocol();
                const protocolIsKnown = _(fullOptions.acceptedProtocols).includes(protocol);

                return protocolIsKnown;
            }

            function buildURI () {
                const uri = new URI(trimmedURL);
                const protocolIsKnown = isURLProtocolKnown();

                const normalizedURI = protocolIsKnown ? uri.normalize() : new URI(`${this.defaultOptions.acceptedProtocols[0]}://${trimmedURL}`).normalize();
                return normalizedURI;
            }

            function validateLength () {
                if (trimmedURL.length >= this.MAX_URL_LENGTH) {
                    return { isValid: false, message: this.translator.tr("validator_url_error_length", [this.MAX_URL_LENGTH]) };
                }

                return { isValid: true };
            }

            function validateCharacters () {
                if (/[\s<>]|-{2,}/.test(trimmedURL)) {
                    return { isValid: false, message: this.translator.tr("validator_url_error_characters") };
                }

                return { isValid: true };
            }

            function validateProtocol () {
                const protocol = urlAsURI.protocol();

                if (!_(fullOptions.acceptedProtocols).includes(protocol)) {
                    return { isValid: false, message: this.translator.tr("validator_url_error_protocol", [fullOptions.acceptedProtocols.join(", ")]), invalid: protocol };
                }

                return { isValid: true };
            }

            function validatePort () {
                const portAsString = urlAsURI.port();

                if (_(portAsString).isEmpty()) {
                    return { isValid: true };
                }

                const portAsNumber = parseInt(portAsString, 10);

                if (!/^[0-9]+$/.test(portAsString) || portAsNumber < this.PORT_MIN_VALUE || portAsNumber > this.PORT_MAX_VALUE) {
                    return { isValid: false, message: this.translator.tr("validator_url_error_port", [this.PORT_MIN_VALUE, this.PORT_MAX_VALUE]), invalid: portAsString };
                }

                return { isValid: true };
            }

            function validateHostname () {
                const hostname = urlAsURI.hostname();
                const hostnameIsValid = this.validatorDomain.validate(hostname);

                if (hostnameIsValid.isValid) {
                    return hostnameIsValid;
                }

                const ipIsValid = this.validatorIP.validate(hostname);

                if (!ipIsValid.isValid) {
                    ipIsValid.invalid = hostname;
                }

                return ipIsValid;
            }
        }

        /**
         * Determines if an URL is valid according to OVH rules.
         * @param {String} url Theurl to validate
         * @param {Object} [options] The options
         * @param {String[]} [options.acceptedProtocols=["http", "https"]] The protocols accepted for this validation
         * @returns {boolean} True if the url is valid
         */
        isValid (url, options) {
            const isValid = this.validate(url, options).isValid;
            return isValid;
        }
    });
