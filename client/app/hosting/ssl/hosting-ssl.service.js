angular
    .module("services")
    .service("hostingSSL", class HostingSSL {
        constructor (OvhApiHostingWebSsl) {
            this.OvhApiHostingWebSsl = OvhApiHostingWebSsl;
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

        deletingCertificate (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().delete({ serviceName }).$promise;
        }
});
