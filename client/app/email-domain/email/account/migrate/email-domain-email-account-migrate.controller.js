angular.module("App").controller(
    "EmailsMigrateAccountCtrl",
    class EmailsMigrateAccountCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $q
         * @param Alerter
         * @param Emails
         * @param translator
         * @param constants
         */
        constructor ($scope, $q, Alerter, Emails, translator, constants) {
            this.$scope = $scope;
            this.$q = $q;
            this.Alerter = Alerter;
            this.Emails = Emails;
            this.translator = translator;
            this.urls = constants.urls;
        }

        $onInit () {
            this.email = this.$scope.ctrlEmailDomainEmail.accountMigrationEmail || null;

            this.loaders = {
                isInitialRetrievalRunning: true,
                isWaitingForDestinationEmails: false,
                isWaitingForMigrationCheck: false,
                isWaitingForMigration: false
            };
            this.isMigrationDataValid = false;

            this.migrate = {};
            this.constants = {
                passwordMaxLength: 30,
                passwordMinLength: 9
            };

            this.$scope.alerts.migrate = "domain_alert_migrate";
            this.$scope.migrateAccount = () => this.migrateAccount();

            // URLs constants
            this.allGuides = _.get(this.urls, "FR.guides.all");
            this.emailsOrder = _.get(this.urls, "FR.emailsOrder");

            this.getServiceTypes();
        }

        updateService () {
            this.migrate.destinationService = null;
            this.migrate.destinationEmail = null;
            this.resetError();
        }

        // Request Service types
        getServiceTypes () {
            this.loaders.isInitialRetrievalRunning = true;
            this.destinationServices = null;
            this.migrate.destinationService = null;

            // First, get the models for the service types
            this.Emails.getModels()
                .then((data) => {
                    this.models = data.models;
                    this.getDestinationServices(this.models["email.domain.MigrationServiceType"].enum);
                });
        }

        // Get destination services from all service types
        getDestinationServices (serviceTypes) {
            const promises = [];
            angular.forEach(serviceTypes, (service) => {
                promises.push(this.getDestinationServicesFromType(service));
            });

            this.$q.allSettled(promises)
                .then((data) => {
                    this.destinationServices = {};
                    this.availableServices = [];

                    // Merge destinationServices with serviceTypes, and get available services
                    angular.forEach(serviceTypes, (service, index) => {
                        this.destinationServices[service] = data[index];

                        if (this.destinationServices[service].length) {
                            this.availableServices.push(service);
                        }
                    });
                })
                .finally(() => {
                    // Auto select the first type of service if only one available service for migration
                    if (this.availableServices.length === 1) {
                        this.migrate.serviceType = this.availableServices[0];
                    }

                    this.loaders.isInitialRetrievalRunning = false;
                });
        }

        // Request services list from service type
        getDestinationServicesFromType (type) {
            return this.Emails.getDestinationServices(this.email.domain, this.email.accountName, type)
                .catch((err) => this.handleError(err));
        }

        // Get Destination email (@configure.me)
        getDestinationEmails (destinationService) {
            // Check for destination service
            if (angular.isUndefined(destinationService)) {
                return;
            }

            this.loaders.isWaitingForDestinationEmails = true;
            this.resetError();

            // Reset for ngChange
            this.destinationEmails = [];
            this.remainingAvailableEmails = null;
            this.migrate.destinationEmail = null;

            this.isMigrationDataValid = false;

            // Get available email addresses for the migration
            this.Emails.getDestinationEmailAddresses(this.email.domain, this.email.accountName, destinationService)
                .then((data) => {
                    this.loaders.isWaitingForDestinationEmails = false;
                    this.destinationEmails = data;

                    // Auto select the first email
                    if (this.destinationEmails && this.destinationEmails.length > 0) {
                        this.remainingAvailableEmails = this.destinationEmails.length - 1;
                        this.migrate.destinationEmail = this.destinationEmails[0];
                        this.checkMigrationData();
                    }
                })
                .catch((err) => this.handleError(err))
                .finally(() => { this.loaders.isWaitingForDestinationEmails = false; });
        }

        // Check if it's possible to migrate
        checkMigrationData () {
            this.loaders.isWaitingForMigrationCheck = true;
            this.Emails.checkMigrate(this.email.domain, this.email.accountName, this.migrate.destinationService, this.migrate.destinationEmail)
                .then(() => {
                    this.isMigrationDataValid = true;
                })
                .catch((err) => {
                    this.isMigrationDataValid = false;
                    this.handleError(err);
                })
                .finally(() => { this.loaders.isWaitingForMigrationCheck = false; });
        }

        // Post request for migration
        migrateAccount () {
            this.loaders.isWaitingForMigration = true;

            this.Emails.migrateAccountToDestinationAccount(this.email.domain, this.email.accountName, this.migrate.destinationService, this.migrate.destinationEmail, this.migrate.password)
                .then(() => {
                    this.Alerter.success(this.$scope.tr("email_tab_modal_migrate_success"), this.$scope.alerts.main);
                    this.$scope.ctrlEmailDomainEmail.displayEmailsList();
                })
                .catch((err) => this.handleError(err))
                .finally(() => { this.loaders.isWaitingForMigration = false; });
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
            this.Alerter.alertFromSWS(this.$scope.tr("email_tab_modal_migrate_error"), _.get(err, "data", err), this.$scope.alerts.migrate);
        }

        resetError () {
            this.Alerter.resetMessage(this.$scope.alerts.migrate);
        }

    }
);
