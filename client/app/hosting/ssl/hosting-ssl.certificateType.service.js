angular
    .module("services")
    .service("hostingSSLCertificateType", class HostingSSLCertificateType {
        /**
         * @static
         * @returns All the known certificate types
         */
        static getCertificateTypes () {
            /**
             * @typedef     {Object}   CertificateType
             * @property    {String}   name             Name of the certificate
             * @property    {boolean}  isFree           True if the user had the certificate for free
             * @property    {String}   provider         How was the certificate provided (either LETSENCRYPT for free certificates, COMODO for paid certificates or CUSTOM for imported certificates)
             */
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
         * Checks if a certificate is a Let's Encrypt certificate
         *
         * @static
         * @param {String} mysteryCertificateType The type to check
         * @returns True if the certificate is a Let's Encrypt certificate
         */
        static isLetsEncrypt (mysteryCertificateType) {
            return HostingSSLCertificateType.isCertificateType(mysteryCertificateType, HostingSSLCertificateType.getCertificateTypes().LETS_ENCRYPT.name);
        }

        /**
         * Checks if a certificate is a paid certificate
         *
         * @static
         * @param {String} mysteryCertificateType The type to check
         * @returns True if the certificate is a paid certificate
         */
        static isPaid (mysteryCertificateType) {
            return HostingSSLCertificateType.isCertificateType(mysteryCertificateType, HostingSSLCertificateType.getCertificateTypes().PAID.name);
        }

        /**
         * Checks if a certificate was imported by the user
         *
         * @static
         * @param {String} mysteryCertificateType The type to check
         * @returns True if the certificate was imported
         */
        static isImported (mysteryCertificateType) {
            return HostingSSLCertificateType.isCertificateType(mysteryCertificateType, HostingSSLCertificateType.getCertificateTypes().IMPORTED.name);
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
