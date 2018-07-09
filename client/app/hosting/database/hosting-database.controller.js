angular
  .module('App')
  .controller('HostingTabDatabasesCtrl', class HostingTabDatabasesCtrl {
    constructor($scope, $q, $stateParams, $timeout, Alerter, ConverterService, Hosting, HostingDatabase) {
      this.$scope = $scope;
      this.$q = $q;
      this.$stateParams = $stateParams;
      this.$timeout = $timeout;
      this.alerter = Alerter;
      this.converterService = ConverterService;
      this.hostingService = Hosting;
      this.hostingDatabaseService = HostingDatabase;
    }

    $onInit() {
      this.hosting = this.$scope.hosting;
      this.hostingProxy = this.$scope.hostingProxy;

      this.bddTemplate = 'hosting/database/DATABASE_LIST.html';
      this.backupType = {
        DAILY: 'daily.1',
        WEEKLY: 'weekly.1',
        NOW: 'now',
      };
      this.canCreateDatabase = this.hosting.databaseMax - this.hosting.databaseCount > 0;
      this.databases = {
        details: [],
      };
      this.hasResult = false;
      this.loading = {
        databases: false,
        init: true,
      };
      this.search = {
        value: null,
      };

      this.$scope.goToList = () => this.goToList();
      this.$scope.$on('hosting.databases.backup.restore', () => this.reloadCurrentPage());

      this.$scope.$on(`${this.hostingService.events.tabDatabasesCreation}.done`, () => {
        this.alerter.success(this.$scope.tr('hosting_tab_DATABASES_configuration_create_bdd_added'), this.$scope.alerts.main);
        this.reloadCurrentPage();
      });

      this.$scope.$on(`${this.hostingService.events.tabDatabasesCreation}.error`, (err) => {
        this.alerter.alertFromSWS(this.$scope.tr('hosting_tab_databases_get_error'), _.get(err, 'data', err), this.$scope.alerts.main);
        this.reloadCurrentPage();
      });

      this.$scope.$on(this.hostingService.events.tabDatabasesRefresh, () => {
        this.reloadCurrentPage();
      });

      this.loadDatabases();
    }

    static formatVersion(version) {
      return (version || '').replace(/_/gi, '.');
    }

    checkQuota(database) {
      const deferred = this.$q.defer();
      this.$scope.setAction('database/quota/hosting-database-quota', {
        database: database.name,
        deferred,
      });
      return deferred.promise
        .then((task) => {
          database.quotaCalculating = true;
          return this.hostingService.pollDatabaseQuotaTask(this.$stateParams.productId, task.id);
        })
        .then(() => {
          database.quotaCalculating = false;
          this.reloadCurrentPage();
        });
    }

    emptySearch() {
      this.search.value = '';
      this.goSearch();
    }

    goSearch() {
      this.loadDatabases();
    }

    convertBytesSize(nb, unit, decimalWanted = 0) {
      const res = filesize(this.converterService.convertToOctet(nb, unit), { output: 'object', round: decimalWanted, base: -1 });
      const resUnit = this.$scope.tr(`unit_size_${res.symbol}`);
      return `${res.value} ${resUnit}`;
    }

    getQuotaUsageString(quotaUsed, quotaSize) {
      return `${this.convertBytesSize(quotaUsed.value, quotaUsed.unit, 2)} / ${this.convertBytesSize(quotaSize.value, quotaSize.unit)}`;
    }

    getPhpMyAdminUrl(element) {
      let PHPMYADMIN_BASE_URL = 'https://phpmyadmin.ovh.net/index.php';
      const queryString = `pma_username=${element.user}&pma_servername=${element.name}`;

      if (this.hostingProxy.datacenter !== 'p19') {
        PHPMYADMIN_BASE_URL = `https://phpmyadmin.${this.hostingProxy.cluster}.hosting.ovh.net/index.php`;
      }
      return `${PHPMYADMIN_BASE_URL}?${queryString}`;
    }

    goToList() {
      this.loading.init = true;
      this.$scope.bdd = null;
      this.bddTemplate = 'hosting/database/DATABASE_LIST.html';
    }

    loadDatabases() {
      this.loading.databases = true;
      this.databases.ids = null;

      return this.hostingDatabaseService.getDatabaseIds(this.$stateParams.productId, this.search.value)
        .then((ids) => {
          this.databases.ids = ids;
        })
        .catch((err) => {
          this.alerter.alertFromSWS(this.$scope.tr('hosting_tab_databases_get_error'), err, this.$scope.alerts.main);
        })
        .finally(() => {
          if (_.isEmpty(this.databases.ids)) {
            this.loading.init = false;
            this.loading.databases = false;
          } else {
            this.hasResult = true;
          }
        });
    }

    reloadCurrentPage() {
      if (!this.loading.databases) {
        this.loadDatabases();
      }
    }

    restoreDump(database) {
      this.$scope.bdd = database;
      this.bddTemplate = 'hosting/database/dump/DUMPS.html';
    }

    transformItem(id) {
      return this.$q.all({
        database: this.hostingDatabaseService.getDatabase(this.$stateParams.productId, id),
        dumps: this.hostingDatabaseService.getDumpIds(this.$stateParams.productId, id),
      }).then(({ database, dumps }) => {
        _.set(database, 'quotaUsed.asText', this.getQuotaUsageString(database.quotaUsed, database.quotaSize));
        _.set(database, 'quotaUsed.cappedAsText', this.convertBytesSize(database.quotaUsed.value, database.quotaUsed.unit, 2));
        _.set(database, 'dumpsCount', dumps.length || 0);
        _.set(database, 'dumps', dumps);
        return database;
      });
    }

    onTransformItemDone() {
      this.loading.init = false;
      this.loading.databases = false;
    }
  });
