angular
    .module("services")
    .service("hostingSSL", class HostingSSL {
        constructor (OvhApiHostingWebSsl) {
            this.OvhApiHostingWebSsl = OvhApiHostingWebSsl;

            this.certificateTypes = {
                letsEncrypt: "letsEncrypt",
                paid: "paid",
                "import": "import"
            };
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
