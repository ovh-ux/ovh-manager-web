angular
    .module("App")
    .controller("GeneralInformationsCtrl", class GeneralInformationsCtrl {
        constructor ($scope, translator) {
            this.$scope = $scope;
            this.translator = translator;
        }

        canOrderSSL () {
            return !this.hasHostedSSL() && !this.hasNonHostedSSL();
        }

        hasNonHostedSSL () {
            return _(this.$scope.ssl).isObject();
        }

        hasHostedSSL () {
            return _(this.$scope.hosting).isObject();
        }

        isNonHostedSSLAvailable () {
            return this.hasNonHostedSSL() && this.$scope.ssl.status !== "creating" && this.$scope.ssl.status !== "deleting" && this.$scope.ssl.status !== "regenerating";
        }

        canRegenerateSSL () {
            return this.isNonHostedSSLAvailable() && this.$scope.ssl.regenerable && this.$scope.ssl.provider !== "COMODO";
        }

        canDeleteSSL () {
            // hasHostedSsl is true only for legacy SSL offers
            // the new system is through the ssl API
            return this.hasHostedSSL() || this.isNonHostedSSLAvailable();
        }

        chooseCertificateStatusText () {
            if (this.hasNonHostedSSL()) {
                switch (this.$scope.ssl.status) {
                case "creating":
                    return this.translator.tr("hosting_dashboard_service_ssl_creating");
                case "deleting":
                    return this.translator.tr("hosting_dashboard_service_ssl_deleting");
                case "regenerating":
                    return this.translator.tr("hosting_dashboard_service_ssl_regenerating");
                default:
                    return this.translator.tr("common_yes");
                }
            }

            if (this.hasHostedSSL()) {
                return this.translator.tr("common_yes");
            }

            return this.translator.tr("common_no");
        }
    });
