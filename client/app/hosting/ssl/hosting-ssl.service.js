angular
    .module("services")
    .service("hostingSSL", class HostingSSL {
        constructor (OvhApiHostingWebSsl) {
            this.OvhApiHostingWebSsl = OvhApiHostingWebSsl;

            /**
             * Enum for certificate types
             * @readonly
             * @enum {String}
             */
            this.CERTIFICATE_TYPES = {
                letsEncrypt: "letsEncrypt",
                paid: "paid",
                "import": "import"
            };
        }

        static isCertificateType (mysteryCertificateType, knownCertificateType) {
            if (!_(mysteryCertificateType).isString() || _(mysteryCertificateType).isEmpty()) {
                throw new TypeError("mysteryCertificateType should be a non-empty String");
            }

            if (!_(knownCertificateType).isString() || _(knownCertificateType).isEmpty()) {
                throw new TypeError("knownCertificateType should be a non-empty String");
            }

            return _(mysteryCertificateType).camelCase().toUpperCase() === _(knownCertificateType).camelCase().toUpperCase();
        }

        retrievingCertificateValidationReport (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().getReport({ serviceName }).$promise;
        }

        creatingCertificate (serviceName, certificate, key, chain) {
            return this.OvhApiHostingWebSsl.Lexi().post({ serviceName }, { certificate, key, chain }).$promise;
        }

        regeneratingCertificate (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().regenerate({ serviceName }).$promise;
        }
});
