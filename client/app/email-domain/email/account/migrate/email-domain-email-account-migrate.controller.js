angular.module("App").controller(
    "EmailsMigrateAccountCtrl",
    class EmailsMigrateAccountCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $q
         * @param Alerter
         * @param Emails
         */
        constructor ($scope, $q, Alerter, Emails) {
            this.$scope = $scope;
            this.$q = $q;
            this.Alerter = Alerter;
            this.Emails = Emails;
        }

        $onInit () {
            this.email = this.$scope.currentActionData;
            this.loading = true;
            this.migrate = {};
            this.constants = {
                passwordMaxLength: 30,
                passwordMinLength: 9
            };

            // For the wizard step-on-load and on-finish
            this.$scope.getDestinationServices = () => this.getDestinationServices();
            this.$scope.checkMigrationData = () => this.checkMigrationData();
            this.$scope.migrateAccount = () => this.migrateAccount();
        }

        // Get Service type and Destination service
        getDestinationServices () {
            this.loading = true;
            this.destinationServices = null;

            // First, get the models for the service types
            this.Emails.getModels()
                .then((data) => {
                    this.models = data.models;
                    this.migrationServiceTypes = this.models["email.domain.MigrationServiceType"].enum;

                    // Auto select the first type of service
                    if (this.migrationServiceTypes && this.migrationServiceTypes.length > 0) {
                        this.migrate.serviceType = this.migrationServiceTypes[0];
                    }

                    // Then, get available services for the migration
                    this.getDestinationServicesFromType(this.migrate.serviceType)
                        .then(() => (this.loading = false));
                });
        }

        // Update services list on type selection change
        getDestinationServicesFromType (type) {
            this.loading = true;

            // Reset for ngChange
            this.destinationServices = null;
            this.migrate.destinationService = null;

            return this.Emails.getDestinationServices(this.email.domain, this.email.accountName, type)

                // .then((data) => (this.destinationServices = data))
                .then((data) => (this.destinationServices = type !== "EMAIL PRO" ? data : []))
                .catch((err) => this.handleError(err))
                .finally(() => (this.loading = false));
        }

        // Get Destination email (@configure.me)
        getDestinationEmails (destinationService) {
            this.loading = true;

            // Reset for ngChange
            this.destinationEmails = [];
            this.remainingAvailableEmails = null;
            this.migrate.destinationEmail = null;

            // Get available email addresses for the migration
            this.Emails.getDestinationEmailAddresses(this.email.domain, this.email.accountName, destinationService)
                .then((data) => {
                    this.loading = false;
                    this.destinationEmails = data;

                    // Auto select the first email
                    if (this.destinationEmails && this.destinationEmails.length > 0) {
                        this.remainingAvailableEmails = this.destinationEmails.length - 1;
                        this.migrate.destinationEmail = this.destinationEmails[0];
                    }
                })
                .catch((err) => this.handleError(err))
                .finally(() => (this.loading = false));
        }

        // Check if it's possible to migrate
        checkMigrationData () {
            this.loading = true;

            this.Emails.checkMigrate(this.email.domain, this.email.accountName, this.migrate.destinationService, this.migrate.destinationEmail)
                .then(() => (this.loading = false))
                .catch((err) => this.handleError(err));
        }

        // Post request for migration
        migrateAccount () {
            this.loading = true;

            this.Emails.migrateAccountToDestinationAccount(this.email.domain, this.email.accountName, this.migrate.destinationService, this.migrate.destinationEmail, this.migrate.password)
                .then(() => this.Alerter.success(this.$scope.tr("email_tab_modal_migrate_success"), this.$scope.alerts.dashboard))
                .catch((err) => this.handleError(err))
                .finally(() => {
                    this.loading = false;
                    this.$scope.resetAction();
                });
        }

        // Check from email-domain-email-account-change-password.controller.js
        checkPassword (input) {
            input.$setValidity("passwordCheck", !!this.migrate.password && !/^\s/.test(this.migrate.password) && !/\s$/.test(this.migrate.password) && !this.migrate.password.match(/[ÂÃÄÀÁÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/));
        }

        isPasswordMatches () {
            return this.migrate.password === this.migrate.confirmPassword;
        }

        isPasswordDefined () {
            return this.migrate.password && this.migrate.confirmPassword;
        }

        // Handle services errors
        handleError (err) {
            this.Alerter.alertFromSWS(this.$scope.tr("email_tab_modal_migrate_error"), _.get(err, "data", err), this.$scope.alerts.dashboard);
            this.$scope.resetAction();
        }

    }
);
