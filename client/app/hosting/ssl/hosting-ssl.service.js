angular
  .module('services')
  .service('hostingSSLCertificate', class HostingSSLCertificate {
    constructor($rootScope, hostingSSLCertificateType, OvhApiHostingWebSsl) {
      this.$rootScope = $rootScope;

      this.hostingSSLCertificateType = hostingSSLCertificateType;
      this.OvhApiHostingWebSsl = OvhApiHostingWebSsl;
    }

    creatingCertificate(serviceName, certificate, key, chain) {
      return this.OvhApiHostingWebSsl.v6().post({ serviceName }, { certificate, key, chain }).$promise;
    }

    retrievingLinkedDomains(serviceName) {
      return this.OvhApiHostingWebSsl.v6().queryDomains({ serviceName }).$promise;
    }

    retrievingCertificate(serviceName) {
      return this.OvhApiHostingWebSsl.v6().get({ serviceName }).$promise;
    }

    retrievingCertificateValidationReport(serviceName) {
      return this.OvhApiHostingWebSsl.v6().getReport({ serviceName }).$promise;
    }

    regeneratingCertificate(serviceName) {
      return this.OvhApiHostingWebSsl.v6().regenerate({ serviceName }, {}).$promise;
    }

    deletingCertificate(serviceName) {
      return this.OvhApiHostingWebSsl.v6().delete({ serviceName }).$promise;
    }

    /**
         * Tests if a variable is a valid certificate
         *
         * @static
         * @param {Certificate} certificate
         * @throws  {TypeError} If the parameter is not a valid certificate
         */
    static testIsCertificate(certificate) {
      const tests = [
        _(certificate).chain()
          .get('status')
          .isString()
          .value(),
      ];

      if (!_(tests).every(test => test)) {
        throw new TypeError('certificate parameter is not a valid certificate object');
      }
    }

    /**
         * @static
         * @returns {object}    All the status a certificate can be in
         */
    static getStatuses() {
      return {
        CREATED: {
          canBeHandled: true,
        },
        CREATING: {
          canBeHandled: false,
        },
        DELETING: {
          canBeHandled: false,
        },
        IMPORTING: {
          canBeHandled: false,
        },
        REGENERATING: {
          canBeHandled: false,
        },
      };
    }

    /**
         * Tests if a certificate can be handled/manipulated
         *
         * @static
         * @param   {Certificate}       certificate
         * @returns {boolean}   True if the certificate can be handled/manipulated
         */
    static testCanBeHandled(certificate) {
      HostingSSLCertificate.testIsCertificate(certificate);

      return HostingSSLCertificate.getStatuses()[certificate.status.toUpperCase()].canBeHandled;
    }

    /**
         * Asks the controller to reload the status of the certificate to display
         */
    reload() {
      this.$rootScope.$broadcast('hosting.ssl.reload');
    }
  });
