/**
 * @typedef {Object} CertificateType
 * @property {String} name - Name of the certificate
 * @property {String} displayName - Name of the certificate to display to users
 * @property {boolean} isFree - True if the user had the certificate for free
 */

angular
    .module("services")
    .service("hostingSSLCertificateType", class HostingSSLCertificateType {
        constructor () {
            /**
             * Certificate types
             * @readonly
             * @enum {CertificateType}
             */
            this.CERTIFICATE_TYPES = {
                LETS_ENCRYPT: {
                    name: "letsEncrypt",
                    displayName: "Let's Encrypt",
                    isFree: true
                },
                PAID: {
                    name: "paid",
                    displayName: "payant",
                    isFree: false
                },
                IMPORTED: {
                    name: "imported",
                    displayName: "importé",
                    isFree: true
                }
            };

            _(this.CERTIFICATE_TYPES).forEach((certificateType) => {
                const formattedCertificateTypeName = _(certificateType.name).chain()
                    .camelCase()
                    .capitalize()
                    .value();


                this[`is${formattedCertificateTypeName}`] = (mysteryCertificateType) => HostingSSLCertificateType.isCertificateType(mysteryCertificateType, certificateType.name);
            });
        }

        static isCertificateType (mysteryCertificateType, knownCertificateType) {
            if (!_(mysteryCertificateType).isString() || _(mysteryCertificateType).isEmpty()) {
                throw new TypeError("mysteryCertificateType should be a non-empty String");
            }

            if (!_(knownCertificateType).isObject() || !_(knownCertificateType.name).isString() || _(knownCertificateType.name).isEmpty()) {
                throw new TypeError("knownCertificateType should be a non-empty String");
            }

            return _(mysteryCertificateType).snakeCase().toUpperCase() === _(knownCertificateType.name).snakeCase().toUpperCase();
        }

        getCertificate (certificateTypeName) {
            if (!_(certificateTypeName).isString() || _(certificateTypeName).isEmpty()) {
                throw new TypeError("certificateTypeName should be a non-empty String");
            }

            const formattedCertificateTypeName = _(certificateTypeName).snakeCase().toUpperCase();
            const matchingCertificate = this.CERTIFICATE_TYPES[formattedCertificateTypeName];

            const certificateIsFound = _(matchingCertificate).isObject();
            if (!certificateIsFound) {
                throw new Error(`${certificateTypeName} is not a valid certificate name`);
            }

            return matchingCertificate;
        }

        isFree (certificateTypeName) {
            if (!_(certificateTypeName).isString() || _(certificateTypeName).isEmpty()) {
                throw new TypeError("certificateTypeName should be a non-empty String");
            }

            const matchingCertificate = this.getCertificate(certificateTypeName);
            return matchingCertificate.isFree;
        }
    });
