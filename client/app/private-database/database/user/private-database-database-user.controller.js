angular
    .module("App")
    .controller("PrivateDatabaseUserDatabaseCtrl", class PrivateDatabaseUserDatabaseController {

        constructor ($q, $scope, $stateParams, Alerter, PrivateDatabase) {
            this.$q = $q;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;
            this.database = this.$scope.bdd;

            this.loading = {
                init: false
            };

            this.grants = [
                "admin",
                "rw",
                "ro",
                "none"
            ];

            this.pendingGrant = {};
            this.alerts = "privateDataBase.alerts.bdd";

            this.getUsers();

            _.forEach(["Start", "Error", "Done"], (state) => {
                this.$scope.$on(`privateDatabase.grant.set.${state.toLowerCase()}`, this[`onUserGrant${state}`].bind(this));
            });
        }

        $onDestroy () {
            this.privateDatabaseService.killPollUserGrant();
        }

        getUsers () {
            this.loading.init = true;
            this.users = null;

            return this.privateDatabaseService.getUsers(this.productId)
                .then((users) => {
                    this.users = users;
                }).finally(() => {
                    if (_.isEmpty(this.users)) {
                        this.loading.init = false;
                    }
                });
        }

        transformItem (userName) {
            return this.privateDatabaseService.getUserGrants(this.productId, userName)
                .then((res) => ({
                    userName,
                    grantType: res[this.database.databaseName].value,
                    database: res[this.database.databaseName]
                }));
        }

        onTransformItemDone () {
            this.loading.init = false;
        }

        setGrant (base, user, grant) {
            const grantObj = {
                value: grant
            };

            if (base.virgin) {
                grantObj.virgin = true;
            }

            this.privateDatabaseService.setUserGrant(this.productId, base.databaseName, user.userName, grantObj)
                .then(() => {
                    this.pendingGrant[user.userName] = true;
                    this.alerter.success(this.$scope.tr("privateDatabase_tabs_users_grant_doing"), this.alerts);
                    this.privateDatabaseService.restartPoll(this.productId, ["grant/create", "grant/update"]);
                })
                .catch((err) => {
                    this.alerter.alertFromSWS(this.$scope.tr("privateDatabase_tabs_users_grant_error"), err, this.alerts);
                });
        }

        onUserGrantStart () {
            this.alerter.success(this.$scope.tr("privateDatabase_tabs_users_grant_doing"), this.alerts);
        }

        onUserGrantError (event, task) {
            this.pendingGrant[task.userName] = false;
            this.alerter.error(this.$scope.tr("privateDatabase_tabs_users_grant_error"), this.alerts);
        }

        onUserGrantDone (event, task) {
            this.pendingGrant[task.userName] = false;
            this.refresh();
            this.alerter.success(this.$scope.tr("privateDatabase_tabs_users_grant_success"), this.alerts);
        }

        refresh () {
            this.getUsers();
        }

});
