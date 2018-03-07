angular
    .module("services")
    .service("hostingSSL", class HostingSSL {
        constructor (OvhApiHostingWebSsl) {
            this.OvhApiHostingWebSsl = OvhApiHostingWebSsl;
        }

        creatingCertificate (serviceName, certificate, key, chain) {
            return this.OvhApiHostingWebSsl.Lexi().post({ serviceName }, { certificate, key, chain }).$promise;
        }

        retrievingLinkedDomains (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().queryDomains({ serviceName }).$promise;
        }

        retrievingCertificate (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().get({ serviceName }).$promise;
        }

        retrievingCertificateValidationReport (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().getReport({ serviceName }).$promise;
        }

        regeneratingCertificate (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().regenerate({ serviceName }).$promise;
        }

        deletingCertificate (serviceName) {
            return this.OvhApiHostingWebSsl.Lexi().delete({ serviceName }).$promise;
        }
});
