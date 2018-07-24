angular.module('App').controller(
  'PrivateDatabaseStateCtrl',
  class PrivateDatabaseStateCtrl {
    constructor(
      $q,
      $rootScope,
      $scope,
      $stateParams,
      Alerter,
      ConverterService,
      Hosting,
      Navigator,
      OomService,
      PrivateDatabase,
      User,
    ) {
      this.$q = $q;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.alerter = Alerter;
      this.converterService = ConverterService;
      this.hostingService = Hosting;
      this.navigatorService = Navigator;
      this.oomService = OomService;
      this.privateDatabaseService = PrivateDatabase;
      this.userService = User;
    }

    $onInit() {
      this.productId = this.$stateParams.productId;

      this.database = this.$scope.database;
      this.isExpired = _.get(this.database, 'serviceInfos.status') === 'expired';
      this.displayMore = {
        value: false,
      };

      this.hostingsLinked = [];
      this.userInfos = {};

      this.database.oom = {
        nbOomError: 4,
      };

      if (!this.isExpired) {
        this.getHostingsLinked();
        this.getOomList();
      }
    }

    convertBytesSize(nb, unit, decimalWanted = 0) {
      const res = filesize(this.converterService.convertToOctet(nb, unit), {
        output: 'object',
        round: decimalWanted,
        base: -1,
      });
      const resUnit = this.$scope.tr(`unit_size_${res.symbol}`);

      return `${res.value} ${resUnit}`;
    }

    getOomList() {
      return this.oomService
        .getOomList(this.productId)
        .then((oomList) => {
          this.database.oom.list = oomList;
          this.database.oom.realList = [];
          return oomList;
        })
        .then(() => this.getRealList());
    }

    getRealList() {
      this.database.oom.realList = _.filter(
        this.database.oom.list,
        item => filesize(item.sizeReached, { output: 'object' }).value
          > this.database.ram.value,
      );
      return this.database.oom.realList;
    }

    getHostingsLinked() {
      this.privateDatabaseService
        .getHostingsLinked(this.productId)
        .then(hostingsLinkedsId => this.$q.all(_.map(
          hostingsLinkedsId,
          mutuName => this.isAdminMutu(mutuName)
            .then(isAdmin => ({
              name: mutuName,
              isAdmin,
            })),
        )))
        .then((hostingsLinked) => {
          this.hostingsLinked = hostingsLinked;
        })
        .catch(err => this.alerter.error(err));
    }

    getUserInfos() {
      this.userService
        .getUser()
        .then((user) => {
          this.userInfos = user;
        })
        .catch(err => this.$q.reject(err));
    }

    isAdminMutu(mutu) {
      this.getUserInfos()
        .then(() => this.hostingService.getServiceInfos(mutu))
        .then(mutuInfo => _.some(
          [
            mutuInfo.contactBilling,
            mutuInfo.contactTech,
            mutuInfo.contactAdmin,
          ],
          contactName => this.userInfos.nichandle === contactName,
        ))
        .catch((err) => {
          this.alerter.error(err);
          return false;
        });
    }

    goToHosting(hostingName) {
      this.$rootScope.$broadcast('leftNavigation.selectProduct.fromName', {
        name: hostingName,
        type: 'HOSTING',
      });
      this.navigatorService.navigate(`configuration/hosting/${hostingName}`);
    }

    changeRootPassword() {
      this.$scope.taskState.changeRootPassword = true;
      this.$scope.setAction(
        'user/update/password/root/private-database-user-update-password-root',
        {
          database: this.$scope.database,
          passwordType: 'root',
        },
      );
    }

    changeFtpPassword() {
      this.$scope.taskState.changeFtpPassword = true;
      this.$scope.setAction(
        'user/update/password/root/private-database-user-update-password-root',
        {
          database: this.$scope.database,
          passwordType: 'ftp',
        },
      );
    }

    goToOom() {
      this.$scope.setAction('oom/private-database-oom', {
        database: this.$scope.database,
      });
    }
  },
);
