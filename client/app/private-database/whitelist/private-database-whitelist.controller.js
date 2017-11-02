angular.module("App").controller(
    "PrivateDatabaseWhitelistCtrl",
    class PrivateDatabaseWhitelistListCtrl {
        constructor (Alerter, PrivateDatabase, $scope, $stateParams, WhitelistService) {
            this.alerter = Alerter;
            this.privateDatabaseService = PrivateDatabase;
            this.$scope = $scope;
            this.$stateParams = $stateParams;
            this.whitelistService = WhitelistService;
        }

        $onInit () {
            const statusToWatch = ["start", "done", "error"];
            this.serviceName = this.$stateParams.productId;

            this.loader = false;

            this.updatingWhitelist = [];
            this.whitelistsDetail = [];

            this.getList();

            this.privateDatabaseService.restartPoll(this.serviceName, ["whitelist/delete", "whitelist/create"]);

            _.forEach(statusToWatch, (state) => {
                this.$scope.$on(`privateDatabase.whitelist.create.${state}`, this[`onWhitelistCreate${state}`].bind(this));
                this.$scope.$on(`privateDatabase.whitelist.delete.${state}`, this[`onWhitelistDelete${state}`].bind(this));
            });

            _.forEach(["done", "error"], (state) => {
                this.$scope.$on(`privateDatabase.global.actions.${state}`, (e, taskOpt) => {
                    this.$scope.lockAction = taskOpt.lock ? false : this.$scope.lockAction;
                });
            });

            this.$scope.$on("privateDatabase.global.actions.start", (e, taskOpt) => {
                this.$scope.lockAction = taskOpt.lock || this.$scope.lockAction;
            });
        }

        getList () {
            this.loader = true;
            this.whitelistIds = null;

            return this.whitelistService
                .getWhitelistIds(this.serviceName)
                .then((res) => {
                    this.whitelistIds = res;
                    return res;
                })
                .catch((err) => this.alerter.error(err))
                .finally(() => {
                    if (_.isEmpty(this.whitelistIds)) {
                        this.loader = false;
                    }
                });
        }

        isLoading () {
            return this.loader && this.updatingWhitelist.length === 0;
        }

        isWhitelistEmpty () {
            return !this.loader && this.updatingWhitelist.length === 0 && this.whitelistIds.length === 0;
        }

        createWhitelist () {
            this.$scope.setAction("whitelist/add/private-database-whitelist-add");
        }

        editWhitelist (whitelist) {
            this.$scope.setAction("whitelist/update/private-database-whitelist-update", whitelist);
        }

        deleteWhitelist (whitelist) {
            this.$scope.setAction("whitelist/delete/private-database-whitelist-delete", whitelist);
        }

        transformItem (whitelistId) {
            return this.whitelistService.getWhitelist(this.serviceName, whitelistId).catch((err) => this.alerter.error(err));
        }

        onTransformItemDone () {
            this.loader = false;
        }

        /*
            POLLING
        */
        onWhitelistCreatestart (evt, opts) {
            this.updatingWhitelist.push(opts.whitelistIp);
        }

        onWhitelistCreatedone (evt, opts) {
            this.updatingWhitelist = _.remove(this.updatingWhitelist, (whitelistIp) => whitelistIp !== opts.whitelistIp);
            this.getList();
        }

        onWhitelistCreateerror (evt, opts) {
            this.updatingWhitelist = _.remove(this.updatingWhitelist, (whitelistIp) => whitelistIp !== opts.whitelistIp);
            this.alerter.error(this.$scope.tr("privateDatabase_modale_whitelist_add_fail"), this.$scope.alerts.main);
        }

        onWhitelistDeletestart (evt, opts) {
            let unregister = null;

            const todo = () => {
                const el = _.find(this.whitelistsDetail, (whitelist) => whitelist.ip === opts.whitelistIp);

                if (el) {
                    el.status = "deleting";
                    el.waitDelete = true;

                    if (unregister) {
                        unregister();
                    }
                }
            };

            if (this.whitelistsDetail && this.whitelistsDetail.length) {
                todo();
            } else {
                unregister = this.$scope.$watch(angular.bind(this, () => this.whitelistsDetail.length), todo);
            }
        }

        onWhitelistDeletedone () {
            this.getList();
        }

        onWhitelistDeleteerror (evt, opts) {
            let unregister = null;

            const todo = () => {
                const el = _.find(this.whitelistsDetail, (whitelist) => whitelist.ip === opts.whitelistIp);

                if (el) {
                    delete el.waiteDelete;

                    this.alerter.error(this.$scope.tr("privateDatabase_modale_whitelist_delete_fail"), this.$scope.alerts.main);

                    if (unregister) {
                        unregister();
                    }
                }
            };

            if (this.whitelistsDetail && this.whitelistsDetail.length) {
                todo();
            } else {
                unregister = this.$scope.$watch(angular.bind(this, () => this.whitelistsDetail.length), todo);
            }
        }
    }
);
