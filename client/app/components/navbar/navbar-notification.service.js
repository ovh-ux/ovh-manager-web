class NavbarNotificationService {
  constructor(
    $interval,
    $q,
    $translate,
    Alerter,
    atInternet,
    constants,
    navbar,
    OvhApiNotificationAapi,
    UNIVERSE,
  ) {
    this.$interval = $interval;
    this.$q = $q;
    this.$translate = $translate;

    this.alerter = Alerter;
    this.atInternet = atInternet;
    this.constants = constants;
    this.navbar = navbar;
    this.OvhApiNotificationAapi = OvhApiNotificationAapi;

    this.UNIVERSE = UNIVERSE;

    this.NOTIFICATION_REFRESH_TIME = 60000;
  }

  getMessages() {
    return this.$translate.refresh().then(() => this.OvhApiNotificationAapi.query({
      lang: this.$translate.preferredLanguage(),
      target: this.constants.target,
      universe: this.UNIVERSE,
    }).$promise);
  }

  getSubLinks() {
    return this.getMessages()
      .then(messages => messages.map(message => this.convertSubLink(message)))
      .catch(() => undefined);
  }

  /* eslint-disable class-methods-use-this */
  formatTime(dateTime) {
    return moment(dateTime).fromNow();
  }
  /* eslint-enable class-methods-use-this */

  /* eslint-disable no-param-reassign */
  toggleSublinkAction(toUpdate, linkClicked) {
    if (toUpdate.isActive && !toUpdate.updating) {
      toUpdate.updating = true;
      this.OvhApiNotificationAapi.post({ completed: [toUpdate.id] }).$promise.then(() => {
        toUpdate.isActive = false;
        toUpdate.acknowledged = true;
      }).finally(() => { toUpdate.updating = false; });
    } else if (!toUpdate.isActive && !toUpdate.updating && !linkClicked) {
      toUpdate.updating = true;
      this.OvhApiNotificationAapi.post({ acknowledged: [toUpdate.id] }).$promise.then(() => {
        toUpdate.isActive = true;
        toUpdate.acknowledged = true;
      }).finally(() => { toUpdate.updating = false; });
    }
  }
  /* eslint-disable no-param-reassign */

  convertSubLink(notification) {
    notification.time = this.formatTime(notification.date);
    notification.url = notification.urlDetails.href;
    notification.isActive = _.contains(['acknowledged', 'delivered'], notification.status);
    notification.acknowledged = _.contains(['acknowledged', 'completed', 'unknown'], notification.status);
    notification.actionClicked = toUpdate => this.toggleSublinkAction(toUpdate);
    notification.linkClicked = toUpdate => this.toggleSublinkAction(toUpdate, true);
    return notification;
  }

  acknowledgeAll() {
    if (this.navbarContent) {
      const toAcknowledge = this.navbarContent.subLinks
        .filter(subLink => !subLink.acknowledged && subLink.isActive);
      if (toAcknowledge.length) {
        this.OvhApiNotificationAapi
          .post({ acknowledged: toAcknowledge.map(x => x.id) }).$promise
          .then(() => {
            toAcknowledge.forEach((sublink) => {
              sublink.acknowledged = true;
            });
          });
      }
      this.navbarContent.iconAnimated = false;
    }
  }

  setRefreshTime(sublinks) {
    if (this.formatTimeTask) {
      this.$interval.cancel(this.formatTimeTask);
    }
    this.formatTimeTask = this.$interval(() => {
      sublinks.forEach((notification) => {
        notification.time = this.formatTime(notification.date);
      });
    }, this.NOTIFICATION_REFRESH_TIME);
  }

  getNavbarContent() {
    return this.getSubLinks().then((sublinks) => {
      this.setRefreshTime(sublinks);

      const navbarContent = {
        name: 'notifications',
        title: this.navbar.constructor.buildMenuTitle(this.$translate.instant('common_navbar_notification_title')),
        headerTitle: this.$translate.instant('common_navbar_notification_title'),
        iconClass: 'icon-notifications',
        iconAnimated: this.constructor.shouldAnimateIcon(sublinks),
        limitTo: 10,
        onClick: () => {
          this.acknowledgeAll();
          this.atInternet.trackClick({
            name: 'notifications',
            type: 'action',
          });
        },
        subLinks: sublinks,
        show: true,
      };
      this.navbarContent = navbarContent;
      return navbarContent;
    });
  }

  static shouldAnimateIcon(sublinks) {
    return _.some(sublinks, sublink => _.includes(['incident', 'error', 'warning'], sublink.level) && sublink.isActive);
  }
}

angular.module('services').service('NavbarNotificationService', NavbarNotificationService);
