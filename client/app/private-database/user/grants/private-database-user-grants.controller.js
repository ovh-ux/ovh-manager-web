angular.module("App").controller(
    "PrivateDatabaseUsersGrantsCtrl",
    class PrivateDatabaseUsersGrantsCtrl {
        constructor (Alerter, PrivateDatabase, $scope, $stateParams) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;
            this.statusToWatch = ["start", "done", "error"];

            this.grants = [
                "admin",
                "rw",
                "ro",
                "none"
            ];

            this.loaders = {
                userGrants: true,
                setGrant: false
            };

            this.isDoingGrant = [];
            this.userGrantsDetails = [];

            /*
            * Listners
            */
            _.forEach(this.statusToWatch, (state) => {
                this.$scope.$on(`privateDatabase.grant.set.${state}`, this[`onUserGrant${state}`].bind(this));
            });
            _.forEach(["done", "error"], (state) => {
                this.$scope.$on(`privateDatabase.global.actions.${state}`, (e, taskOpt) => {
                    this.$scope.lockAction = taskOpt.lock ? false : this.$scope.lockAction;
                });
            });

            this.$scope.$on("privateDatabase.global.actions.start", (e, taskOpt) => {
                this.$scope.lockAction = taskOpt.lock || this.$scope.lockAction;
            });

            this.$scope.$on("$destroy", () => {
                this.privateDatabaseService.killPollUserGrant();
            });

            this.restartPoll();

            this.getUserGrants();
        }

        getUserGrants () {
            this.loaders.userGrants = true;
            this.nbGrants = 0;
            this.userGrants = null;

            return this.privateDatabaseService
                .getUserGrants(this.productId, this.$scope.user.userName)
                .then((userGrants) => {
                    this.userGrants = userGrants;
                    this.nbGrants = _.keys(this.userGrants).length;
                    return userGrants;
                })
                .catch((err) => {
                    this.alerter.error(err.message, this.$scope.alerts.main);
                })
                .finally(() => {
                    this.loaders.userGrants = false;
                });
        }

        setGrant (base, newGrant) {
            this.userGrants[base].newGrant = newGrant;

            this.loaders.setGrant = true;

            return this.privateDatabaseService
                .setUserGrant(this.productId, base, this.$scope.user.userName, this.userGrants[base])
                .then(() => {
                    this.alerter.success(this.$scope.tr("privateDatabase_tabs_users_grant_doing"), this.$scope.alerts.main);
                })
                .catch(() => {
                    this.alerter.error(this.$scope.tr("privateDatabase_tabs_users_grant_error"), this.$scope.alerts.main);
                })
                .finally(() => {
                    this.loaders.setGrant = false;
                });
        }

        restartPoll () {
            this.privateDatabaseService.restartPoll(this.productId, ["grant/create", "grant/update"]);
        }

        /*
         * Grant User jobs
         */
        onUserGrantstart (evt, opts) {
            let unregister = null;

            const todo = () => {
                const idx = _.findIndex(this.$scope.userGrants, (grant) => grant.dataBase === opts.databaseName);

                if (~idx) {
                    this.isDoingGrant[opts.databaseName] = true;
                    if (unregister) {
                        unregister();
                    }
                }
            };

            if (this.$scope.userGrants && this.$scope.userGrants.length) {
                todo();
            } else {
                unregister = this.$scope.$watch("userGrants.length", todo);
            }
        }

        onUserGrantdone (evt, opts) {
            let unregister = null;

            const todo = () => {
                this.isDoingGrant[opts.databaseName] = false;

                this.userGrants[opts.databaseName].value = opts.grants[opts.databaseName].value;

                this.alerter.success(this.$scope.tr("privateDatabase_tabs_users_grant_success"), this.$scope.alerts.main);

                this.getUserGrants();

                if (unregister) {
                    unregister();
                }
            };

            if (this.$scope.userGrants && this.$scope.userGrants.length) {
                todo();
            } else {
                unregister = this.$scope.$watch("users.length", todo);
            }
        }

        onUserGranterror (evt, opts) {
            let unregister = null;

            const todo = () => {
                this.isDoingGrant[opts.databaseName] = false;

                this.alerter.error(this.$scope.tr("privateDatabase_tabs_users_grant_error"), this.$scope.alerts.main);

                if (unregister) {
                    unregister();
                }
            };

            if (this.$scope.userGrants && this.$scope.userGrants.length) {
                todo();
            } else {
                unregister = this.$scope.$watch("users.length", todo);
            }
        }
    }
);
