/* eslint-disable class-methods-use-this, max-len */
{
    const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
    const IPV4_CIDR_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\/([0-9]|[1-2][0-9]|3[0-2]))?$/;
    const IPV6_REGEX = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/i;
    const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9]+([\.+\-\w][a-zA-Z0-9]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
    const SUBDOMAIN_REGEX = /^[a-z0-9-]*[a-z0-9]+$/i;
    const DOMAIN_REGEX = /^(?:(?:(?:\*\.)|_)?(?:(?:[a-z0-9]-*)*[a-z0-9]+)(?:\._?(?:[a-z0-9]-*)*[a-z0-9]+)*(?:\.(?:[a-z]{2,})))$/;
    const URL_REGEX = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9]-*)*[a-z0-9]+)(?:\.(?:[a-z0-9]-*)*[a-z0-9]+)*(?:\.(?:[a-z]{2,}))\.?)(?::(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d\d\d|[1-9]\d\d|[1-9]\d))?$/i;

    angular
        .module("services")
        .service("Validator", class Validator {
            constructor () {
                this.MAX_DOMAIN_LENGTH = 63;
            }

            /**
             *
             * @param {string} ip
             * @param {boolean} options.includeCIDR True if the IP must contain a CIDR (/0 to /32)
             */
            isIPv4Valid (ip, options = {}) {
                return _(ip).isString() && (options.includeCIDR ? IPV4_CIDR_REGEX.test(ip) : IPV4_REGEX.test(ip));
            }

            isIPv6Valid (ip) {
                return _(ip).isString() && IPV6_REGEX.test(ip);
            }

            isIPValid (ip, options = {}) {
                return this.isIPv4Valid(ip, options) || this.isIPv6Valid(ip, options);
            }

            isEmailAddressValid (emailAddress) {
                return _(emailAddress).isString() && EMAIL_ADDRESS_REGEX.test(emailAddress);
            }

            /**
             * regexp matching
             * x.ca
             * x.ca:1
             * http://x.ca:10
             * http://x.ca
             * https://x.ca:10
             * https://x.ca
             * example.com
             * example.co.uk
             * www.example.com
             * example.com/path?query
             * @param {string} url
             */
            isURLValid (url) {
                if (!this.isUrlParameterValid(url)) {
                    return false;
                }

                return URL_REGEX.test(url);
            }

            isUrlParameterValid (url) {
                const urlIsString = _(url).isString();
                const urlIsEmpty = urlIsString && _(url).isEmpty();

                return urlIsString && !urlIsEmpty;
            }

            /**
             * @param {string} domain
             * @param {object} opts
             * @param {boolean} opts.canBeginWithUnderscore - if NDD can be like _foo._bar.example.com
             * @param {boolean} opts.canBeginWithWildcard - if NDD can be like *.foo.bar.example.com
             */
            isDomainNameValid (domain, opts = {}) {
                if (_.isEmpty(domain)) {
                    return false;
                }

                const formattedDomainName = punycode.toASCII(domain.trim());
                const isShortEnough = formattedDomainName.length <= 255;
                const subDomainAreValid = this.areSubDomainNamesValids(formattedDomainName, opts);
                const domainIsIP = this.isIPValid(formattedDomainName);
                const domainNameIsValid = DOMAIN_REGEX.test(domain);

                return isShortEnough && subDomainAreValid && !domainIsIP && domainNameIsValid;
            }

            areSubDomainNamesValids (formattedDomainName, opts = {}) {
                let subDomains = formattedDomainName.split(".");

                if (opts.canBeginWithWildcard === true && /^(?:\*\.)/.test(formattedDomainName)) {
                    subDomains = _(subDomains).rest().value();
                }

                const subDomainNamesAreValid = !_(subDomains)
                    .some((subDomainName) => {
                        const subDomainIsLongEnough = subDomainName.length <= this.MAX_DOMAIN_LENGTH;

                        let formattedSubDomainName = subDomainName;
                        if (opts.canBeginWithUnderscore === true && /^_[^_]+$/.test(subDomainName)) {
                            formattedSubDomainName = subDomainName.substr(1);
                        }

                        const subDomainNameIsValid = SUBDOMAIN_REGEX.test(formattedSubDomainName);

                        return !subDomainIsLongEnough || !subDomainNameIsValid;
                    });

                const urlHasTLD = subDomains.length >= 2;

                return urlHasTLD && subDomainNamesAreValid;
            }

            isLetsEncryptDomainNameValid (subdomain, domain, opts) {
                return this.isDomainNameValid(`${subdomain}${domain}`, opts) && `${subdomain}${domain}`.length < this.MAX_DOMAIN_LENGTH;
            }

            isSubDomainNameValid (subDomain, opts = {}) {
                // This works because sub domains are supposed to be < 63 characters
                return _(subDomain).isString() && this.isDomainNameValid(`${subDomain}.example.com`, opts);
            }
        });
}
