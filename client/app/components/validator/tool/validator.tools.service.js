angular
    .module("services")
    .service("validatorTools", class ValidatorTools {
        /**
         * Merges the options given by the user with the default options
         * @param {Object} options The options given by the user
         * @param {Object} defaultOptions The default options
         * @returns {Object} The options to use for the validation
         */
        static assignOptions (options, defaultOptions) {
            let optionsToAssignTo = defaultOptions;

            if (!_(optionsToAssignTo).isObject()) {
                optionsToAssignTo = {};
            }

            const optionsToReturn = _(optionsToAssignTo).assign(options).value();
            return optionsToReturn;
        }

        /**
         * Checks the options type and merges with the default options
         * @param {Object} options The options given by the user
         * @param {Object} defaultOptions The default options
         * @returns {Object} The options to use for the validation
         */
        static handleOptionParameter (options, defaultOptions) {
            if (!_(options).isObject() && !_(options).isUndefined() && !_(options).isNull()) {
                throw new TypeError("options parameter is optional or an Object");
            }

            const defaultOptionsClone = _(defaultOptions).clone();
            const fullOptions = ValidatorTools.assignOptions(options, defaultOptionsClone);
            return fullOptions;
        }
    });
