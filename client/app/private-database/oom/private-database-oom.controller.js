angular.module("App").controller(
    "PrivateDatabaseOomCtrl",
    class PrivateDatabaseOomCtrl {

        constructor ($scope, $q, $stateParams, Alerter, OomService) {
            this.$scope = $scope;
            this.$q = $q;
            this.$stateParams = $stateParams;
            this.Alerter = Alerter;
            this.oomService = OomService;
        }

        $onInit () {
            this.productId = this.$stateParams.productId;

            this.NB_DAY_OOM = 7;
            this.NB_MAX_OOM = 100;

            this.displayType = {
                classic: {
                    key: "premium",
                    value: this.$scope.tr("privateDatabase_order_sql_type_premium_label")
                },
                "public": {
                    key: "dbaas",
                    value: this.$scope.tr("privateDatabase_order_sql_type_dbaas_label")
                }
            };

            this.database = this.$scope.currentActionData.database;
            this.loader = {
                ommList: false
            };

            this.oomList = [];

            this.$scope.orderMoreRam = () => this.orderMoreRam();

            this.getOom();
        }

        getOom () {
            this.loader.oomList = true;

            this.oomList = this.database.oom.list.reverse();
        }

        orderMoreRam () {
            if (this.database.oom.realList.length >= this.database.oom.nbOomError) {
                this.$scope.setAction("database/ram/update/private-database-database-ram-update", this.database);
            } else {
                this.$scope.resetAction();
            }
        }

        getUptime (item) {
            const idx = _.findIndex(this.oomList, item);

            if (idx <= 0) {
                return -1;
            }
            const now = moment(item.date);
            const end = moment(this.oomList[idx - 1].date);
            const duration = moment.duration(now.diff(end));

            return duration.humanize();
        }

        transformItem (item) {
            item.uptime = this.getUptime(item);
            item.sizeReached = filesize(item.sizeReached, { output: "object" });
            return item;
        }

        transformItemDone () {
            this.loader.oomList = false;
        }
});
