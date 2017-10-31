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
        constructor ($scope, $q, Alerter, Emails, constants) {
            this.$scope = $scope;
            this.$q = $q;
            this.Alerter = Alerter;
            this.Emails = Emails;
            this.urls = constants.urls;
        }

        $onInit () {
            this.setWizardTitle();
            this.email = this.$scope.currentActionData;
            this.loading = true;
            this.migrate = {};
            this.constants = {
                passwordMaxLength: 30,
                passwordMinLength: 9
            };

            // For the wizard step-on-load and on-finish
            this.$scope.getServiceTypes = () => this.getServiceTypes();
            this.$scope.checkMigrationData = () => this.checkMigrationData();
            this.$scope.migrateAccount = () => this.migrateAccount();

            // URLs constants
            this.allGuides = _.get(this.urls, "FR.guides.all");
            this.emailsOrder = _.get(this.urls, "FR.emailsOrder");
        }

        // Request Service types
        getServiceTypes () {
            this.loading = true;
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
                        this.setWizardTitle(this.migrate.serviceType);
                    }

                    this.loading = false;
                });
        }

        // Set the wizard title according to the service type selected
        setWizardTitle (serviceType) {
            switch (serviceType) {
            case "EMAIL PRO":
                this.wizardTitle = this.$scope.i18n.email_tab_modal_migrate_title_emailpro;
                break;
            case "HOSTED EXCHANGE":
                this.wizardTitle = this.$scope.i18n.email_tab_modal_migrate_title_exchange;
                break;
            default:
                this.wizardTitle = this.$scope.i18n.email_tab_modal_migrate_title;
            }
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
                this.loading = false;
                return;
            }

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
                .finally(() => { this.loading = false; });
        }

        // Check if it's possible to migrate
        checkMigrationData () {
            this.loading = true;

            this.Emails.checkMigrate(this.email.domain, this.email.accountName, this.migrate.destinationService, this.migrate.destinationEmail)
                .then(() => { this.loading = false; })
                .catch((err) => this.handleError(err));
        }

        // Post request for migration
        migrateAccount () {
            this.Emails.migrateAccountToDestinationAccount(this.email.domain, this.email.accountName, this.migrate.destinationService, this.migrate.destinationEmail, this.migrate.password)
                .then(() => this.Alerter.success(this.$scope.tr("email_tab_modal_migrate_success"), this.$scope.alerts.main))
                .catch((err) => this.handleError(err))
                .finally(() => this.$scope.resetAction());
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
            this.Alerter.alertFromSWS(this.$scope.tr("email_tab_modal_migrate_error"), _.get(err, "data", err), this.$scope.alerts.main);
            this.$scope.resetAction();
        }

    }
);
