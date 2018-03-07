/**
 * @typedef     {Object}   CertificateType
 * @property    {String}   name             Name of the certificate
 * @property    {boolean}  isFree           True if the user had the certificate for free
 * @property    {String}   provider         How was the certificate provided (either LETSENCRYPT for free certificates, COMODO for paid certificates or CUSTOM for imported certificates)
 */
angular
    .module("services")
    .service("hostingSSLCertificateType", class HostingSSLCertificateType {
        constructor () {
            _(HostingSSLCertificateType.getCertificateTypes())
                .forEach((certificateType) => {
                    const formattedCertificateTypeName = _(certificateType.name).chain()
                        .camelCase()
                        .capitalize()
                        .value();

                    this[`is${formattedCertificateTypeName}`] = (mysteryCertificateType) => HostingSSLCertificateType.isCertificateType(mysteryCertificateType, certificateType.name);
                })
                .value();
        }

        /**
         * @static
         * @returns All the known certificate types
         */
        static getCertificateTypes () {
            return {
                LETS_ENCRYPT: {
                    name: "letsEncrypt",
                    isFree: true,
                    provider: "LETSENCRYPT"
                },
                PAID: {
                    name: "paid",
                    isFree: false,
                    provider: "COMODO"
                },
                IMPORTED: {
                    name: "imported",
                    isFree: true,
                    provider: "CUSTOM"
                }
            };
        }

        /**
         * Checks if a mysteryCertificateType is a knownCertificateType
         *
         * @static
         * @param {String} mysteryCertificateType Unknown certificate type
         * @param {String} knownCertificateType Known certificate type to check against
         * @returns {boolean} True if the mysteryCertificateType is the same as the knownCertificateType
         */
        static isCertificateType (mysteryCertificateType, knownCertificateType) {
            if (!_(mysteryCertificateType).isString() || _(mysteryCertificateType).isEmpty()) {
                throw new TypeError("mysteryCertificateType should be a non-empty String");
            }

            if (!_(knownCertificateType).isString() || _(knownCertificateType).isEmpty()) {
                throw new TypeError("knownCertificateType should be a non-empty String");
            }

            return _(mysteryCertificateType).snakeCase().toUpperCase() === _(knownCertificateType).snakeCase().toUpperCase();
        }

        /**
         * @param {string} providerName - Name of the proviser
         * @returns {CertificateType} Matching certificate type
         */
        static getCertificateTypeByProvider (providerName) {
            if (!_(providerName).isString() || _(providerName).isEmpty()) {
                throw new TypeError("providerName should be a non-empty String");
            }

            const formattedProvider = _(providerName).snakeCase().toUpperCase();
            const matchingCertificate = _(HostingSSLCertificateType.getCertificateTypes()).find((certificateType) => certificateType.provider === formattedProvider);

            const certificateIsFound = _(matchingCertificate).isObject();
            if (!certificateIsFound) {
                throw new Error(`${providerName} is not a valid provider`);
            }

            return matchingCertificate;
        }
    });
