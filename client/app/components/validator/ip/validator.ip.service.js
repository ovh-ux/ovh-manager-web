angular
    .module("services")
    .service("validatorIP", class ValidatorIP {
        constructor (translator, validatorTools) {
            this.translator = translator;
            this.validatorTools = validatorTools;

            this.defaultOptions = {
                cidr: "ALLOWED"
            };
        }

        /**
         * Determines if an IP address is valid.
         * Without any option, will be tested for IPv4 and IPv6 and CIDR are allowed.
         * @param {String} ip
         * @param {Object} [options] The options
         * @param {String|Number} [options.version] Version of IP to test for. Default value: both 4 and 6 are tested against.
         * @param {String} [options.cidr=ALLOWED] Is the CIDR required ? Can be FORBIDDEN (must not contain CIDR), ALLOWED (optional) or REQUIRED (must have a CIDR).
         * @returns {ValidationResult} Result of the validation
         */
        validate (ip, options) {
            if (!isIPInputValid(ip)) {
                throw new TypeError("ip parameter must be a String");
            }

            const fullOptions = this.validatorTools.constructor.handleOptionParameter(options, this.defaultOptions);
            const ipValidation = validateIP.bind(this)();

            return ipValidation;

            /**
             * Numbers are valid IPs according to RFCs but not according to OVH rules.
             * Will make sure IP is not a number.
             */
            function isIPInputValid () {
                const inputAsNumber = +ip;
                const inputIsNumber = _(inputAsNumber).isFinite();

                if (inputIsNumber) {
                    return false;
                }

                return _(ip).isString();
            }

            function isVersionSpecified () {
                const versionAsNumber = +fullOptions.version;
                const versionIsSpecified = _(versionAsNumber).isFinite();

                return versionIsSpecified;
            }

            function extractVersionFromOptions () {
                const versionIsSpecified = isVersionSpecified();
                const versionAsNumber = +fullOptions.version;
                const versionIsInRange = versionAsNumber === 4 || versionAsNumber === 6;

                if (versionIsSpecified && !versionIsInRange) {
                    throw new RangeError("IP version should be either 4 or 6");
                }

                return versionAsNumber;
            }

            /**
             * Chooses what IP parser to use
             */
            function chooseParser () {
                const versionIsSpecified = isVersionSpecified();
                const version = extractVersionFromOptions();

                const chosenParser = versionIsSpecified ? ipaddr[`IPv${version}`] : ipaddr;

                return chosenParser;
            }

            /**
             * Uses the parser to determine if the IP is valid
             */
            function validateIP () {
                if (fullOptions.cidr !== "ALLOWED" && fullOptions.cidr !== "REQUIRED" && fullOptions.cidr !== "FORBIDDEN") {
                    throw new RangeError("cidr must be ALLOWED, REQUIRED or FORBIDDEN");
                }

                const parser = chooseParser();

                try {
                    switch (fullOptions.cidr) {
                    case "REQUIRED":
                        parser.parseCIDR(ip);
                        break;
                    case "FORBIDDEN":
                        parser.parse(ip);
                        break;
                    default: {
                        const ipIsValidWithoutCIDR = parser.isValid(ip);

                        if (ipIsValidWithoutCIDR) {
                            break;
                        }

                        parser.parseCIDR(ip);
                    }
                    }
                } catch (ex) {
                    const message = buildErrorMessage.bind(this)();
                    return { isValid: !_(ex).isError(), message };
                }

                return { isValid: true };
            }

            function buildErrorMessage () {
                const messageStart = this.translator.tr("validator_ip_error_ip");

                const versionIsSpecified = isVersionSpecified();
                const version = extractVersionFromOptions();

                const messageNorme = versionIsSpecified ? version === 4 ?
                    this.translator.tr("validator_ip_error_ipv4") :
                    this.translator.tr("validator_ip_error_ipv6") :
                        `${this.translator.tr("validator_ip_error_ipv4")} ${this.translator.tr("validator_ip_error_or")} ${this.translator.tr("validator_ip_error_ipv6")}`;
                const messageCIDR = fullOptions.cidr !== "FORBIDDEN" ? this.translator.tr("validator_ip_error_with") : "";
                const messageCIDRPost = fullOptions.cidr === "ALLOWED" ? this.translator.tr("validator_ip_error_orWithout") : "";
                const messageCIDRItself = !_(messageCIDR).isEmpty() ? this.translator.tr("validator_ip_error_cidr") : "";
                const messageExample = this.translator.tr("validator_ip_error_example");
                const messageExampleItself = versionIsSpecified ? version === 4 ? this.translator.tr("validator_ip_error_example_ipv4") : this.translator.tr("validator_ip_error_example_ipv6") : this.translator.tr("validator_ip_error_example_ipv4");
                const messageExampleCIDR = fullOptions.cidr !== "FORBIDDEN" ? this.translator.tr("validator_ip_error_example_cidr") : "";
                const errorMessage = `${messageStart} ${messageNorme}${messageCIDR}${messageCIDRPost}${messageCIDRItself}. ${messageExample} ${messageExampleItself}${messageExampleCIDR}.`;

                return errorMessage;
            }
        }

        /**
         * Determines if an IP address is valid.
         * Without any option, will be tested for IPv4 and IPv6 and CIDR are allowed.
         * @param {String} ip
         * @param {Object} [options] The options
         * @param {String|Number} [options.version] Version of IP to test for. Default value: both 4 and 6 are tested against.
         * @param {String} [options.cidr=ALLOWED] Is the CIDR required ? Can be FORBIDDEN (must not contain CIDR), ALLOWED (optional) or REQUIRED (must have a CIDR).
         * @returns {boolean} true if the IP is valid according to the options.
         */
        isValid (ip, options) {
            const isValid = this.validate(ip, options).isValid;
            return isValid;
        }
    });
