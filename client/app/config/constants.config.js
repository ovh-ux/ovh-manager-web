"use strict";
module.exports = {
    EU : {
        CHATBOT_URL: {
            SLACK: "https://slack.com/oauth/authorize?&client_id=149394412983.149395414183&scope=bot,chat:write:bot",
            FACEBOOK_MESSENGER: "https://m.me/975451932604879"
        },
        BILLING_URL: "https://www.ovh.com/manager/dedicated/#/billing/history",
        AUTORENEW_URL: "https://www.ovh.com/manager/dedicated/#/billing/autoRenew",
        RENEW_URL    : "https://eu.ovh.com/fr/cgi-bin/order/renew.cgi?domainChooser={serviceName}",
        LOGS_URCHIN  : "https://logs.ovh.net/{serviceName}/urchin6/",
        LOGS_URCHIN_GRA  : "https://logs.{cluster}.hosting.ovh.net/{serviceName}/urchin6/",
        STATS_LOGS   : "https://logs.ovh.net/{serviceName}/",
        STATS_LOGS_GRA   : "https://logs.{cluster}.hosting.ovh.net/{serviceName}/",
        loginUrl     : "/auth",
        UNIVERS      : "web",
        UNIVERSES : {
            "PORTAL": "PORTAL",
            "WEB": "WEB",
            "DEDICATED": "DEDICATED",
            "CLOUD": "CLOUD",
            "TELECOM": "TELECOM",
            "SUNRISE": "SUNRISE",
            "PARTNERS": "PARTNERS"
        },
        HOSTING: {
            OFFERS: {
                START_10_M: {
                    TYPE_VALUE: "START_10_M",
                    LIST_VALUE: "START"
                }
            },
            MODULES: {
                DEFAULT_INSTALL_PATH: "./www/"
            }
        },
        DOMAIN: {
                domainUnlockRegistry : {
                    PT : "https://registo.dns.pt",
                    LT:  "http://www.domreg.lt/public?sp=tradelt",
                    LV : "https://www.nic.lv/en/"
                }
            },
        TOP_GUIDES: {
            domainHosting: [
                {
                    title: "core_top_guide_2_title",
                    label: "TopGuide-Web-2",
                    url: "https://docs.ovh.com/fr/hosting/premiers-pas-avec-hebergement-web/"
                }, {
                    title: "core_top_guide_3_title",
                    label: "TopGuide-Web-3",
                    url: "https://docs.ovh.com/fr/emails/generalites-sur-les-emails-mutualises/"
                }, {
                    title: "core_top_guide_5_title",
                    label: "TopGuide-Web-5",
                    url: "https://docs.ovh.com/fr/hosting/modules-en-1-clic/"
                }, {
                    title: "core_top_guide_6_title",
                    label: "TopGuide-Web-6",
                    url: "https://docs.ovh.com/fr/domains/editer-ma-zone-dns/"
                }, {
                    title: "core_top_guide_7_title",
                    label: "TopGuide-Web-7",
                    url: "https://docs.ovh.com/fr/hosting/erreur-site-non-installe/"
                }, {
                    title: "core_top_guide_database_title",
                    label: "TopGuide-Web-8",
                    url: "https://docs.ovh.com/fr/hosting/creer-base-de-donnees/"
                }, {
                    title: "core_top_guide_9_title",
                    label: "TopGuide-Web-9",
                    url: "https://docs.ovh.com/fr/microsoft-collaborative-solutions/migration-adresse-e-mail-mutualisee-vers-exchange/"
                }
            ]
        },
        URLS: {
            managerv3: {
                CA: "https://ca.ovh.com/manager/",
                CZ: "https://www.ovh.cz/managerv3/home.pl",
                DE: "https://www.ovh.de/managerv3/home.pl",
                EN: "https://www.ovh.co.uk/managerv3/home.pl",
                ES: "https://www.ovh.es/managerv3/home.pl",
                FI: "https://www.ovh-hosting.fi/managerv3/home.pl",
                FR: "https://www.ovh.com/managerv3/home.pl",
                GB: "https://www.ovh.co.uk/managerv3/home.pl",
                IE: "https://www.ovh.ie/managerv3/home.pl",
                IT: "https://www.ovh.it/managerv3/home.pl",
                LT: "https://www.ovh.lt/managerv3/home.pl",
                MA: "https://www.ovh.com/managerv3/home.pl",
                NL: "https://www.ovh.nl/managerv3/home.pl",
                PL: "https://www.ovh.pl/managerv3/home.pl",
                PT: "https://www.ovh.pt/managerv3/home.pl",
                QC: "https://ca.ovh.com/manager/",
                RU: "https://www.ovh.ie/managerv3/home.pl",
                SN: "https://www.ovh.sn/managerv3/home.pl",
                TN: "https://www.ovh.com/managerv3/home.pl",
                WE: "https://ca.ovh.com/manager/"
            },
            CZ: {
                support: "http://www.ovh.cz/podpora/",
                support_contact: "http://www.ovh.cz/podpora/",
                guides: {
                    home: "http://prirucky.ovh.cz/",
                    all: "https://docs.ovh.com/cz/cs/",
                    hostingPhpConfiguration: "https://www.ovh.cz/g1999.hosting_how_to_configure_php_from_your_customer_account",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/cz/cs/clouddb/zaciname-s-clouddb/",
                        db: "https://docs.ovh.com/cz/cs/clouddb/zaciname-s-mysql-a-mariadb/",
                        beginPostgre: "https://docs.ovh.com/cz/cs/clouddb/zaciname-s-postgresql/"
                    },
                    emailsCreation: "https://www.ovh.cz/g1343.qssq",
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    siteOnline: "https://www.ovh.cz/g1374.mutualise_mettre_mon_site_en_ligne",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "http://www.ovh.cz/domeny/sluzba_dnssec.xml",
                vpsCloud: "http://www.ovh.cz/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.cz/cgi-bin/newOrder/order.cgi",
                domainOrderChange: "https://www.ovh.cz/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.cz/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.cz/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.cz/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.cz/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.cz/emails/hosted-exchange-2013/",
                emailproOrder: "https://www.ovh.cz/emails/email-pro/",
                office365Order: "https://www.ovh.cz/office-365/",
                renewAlign: "https://www.ovh.cz/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.cz/domeny/nabidka_hosting_start10m.xml"
            },
            DE: {
                support: "http://www.ovh.de/support/",
                support_contact: "http://www.ovh.de/support/",
                guides: {
                    home: "http://hilfe.ovh.de/",
                    all: "https://docs.ovh.com/de/de/",
                    emailsConfiguration: "https://www.ovh.de/g1474.allgemeine-informationen-ovh-webhosting-mails",
                    autoRenew: "https://www.ovh.de/g1271.renew",
                    emailsCreation: "https://www.ovh.de/g1343.qssq",
                    hostingPhpConfiguration: "https://www.ovh.de/g1999.webhosting_so_andern_sie_die_php-version_von_ihrem_kundencenter_aus",
                    hostingPrivateDatabase: "https://www.ovh.de/g2023.alles_wissenswerte_zum_sql_private_angebot",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/de/clouddb/erste-schritte-mit-clouddb/",
                        db: "https://docs.ovh.com/de/clouddb/erste-schritte-mit-mysql-und-mariadb/",
                        beginPostgre: "https://docs.ovh.com/de/clouddb/erste-schritte-mit-postgresql/"
                    },
                    wordpress: "https://codex.wordpress.org/de:Erste_Schritte_mit_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/Deutsche+Dokumentation",
                    phpAppendices: "http://php.net/manual/de/appendices.php",
                    sshCreate: "https://www.ovh.de/g1769.creating_ssh_keys",
                    sshChange: "https://www.ovh.de/g2069.replacing_your_lost_ssh_key_pair",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "https://www.ovh.de/domains/dnssec_dienst.xml",
                vpsCloud: "http://www.ovh.de/virtual_server/vps-cloud.xml",
                domainOrder: "https://www.ovh.de/order/domain/",
                domainOrderChange: "https://www.ovh.de/cgi-bin/newOrder/order.cgi",
                changeOwner: "https://www.ovh.de/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.de/order/domain/#/legacy/domain/trade/list",
                domainOrderTrade: "https://www.ovh.de/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                oldInterface: "https://www.ovh.de/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.de/emails/hosted-exchange/",
                emailproOrder: "https://www.ovh.de/emails/email-pro/",
                office365Order: "https://www.ovh.de/office-365/",
                renewAlign: "https://www.ovh.de/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.de/domains/angebot_hosting_start10m.xml"
            },
            ES: {
                support: "http://www.ovh.es/soporte/",
                support_contact: "http://www.ovh.es/soporte/",
                guides: {
                    home: "http://guias.ovh.es/",
                    all: "https://docs.ovh.com/es/web/",
                    emailsConfiguration: "https://www.ovh.es/g1474.correo-alojamiento-compartido-ovh",
                    emailsCreation: "https://www.ovh.es/g1343.qssq",
                    hostingPhpConfiguration: "https://www.ovh.es/g1999.alojamiento_compartido_configurar_la_versión_de_PHP_desde_el_área_de_cliente",
                    hostingPrivateDatabase: "https://www.ovh.es/g2023.todo_sobre_el_sql_privado",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/es/clouddb/empezar-con-clouddb/",
                        db: "https://docs.ovh.com/es/clouddb/empezar-con-mysql-y-mariadb/",
                        beginPostgre: "https://docs.ovh.com/es/clouddb/empezar-con-postgresql/"
                    },
                    wordpress: "https://codex.wordpress.org/es:Getting_Started_with_WordPress",
                    prestashop: "http://doc.prestashop.com/pages/viewpage.action?pageId=26148899",
                    siteOnline: "https://www.ovh.es/g1374.web_hosting_publicar_un_sitio_web_en_internet",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    sshCreate: "https://www.ovh.es/g1769.creating_ssh_keys",
                    sshAdd: "https://www.ovh.es/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.es/g2069.replacing_your_lost_ssh_key_pair",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "https://www.ovh.es/dominios/servicio-dnssec.xml",
                vpsCloud: "http://www.ovh.es/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.es/order/domain/",
                domainOrderChange: "https://www.ovh.es/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.es/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.es/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.es/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.es/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.es/emails/hosted-exchange/",
                emailproOrder: "https://www.ovh.es/emails/email-pro/",
                office365Order: "https://www.ovh.es/office-365/",
                renewAlign: "https://www.ovh.es/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.es/dominios/oferta_hosting_start10m.xml"
            },
            FI: {
                support: "http://www.ovh-hosting.fi/tuki/",
                support_contact: "http://www.ovh-hosting.fi/tuki/",
                guides: {
                    home: "http://ohjeet.ovh-hosting.fi/",
                    all: "https://docs.ovh.com/fi/fi/",
                    emailsConfiguration: "https://www.ovh-hosting.fi/g1474.yleista-ovh-webhotellit-sahkopostit",
                    emailsCreation: "https://www.ovh-hosting.fi/g1343.qssq",
                    hostingPrivateDatabase: "https://www.ovh-hosting.fi/g2023.kaikki_mita_tarvitsee_tietaa_sql_private_-palvelusta",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/fi/clouddb/clouddb-palvelun-kayton-aloitus/",
                        db: "https://docs.ovh.com/fi/clouddb/mysql-ja-mariadb-tietokantojen-kayton-aloitus/",
                        beginPostgre: "https://docs.ovh.com/fi/clouddb/postgresql-tietokantojen-kayton-aloitus/"
                    },
                    dnsForExternalDomain: "https://www.ovh-hosting.fi/g2229.dns-alueen_luominen_ulkopuoliselle_verkkotunnukselle",
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    siteOnline: "https://www.ovh-hosting.fi/g1374.webhotellit_kotisivujen_siirto_verkkoon",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "http://www.ovh-hosting.fi/verkkotunnukset/dnssec_palvelu.xml",
                vpsCloud: "http://www.ovh-hosting.fi/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh-hosting.fi/cgi-bin/newOrder/order.cgi",
                domainOrderChange: "https://www.ovh-hosting.fi/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh-hosting.fi/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.com/cgi-bin/fi/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh-hosting.fi/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh-hosting.fi/managerv3/home.pl",
                exchangeOrder: "https://www.ovh-hosting.fi/sahkopostit/hosted-exchange/",
                emailproOrder: "https://www.ovh-hosting.fi/sahkopostit/email-pro/",
                office365Order: "https://www.ovh-hosting.fi/office-365/",
                renewAlign : "https://www.ovh-hosting.fi/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh-hosting.fi/verkkotunnukset/start10m_webhotelli_tuote.xml"

            },
            FR: {
                support: "https://www.ovh.com/fr/support/",
                support_contact: "https://www.ovh.com/fr/support/nous-contacter/",
                guides: {
                    home: "https://docs.ovh.com",
                    all: "https://docs.ovh.com/fr/web/",
                    autoRenew: "https://www.ovh.com/fr/g1271.guide_dutilisation_du_renouvellement_automatique_ovh",
                    hostingCron: "https://www.ovh.com/fr/g1990.mutualise_taches_automatisees_cron",
                    hostingModule: "https://docs.ovh.com/fr/hosting/modules-en-1-clic/",
                    hostingScriptEmail: "https://www.ovh.com/fr/g1974.mutualise_suivi_des_emails_automatises",
                    hostingStatsLogs: "https://www.ovh.com/fr/g1344.mutualise_consulter_les_statistiques_et_les_logs_de_mon_site",
                    hostingPhpConfiguration: "https://docs.ovh.com/fr/fr/web/hosting/mutualise-configurer-la-version-de-php-depuis-votre-espace-client/",
                    hostingPrivateDatabase: "https://docs.ovh.com/fr/hosting/premiers-pas-avec-sql-prive/",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/fr/fr/cloud/clouddb/debuter-avec-clouddb/",
                        db: "https://docs.ovh.com/fr/fr/cloud/clouddb/demarrez-avec-mysql-et-mariadb/",
                        beginPostgre: "https://docs.ovh.com/fr/fr/cloud/clouddb/demarrez-avec-postgresql/"
                    },
                    emailsConfiguration: "https://docs.ovh.com/fr/fr/web/emails/",
                    emailsConfigurationAuto: "https://mail.ovh.net/auto/",
                    emailsConfigurationMacMountainLion: "https://docs.ovh.com/fr/fr/web/emails/configuration-email-mutu-mail-de-mac/",
                    emailsConfigurationMacMavericksAndYosemite: "https://docs.ovh.com/fr/fr/web/emails/guide-configuration-mail-de-mac-mavericks-et-yosemite/",
                    emailsConfigurationMacElCapitain: "https://docs.ovh.com/fr/fr/web/emails/guide-configuration-mail-de-mac-el-capitan/",
                    emailsConfigurationOutlook2007: "https://docs.ovh.com/fr/fr/web/emails/mail-mutualise-guide-configuration-outlook-2007/",
                    emailsConfigurationOutlook2010: "https://docs.ovh.com/fr/fr/web/emails/mail-mutualise-guide-configuration-outlook-2010/",
                    emailsConfigurationOutlook2013: "https://docs.ovh.com/fr/fr/web/emails/mail-mutualise-guide-configuration-outlook-2013/",
                    emailsConfigurationOutlook2016: "https://docs.ovh.com/fr/fr/web/emails/configuration-outlook-2016/",
                    emailsConfigurationIos9: "https://docs.ovh.com/fr/fr/web/emails/mail-mutualise-guide-configuration-iphone-ios-91/",
                    emailsConfigurationAndroid6: "https://docs.ovh.com/fr/fr/web/emails/configuration-android-6/",

                    emailsCreation: "https://www.ovh.com/fr/g1343.creation-adresse-e-mail",
                    emailsMigrateToExchange: "https://docs.ovh.com/fr/microsoft-collaborative-solutions/migration-adresse-e-mail-mutualisee-vers-exchange/",
                    emailsCreateMailingListGuide: "https://www.ovh.com/fr/g1596.mail_mutualise_guide_dutilisation_mailing-list",
                    office365: "https://docs.ovh.com/fr/fr/web/microsoft-collaborative-solutions/commander-et-gerer-un-groupe-de-licences-office-365-ovh",
                    hostingHackState: "https://www.ovh.com/fr/g1392.procedure-fermeture-hack-ovh#reouverture_de_lhebergement_reouverture_suite_passage_en_etat_hack",
                    hostingDisabledState : "https://www.ovh.com/fr/g1392.procedure-fermeture-hack-ovh#reouverture_de_lhebergement_reouverture_suite_passage_en_etat_desactive",
                    additionalDisksGuide: "https://www.ovh.com/fr/g2181.Commande_et_utilisation_d_un_disque_additionnel",
                    dnsForExternalDomain: "https://www.ovh.com/fr/g2229.creer_une_zone_dns_pour_un_domaine_externe",
                    wordpress: "https://codex.wordpress.org/fr:Premiers_pas_avec_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/Guide+de+l%27utilisateur",
                    siteOnline: "https://www.ovh.com/fr/g1374.mutualise_mettre_mon_site_en_ligne",
                    domainOwoActivation: "https://www.ovh.com/fr/g2137.whois_-_activation_de_owo",
                    domainOwnerTransfert: "https://docs.ovh.com/fr/domains/changement-proprietaire-domaine/",
                    domainEditZone: "https://docs.ovh.com/fr/domains/editer-ma-zone-dns/",
                    domainDnsGettingStarted: "https://docs.ovh.com/fr/domains/generalites-serveurs-dns/",
                    domainZonecheck: "https://docs.ovh.com/fr/domains/zonecheck-de-votre-domaine/",
                    domainRedirection: "https://docs.ovh.com/fr/domains/redirection-nom-de-domaine/",
                    domainDynHost: "https://docs.ovh.com/fr/domains/utilisation-dynhost/",
                    domainGlueRegistry: "https://docs.ovh.com/fr/domains/glue-registry/",
                    domainDsRecord: "https://www.ovh.com/fr/g609.securiser_votre_domaine_avec_dnssec",
                    domainAddDnsZone: "https://www.ovh.com/fr/g2229.creer_une_zone_dns_pour_un_domaine_externe",
                    phpAppendices: "http://php.net/manual/fr/appendices.php",
                    sshCreate: "https://www.ovh.fr/g1769.creation_des_cles_ssh",
                    sshAdd: "https://www.ovh.fr/g1924.configurer_des_cles_ssh_supplementaires",
                    sshChange: "https://www.ovh.fr/g2069.changer_sa_cle_ssh_en_cas_de_perte",
                    works: {
                        apache: "https://community.ovh.com/t/faq-comment-mettre-a-jour-mon-site-pour-supporter-apache-2-4/3850"
                    }
                },
                dnssec_service: "https://www.ovh.com/fr/domaines/service_dnssec.xml",
                vpsCloud: "https://www.ovh.com/fr/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.com/fr/order/domain/",
                domainOrderChange: "https://www.ovh.com/fr/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.com/fr/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                domainWebmailUrl: "https://mail.ovh.net/",
                domainOMMUrl: "https://omm.ovh.net/",
                changeOwner: "https://www.ovh.com/cgi-bin/fr/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.com/fr/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.com/managerv3/home.pl",
                emailsOrder: "https://www.ovh.com/emails/",
                exchangeOrder: "https://www.ovh.com/fr/emails/hosted-exchange/",
                emailproOrder: "https://www.ovh.com/fr/emails/email-pro/",
                office365Order: "https://www.ovh.com/fr/office-365/",
                renewAlign: "https://eu.ovh.com/fr/cgi-bin/order/renew.cgi?alignDate=1",
                alldomOrder: "https://www.ovh.com/fr/order/domain/#/legacy/domain/alldom?domain=",
                ipShortageWarnUrl: "http://travaux.ovh.net/?do=details&id=18851",
                start10mMarket: "https://www.ovh.com/fr/domaines/offre_hebergement_start10m.xml"
            },
            GB: {
                support: "http://www.ovh.co.uk/support/",
                support_contact: "http://www.ovh.co.uk/support/",
                guides: {
                    home: "http://help.ovh.co.uk/",
                    all: "https://docs.ovh.com/gb/en/",
                    emailsConfiguration: "https://www.ovh.co.uk/g1474.ovh-mails-general-use",
                    autoRenew: "https://www.ovh.co.uk/g1271.renew",
                    emailsCreation: "https://www.ovh.co.uk/g1343.qssq",
                    hostingPhpConfiguration: "https://www.ovh.co.uk/g1999.hosting_how_to_configure_php_from_your_customer_account",
                    hostingPrivateDatabase: "https://www.ovh.co.uk/g2023.what_you_need_to_know_about_private_sql",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/gb/en/clouddb/getting-started-with-clouddb/",
                        db: "https://docs.ovh.com/gb/en/clouddb/get-started-with-mysql-and-mariadb/",
                        beginPostgre: "https://docs.ovh.com/gb/en/clouddb/getting-started-with-postgresql/"
                    },
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    sshCreate: "https://www.ovh.uk/g1769.creating_ssh_keys",
                    sshAdd: "https://www.ovh.uk/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.uk/g2069.replacing_your_lost_ssh_key_pair",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "https://www.ovh.co.uk/domains/dnssec_service.xml",
                vpsCloud: "http://www.ovh.co.uk/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.co.uk/order/domain",
                domainOrderChange: "https://www.ovh.co.uk/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.co.uk/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.co.uk/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.co.uk/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.co.uk/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.co.uk/emails/hosted-exchange/",
                emailproOrder: "https://www.ovh.co.uk/emails/email-pro/",
                office365Order: "https://www.ovh.co.uk/office-365/",
                renewAlign : "https://www.ovh.co.uk/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                ipShortageWarnUrl: "http://status.ovh.com/?do=details&id=13687"
            },
            IE: {
                domainOrder: "https://www.ovh.ie/order/domain",
                domainOrderTrade: "https://www.ovh.ie/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                bulkChangeOwner: "https://www.ovh.ie/order/domain/#/legacy/domain/trade/list",
                guides: {
                    hostingPhpConfiguration: "https://www.ovh.ie/g1999.hosting_how_to_configure_php_from_your_customer_account",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                }
            },
            IT: {
                support: "http://www.ovh.it/supporto/",
                support_contact: "http://www.ovh.it/supporto/",
                guides: {
                    home: "http://guida.ovh.it/",
                    all: "https://docs.ovh.com/it/it/",
                    emailsConfiguration: "https://www.ovh.it/g1474.info-email-condivise-ovh",
                    emailsCreation: "https://www.ovh.it/g1343.qssq",

                    emailsConfigurationMacMountainLion: "https://www.ovh.it/g1287.configurazione-mail-macos",
                    emailsConfigurationMacMavericksAndYosemite: "https://www.ovh.it/g1599.email_condivisa_guida_alla_configurazione_email_per_mac-_mavericks_e_yosemite",
                    emailsConfigurationMacElCapitain: "https://www.ovh.it/hosting/guides/g1965.servizio_email_guida_alla_configurazione_su_mail_di_mac_-_el_capitan",
                    emailsConfigurationOutlook2007: "https://www.ovh.it/g1298.servizio_email_guida_alla_configurazione_di_outlook_2007",
                    emailsConfigurationOutlook2010: "https://www.ovh.it/g1299.servizio_email_guida_alla_configurazione_di_outlook_2010",
                    emailsConfigurationOutlook2013: "https://www.ovh.it/hosting/guides/g1286.servizio_email_guida_alla_configurazione_di_outlook_2013",
                    emailsConfigurationIos9: "https://www.ovh.it/g2004.servizio_email_guida_configurazione_iphone_ios_91",
                    emailsConfigurationAndroid6: "https://www.ovh.it/hosting/guides/g1912.servizio_email_guida_alla_configurazione_di_uno_smartphone_con_51",

                    autoRenew: "https://www.ovh.it/g1271.imposta_il_rinnovo_automatico_dei_tuoi_servizi_ovh",
                    emailsCreateMailingListGuide: "https://www.ovh.it/g1596.mail_mutualise_guide_dutilisation_mailing-list",
                    hostingPhpConfiguration: "https://www.ovh.it/g1999.configura_la_tua_versione_di_php_dal_tuo_Spazio_Cliente_OVH",
                    hostingPrivateDatabase: "https://www.ovh.it/g2023.tutto_sullsql_privato",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/it/clouddb/come-utilizzare-clouddb/",
                        db: "https://docs.ovh.com/it/clouddb/come-utilizzare-mysql-e-mariadb/",
                        beginPostgre: "https://docs.ovh.com/it/clouddb/come-utilizzare-postgresql/"
                    },
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    siteOnline: "https://www.ovh.it/g1374.hosting_condiviso_come_mettere_online_il_tuo_sito",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    sshCreate: "https://www.ovh.it/g1769.creating_ssh_keys",
                    sshAdd: "https://www.ovh.it/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.it/g2069.replacing_your_lost_ssh_key_pair",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "http://www.ovh.it/domini/servizio_dnssec.xml",
                vpsCloud: "http://www.ovh.it/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.it/order/domain/",
                domainOrderChange: "https://www.ovh.it/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.it/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.it/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.it/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.it/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.it/emails/hosted-exchange/",
                emailproOrder: "https://www.ovh.it/emails/email-pro/",
                office365Order: "https://www.ovh.it/office-365/",
                renewAlign : "https://www.ovh.it/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.it/domini/offerta_hosting_start10m.xml"

            },
            LT: {
                support: "http://www.ovh.lt/pagalba/",
                support_contact: "http://www.ovh.lt/pagalba/",
                guides: {
                    home   : "http://gidai.ovh.lt/",
                    all: "https://docs.ovh.com/lt/lt/",
                    autoRenew: "https://www.ovh.lt/g1271.renew",
                    emailsCreation: "https://www.ovh.lt/g1343.qssq",
                    emailsCreateMailingListGuide: "https://www.ovh.lt/g1596.mail_mutualise_guide_dutilisation_mailing-list",
                    hostingPhpConfiguration: "https://www.ovh.lt/g1999.PHP-versijos-keitimas-kliento-sasajoje",
                    hostingPrivateDatabase: "https://www.ovh.lt/g2023.viskas_apie_private_sql_paslauga",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/lt/clouddb/pradzia-su-clouddb/",
                        db: "https://docs.ovh.com/lt/clouddb/mysql-mariadb-naudojimas/",
                        beginPostgre: "https://docs.ovh.com/lt/clouddb/postgresql-naudojimas/"
                    },
                    dnsForExternalDomain: "https://www.ovh.lt/g2229.dns_zonos_kurimas_isoriniam_domenui",
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    siteOnline: "https://www.ovh.lt/g1374.svetainiu_talpinimas_svetaines_ikelimas_i_interneta",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    sshCreate: "https://www.ovh.lt/g1769.creating_ssh_keys",
                    sshChange: "https://www.ovh.lt/g2069.replacing_your_lost_ssh_key_pair",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "http://www.ovh.lt/domenai/paslauga_dnssec.xml",
                vpsCloud: "http://www.ovh.lt/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.lt/order/domain/",
                domainOrderChange: "https://www.ovh.lt/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.lt/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.com/cgi-bin/lt/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.lt/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.lt/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.lt/El_pastas/hosted-exchange/",
                emailproOrder: "https://www.ovh.lt/El_pastas/email-pro/",
                office365Order: "https://www.ovh.lt/office-365/",
                renewAlign: "https://www.ovh.lt/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.lt/domenai/nemokamas_talpinimas_start10m.xml"
            },
            NL: {
                support: "http://www.ovh.nl/support/",
                support_contact: "http://www.ovh.nl/support/",
                guides: {
                    home: "http://gids.ovh.nl/",
                    all: "https://docs.ovh.com/nl/nl/",
                    emailsConfiguration: "https://www.ovh.nl/g1474.algemene-informatie-ovh-webhosting-emails",
                    emailsCreation: "https://www.ovh.nl/g1343.qssq",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/nl/clouddb/aan-de-slag-met-clouddb/",
                        db: "https://docs.ovh.com/nl/clouddb/aan-de-slag-met-mysql-en-mariadb/",
                        beginPostgre: "https://docs.ovh.com/nl/clouddb/aan-de-slag-met-postgresql/"
                    },
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    sshCreate: "https://www.ovh.nl/g1769.creating_ssh_keys",
                    sshChange: "https://www.ovh.nl/g2069.replacing_your_lost_ssh_key_pair",
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "https://www.ovh.com/fr/domaines/service_dnssec.xml",
                vpsCloud: "https://www.ovh.com/fr/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.nl/order/domain/",
                domainOrderChange: "https://www.ovh.nl/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.nl/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.nl/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.nl/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.nl/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.nl/emails/hosted-exchange/",
                emailproOrder: "https://www.ovh.nl/emails/email-pro/",
                office365Order: "https://www.ovh.nl/office-365/",
                renewAlign: "https://www.ovh.nl/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.nl/domains/start10m_hosting_offer.xml"
            },
            PL: {
                support: "https://www.ovh.pl/pomoc/",
                support_contact: "https://www.ovh.pl/pomoc/",
                guides: {
                    home: "https://www.ovh.pl/community/knowledge/",
                    all: "https://docs.ovh.com/pl/pl/",
                    autoRenew: "https://www.ovh.pl/g1271.renew",
                    dnsForExternalDomain: "https://www.ovh.pl/g2229.utworzenie_strefy_dns_dla_zewnetrznej_domeny",
                    emailsConfiguration: "https://www.ovh.pl/g1474.emaile-na-hostingu-www-ovh",
                    emailsConfigurationAuto: "https://www.ovh.pl/mail/",
                    emailsConfigurationMacMountainLion: "https://docs.ovh.com/pl/emails/konfiguracja-mail-macos/",
                    emailsConfigurationMacMavericksAndYosemite: "https://docs.ovh.com/pl/emails/konfiguracja-mail-macos/",
                    emailsConfigurationMacElCapitain: "https://docs.ovh.com/pl/emails/konfiguracja-mail-macos/",
                    emailsConfigurationOutlook2007: "https://docs.ovh.com/pl/emails/konfiguracja_konta_e-mail_w_programie_outlook_2007/",
                    emailsConfigurationOutlook2010: "https://docs.ovh.com/pl/emails/konfiguracja_konta_e-mail_w_programie_outlook_2010/",
                    emailsConfigurationOutlook2013: "https://docs.ovh.com/pl/microsoft-collaborative-solutions/exchange_2013_przewodnik_dotyczacy_korzystania_z_outlook_web_app/",
                    emailsConfigurationOutlook2016: "https://docs.ovh.com/pl/emails/konfiguracja-outlook-2016/",
                    emailsConfigurationIos9: "https://docs.ovh.com/pl/emails/hosting_www_konfiguracja_na_iphone_ios_91/",
                    emailsConfigurationAndroid6: "https://docs.ovh.com/pl/emails/konfiguracja-android/",
                    emailsCreation: "https://www.ovh.pl/g1343.qssq",
                    emailsCreateMailingListGuide: "https://www.ovh.pl/g1596.mail_mutualise_guide_dutilisation_mailing-list",
                    hostingPhpConfiguration: "https://www.ovh.pl/g1999.skonfiguruj_wersje_php_w_panelu_klienta",
                    hostingPrivateDatabase: "https://www.ovh.pl/g2023.prywatny_sql",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/pl/clouddb/pierwsze-kroki-z-clouddb/",
                        db: "https://docs.ovh.com/pl/clouddb/mysql-i-mariadb/",
                        beginPostgre: "https://docs.ovh.com/pl/clouddb/pierwsze-kroki-z-postgresql/"
                    },
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    prestashop: "http://doc.prestashop.com/display/PS16/Polska+dokumentacja",
                    siteOnline: "https://www.ovh.pl/g1374.hosting_www_umieszczenie_strony_w_internecie",
                    sshAdd: "https://www.ovh.pl/g1924.configuring_additionnal_ssh_key",
                    shhChange: "https://www.ovh.pl/g2069.replacing_your_lost_ssh_key_pair",
                    sshCreate: "https://www.ovh.pl/g1769.creating_ssh_keys",
                    wordpress: "https://codex.wordpress.org/Getting_Started_with_WordPress",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "https://www.ovh.pl/domeny/usluga_dnssec.xml",
                vpsCloud: "https://www.ovh.pl/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.pl/order/domain/",
                domainOrderChange: "https://www.ovh.pl/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.pl/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.pl/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.pl/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.pl/managerv3/home.pl",
                emailsOrder: "https://www.ovh.pl/emaile/",
                exchangeOrder: "https://www.ovh.pl/emaile/hosted-exchange/",
                emailproOrder: "https://www.ovh.pl/emaile/email-pro/",
                office365Order: "https://www.ovh.pl/office-365/",
                renewAlign: "https://www.ovh.pl/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.pl/domeny/oferta_serwer_start10m.xml"
            },
            PT: {
                support: "https://www.ovh.pt/suporte/",
                support_contact: "https://www.ovh.pt/suporte/",
                guides: {
                    home: "http://guias.ovh.pt/",
                    all: "https://docs.ovh.com/pt/pt/",
                    autoRenew: "https://www.ovh.pt/g1271.renew",
                    dnsForExternalDomain: "https://www.ovh.pt/g2229.criar_uma_zona_dns_para_um_dominio_externo",
                    emailsConfiguration: "https://www.ovh.pt/g1474.generalidades-mails-partilhados-ovh",
                    emailsCreation: "https://www.ovh.pt/g1343.qssq",
                    emailsCreateMailingListGuide: "https://www.ovh.pt/g1596.mail_mutualise_guide_dutilisation_mailing-list",
                    hostingPhpConfiguration: "https://www.ovh.pt/g1999.partilhado_configurar_a_versao_de_php_a_partir_do_seu_espaco_cliente",
                    hostingPrivateDatabase: "https://www.ovh.pt/g2023.tudo_sobre_sql_privado",
                    hostingPrivateDatabaseDBaaS: {
                        beginner: "https://docs.ovh.com/pt/clouddb/comecar-com-clouddb/",
                        db: "https://docs.ovh.com/pt/clouddb/comecar-com-mysql-e-mariadb/",
                        beginPostgre: "https://docs.ovh.com/pt/clouddb/comecar-com-postgresql/"
                    },
                    phpAppendices: "http://php.net/manual/en/appendices.php",
                    prestashop: "http://doc.prestashop.com/display/PS16/English+documentation",
                    siteOnline: "https://www.ovh.pt/g1374.partilhado_colocar_o_meu_website_online",
                    sshAdd: "https://www.ovh.pt/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.pt/g2069.replacing_your_lost_ssh_key_pair",
                    sshCreate: "https://www.ovh.pt/g1769.creating_ssh_keys",
                    wordpress: "https://codex.wordpress.org/pt-br:Novo_no_WordPress_-_Por_Onde_Come%C3%A7ar",
                    works: {
                        apache: "https://community.ovh.com/t/faq-how-can-i-update-my-website-to-support-apache-2-4/3851"
                    }
                },
                dnssec_service: "http://www.ovh.pt/dominios/servico_dnssec.xml",
                vpsCloud: "http://www.ovh.pt/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.pt/order/domain/",
                domainOrderChange: "https://www.ovh.pt/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.pt/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.pt/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.pt/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.pt/managerv3/home.pl",
                exchangeOrder: "https://www.ovh.pt/emails/hosted-exchange-2013/",
                emailproOrder: "https://www.ovh.pt/emails/email-pro/",
                office365Order: "https://www.ovh.pt/office-365/",
                renewAlign : "https://www.ovh.pt/cgi-bin/order/renew.cgi?alignDate=1&csid=0",
                start10mMarket: "https://www.ovh.pt/dominios/oferta_alojamento_start10m.xml"
            },
            hosting : {
                CA : "https://www.ovh.com/ca/en/",
                CZ : "https://www.ovh.cz/webhosting/",
                DE : "https://www.ovh.de/hosting/",
                EN : "https://www.ovh.co.uk/web-hosting/",
                ES : "https://www.ovh.es/hosting/",
                FI : "https://www.ovh-hosting.fi/webhotelli/",
                FR : "https://www.ovh.com/fr/hebergement-web/",
                GB : "https://www.ovh.co.uk/web-hosting/",
                IE : "https://www.ovh.ie/web-hosting/",
                IT : "https://www.ovh.it/hosting-web/",
                LT : "https://www.ovh.lt/svetainiu-talpinimas/",
                MA : "https://www.ovh.com/ma/hebergement-web/",
                NL : "https://www.ovh.nl/shared-hosting/",
                PL : "https://www.ovh.pl/hosting/",
                PT : "https://www.ovh.pt/alojamento-partilhado/",
                QC : "https://www.ovh.com/ca/fr/",
                RU : "https://www.ovh.ie/web-hosting/",
                SN : "https://www.ovh.sn/hebergement-web/",
                TN : "https://www.ovh.com/tn/hebergement-web/",
                WE : "http://www.ovh.com/us/"
            },
            cloudweb : {
                CZ : "https://www.ovh.cz/webhosting/cloud-web.xml",
                DE : "https://www.ovh.de/hosting/cloud-web.xml",
                EN : "https://www.ovh.co.uk/web-hosting/cloud-web.xml",
                ES : "https://www.ovh.es/hosting/cloud-web.xml",
                FI : "https://www.ovh-hosting.fi/webhotelli/cloud-web.xml",
                FR : "https://www.ovh.com/fr/hebergement-web/cloud-web.xml",
                GB : "https://www.ovh.co.uk/web-hosting/cloud-web.xml",
                IE : "https://www.ovh.ie/web-hosting/cloud-web.xml",
                IT : "https://www.ovh.it/hosting-web/cloud-web.xml",
                LT : "https://www.ovh.lt/svetainiu-talpinimas/cloud-web.xml",
                MA : "https://www.ovh.com/ma/hebergement-web/cloud-web.xml",
                NL : "https://www.ovh.nl/shared-hosting/cloud-web.xml",
                PL : "https://www.ovh.pl/hosting/cloud-web.xml",
                PT : "https://www.ovh.pt/alojamento-partilhado/cloud-web.xml",
                SN : "https://www.ovh.sn/hebergement-web/cloud-web.xml",
                TN : "https://www.ovh.com/tn/hebergement-web/cloud-web.xml"
            },
            performance : {
                CZ : "https://www.ovh.cz/webhosting/webhosting-performance.xml",
                DE : "https://www.ovh.de/hosting/performance-hosting.xml",
                EN : "https://www.ovh.co.uk/web-hosting/performance-web-hosting.xml",
                ES : "https://www.ovh.es/hosting/hosting-performance.xml",
                FI : "https://www.ovh-hosting.fi/webhotelli/performance-webhotelli.xml",
                FR : "https://www.ovh.com/fr/hebergement-web/hebergement-performance.xml",
                GB : "https://www.ovh.co.uk/web-hosting/performance-web-hosting.xml",
                IE : "https://www.ovh.ie/web-hosting/performance-web-hosting.xml",
                IT : "https://www.ovh.it/hosting-web/hosting-web-performance.xml",
                LT : "https://www.ovh.lt/svetainiu-talpinimas/svetainiu-talpinimas-performance.xml",
                MA : "https://www.ovh.com/ma/hebergement-web/hebergement-performance.xml",
                NL : "https://www.ovh.nl/shared-hosting/performance-shared-hosting.xml",
                PL : "https://www.ovh.pl/hosting/hosting-performance.xml",
                PT : "https://www.ovh.pt/alojamento-partilhado/alojamento-partilhado-performance.xml",
                SN : "https://www.ovh.sn/hebergement-web/hebergement-performance.xml",
                TN : "https://www.ovh.com/tn/hebergement-web/hebergement-performance.xml"
            },
            MX_PLAN : {
                CA : "",
                CZ : "https://www.ovh.cz/produkty/mxplan.xml",
                DE : "https://www.ovh.de/produkte/mxplan.xml",
                EN : "https://www.ovh.co.uk/products/mxplan.xml",
                ES : "https://www.ovh.es/productos/mxplan.xml",
                FI : "https://www.ovh-hosting.fi/produits/mxplan.xml",
                FR : "https://www.ovh.com/fr/produits/mxplan.xml",
                GB : "https://www.ovh.co.uk/products/mxplan.xml",
                IE : "https://www.ovh.ie/products/mxplan.xml",
                IT : "https://www.ovh.it/prodotti/mxplan.xml",
                LT : "https://www.ovh.lt/produktai/mxplan.xml",
                MA : "https://www.ovh.com/ma/produits/mxplan.xml",
                NL : "https://www.ovh.nl/producten/mxplan.xml",
                PL : "https://www.ovh.pl/produkty/mxplan.xml",
                PT : "https://www.ovh.pt/produtos/mxplan.xml",
                QC : "",
                RU : "https://www.ovh.ie/products/mxplan.xml",
                SN : "https://www.ovh.sn/produits/mxplan.xml",
                TN : "https://www.ovh.com/tn/produits/mxplan.xml",
                WE : ""
            },
            express_order : {
                CA : "https://www.ovh.com/ca/en/order/express/",
                CZ : "https://www.ovh.cz/order/express/",
                DE : "https://www.ovh.de/order/express/",
                EN : "https://www.ovh.co.uk/order/express/",
                ES : "https://www.ovh.es/order/express/",
                FI : "https://www.ovh-hosting.fi/order/express/",
                FR : "https://www.ovh.com/fr/order/express/",
                GB : "https://www.ovh.co.uk/order/express/",
                IE : "https://www.ovh.ie/order/express/",
                IT : "https://www.ovh.it/order/express/",
                LT : "https://www.ovh.lt/order/express/",
                MA : "https://www.ovh.com/ma/order/express/",
                NL : "https://www.ovh.nl/order/express/",
                PL : "https://www.ovh.pl/order/express/",
                PT : "https://www.ovh.pt/order/express/",
                QC : "https://www.ovh.com/ca/fr/order/express/",
                RU : "https://www.ovh.ie/order/express/",
                SN : "https://www.ovh.sn/order/express/",
                TN : "https://www.ovh.com/tn/order/express/",
                WE : "https://www.ovh.com/us/order/express/"
            },
            domain_order_options_service : {
                CA : "https://www.ovh.com/ca/en/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                CZ : "https://www.ovh.cz/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                DE : "https://www.ovh.de/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                EN : "https://www.ovh.co.uk/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                ES : "https://www.ovh.es/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                FI : "https://www.ovh-hosting.fi/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                FR : "https://www.ovh.com/fr/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                GB : "https://www.ovh.co.uk/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                IE : "https://www.ovh.ie/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                IT : "https://www.ovh.it/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                LT : "https://www.ovh.lt/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                MA : "https://www.ovh.com/ma/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                NL : "https://www.ovh.nl/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                PL : "https://www.ovh.pl/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                PT : "https://www.ovh.pt/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                QC : "https://www.ovh.com/ca/fr/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                RU : "https://www.ovh.ie/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                SN : "https://www.ovh.sn/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                TN : "https://www.ovh.com/tn/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))",
                WE : "https://www.ovh.com/us/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domain}))"
            },
            localseo_order_options_service : {
                FR : "https://www.ovh.com/fr/order/domain/#/legacy/domain/hosting/choose?options=~(flow~'hosting_existing_service~serviceName~'{serviceName})",
            },
            localseo_visibility_checker : {
                FR : "https://www.ovh.com/fr/hebergement-web/referencement-local.xml",
            },
            FAQS : {
                EXCHANGE: {
                    URL: {
                        CA: "",
                        CZ: "https://www.ovh.cz/emails/hosted-exchange/faq/",
                        DE: "https://www.ovh.de/emails/hosted-exchange/faq/",
                        EN: "https://www.ovh.co.uk/emails/hosted-exchange/faq/",
                        ES: "https://www.ovh.es/emails/hosted-exchange/faq/",
                        FI: "https://www.ovh-hosting.fi/sahkopostit/hosted-exchange/ukk/",
                        FR: "https://www.ovh.com/fr/emails/hosted-exchange/faq/",
                        GB: "https://www.ovh.co.uk/emails/hosted-exchange/faq/",
                        IE: "https://www.ovh.ie/emails/hosted-exchange/faq/",
                        IT: "https://www.ovh.com/it/emails/hosted-exchange/faq/",
                        LT: "https://www.ovh.lt/El_pastas/hosted-exchange/duk/",
                        MA: "https://www.ovh.com/ma/emails/hosted-exchange/faq/",
                        NL: "https://www.ovh.nl/emails/hosted-exchange/faq/",
                        PL: "https://www.ovh.pl/emaile/hosted-exchange/faq/",
                        PT: "https://www.ovh.pt/emails/hosted-exchange/faq/",
                        QC: "",
                        RU: "",
                        SN: "https://www.ovh.com/fr/emails/hosted-exchange/faq/",
                        TN: "https://www.ovh.com/tn/emails/hosted-exchange/faq/",
                        WE: ""
                    },
                    TITLE: "otrs_popup_service_faq_exchange"
                },
                OFFICE_365: {
                    URL: {
                        CA: "",
                        CZ: "https://www.ovh.cz/office-365-business/faq/",
                        DE: "https://www.ovh.de/office-365-business/faq/",
                        EN: "https://www.ovh.co.uk/office-365-business/faq/",
                        ES: "https://www.ovh.es/office-365-business/faq/",
                        FI: "https://www.ovh-hosting.fi/office-365-business/ukk/",
                        FR: "https://www.ovh.com/fr/office-365-business/faq/",
                        GB: "https://www.ovh.co.uk/office-365-business/faq/",
                        IE: "https://www.ovh.ie/office-365-business/faq/",
                        IT: "https://www.ovh.it/office-365-business/faq/",
                        LT: "https://www.ovh.lt/office-365-business/faq/",
                        MA: "https://www.ovh.com/ma/office-365-business/faq/",
                        NL: "https://www.ovh.nl/office-365-business/faq/",
                        PL: "https://www.ovh.pl/office-365-business/faq/",
                        PT: "https://www.ovh.pt/office-365-business/faq/",
                        QC: "",
                        RU: "",
                        SN: "https://www.ovh.com/fr/office-365-business/faq/",
                        TN: "https://www.ovh.com/tn/office-365-business/faq/",
                        WE: ""
                    },
                    TITLE: "otrs_popup_service_faq_office365"
                },
                WEB: {
                    URL: {
                        CA: "",
                        CZ: "https://www.ovh.cz/webhosting/faq/",
                        DE: "https://www.ovh.de/hosting/faq/",
                        EN: "https://www.ovh.co.uk/web-hosting/faq/",
                        ES: "https://www.ovh.es/hosting/faq/",
                        FI: "https://www.ovh-hosting.fi/webhotelli/ukk/",
                        FR: "https://www.ovh.com/fr/hebergement-web/faq/",
                        GB: "https://www.ovh.co.uk/web-hosting/faq/",
                        IE: "https://www.ovh.co.uk/web-hosting/faq/",
                        IT: "https://www.ovh.it/hosting-web/faq/",
                        LT: "https://www.ovh.lt/svetainiu-talpinimas/duk/",
                        MA: "https://www.ovh.com/ma/hebergement-web/faq/",
                        NL: "https://www.ovh.nl/shared-hosting/faq/",
                        PL: "https://www.ovh.pl/hosting/faq/",
                        PT: "https://www.ovh.pt/alojamento-partilhado/faq/",
                        QC: "",
                        RU: "",
                        SN: "https://www.ovh.sn/hebergement-web/faq/",
                        TN: "https://www.ovh.com/tn/hebergement-web/faq/",
                        WE: ""
                    },
                    TITLE: "otrs_popup_service_faq_web"
                }
            },
            TOOLS : {
                ZONE_CHECK: "https://www.zonemaster.net/"
            },
            OTHER_MANAGER: {
                vpsUniverse: "https://www.ovh.com/manager/dedicated/index.html#/configuration?sessionv6={sessionv6}&landingTo=vps",
                vps: "https://www.ovh.com/manager/dedicated/index.html#/configuration/vps/{vps}?sessionv6={sessionv6}&landingTo=vps"
            }
        },
        COMODO: {
            knowledgebase: "https://support.comodo.com/index.php?/Knowledgebase/Article/View/702/0/ev-certificate-validation-checklist",
            contactEmail: "validation@comodo.eu",
            phoneNumber: "+31 88 775 7777"
        },

        "LANGUAGES": [
            { value : "de_DE", name : "Deutsch" },
            { value : "en_GB", name : "English" },
            { value : "en_CA", name : "English (Canadian)" },
            { value : "en_US", name : "English (United States)" },
            { value : "es_ES", name : "Español" },
            { value : "fr_FR", name : "Français" },
            { value : "fr_CA", name : "Français (Canadien)" },
            { value : "it_IT", name : "Italiano" },
            { value : "lt_LT", name : "Lietuviškai" },
            { value : "nl_NL", name : "Nederlands" },
            { value : "pl_PL", name : "Polski" },
            { value : "pt_PT", name : "Português" },
            { value : "fi_FI", name : "Suomi" },
            { value : "cs_CZ", name : "Česky" }
        ],
        website_url  : {
            new_nic : {
                de_DE : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=DE",
                en_GB : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=GB",
                en_CA : "https://ca.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=CA",
                en_US : "https://ovhcloud.com/auth/signup/",
                es_ES : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=ES",
                es_US : "https://ovhcloud.com/auth/signup/",
                fr_CA : "https://ca.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=CA",
                fr_FR : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=FR",
                fr_MA : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=MA",
                fr_SN : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=SN",
                fr_TN : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=TN",
                it_IT : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=IT",
                lt_LT : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=LT",
                nl_NL : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=NL",
                pl_PL : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=PL",
                pt_PT : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=PT",
                sk_SK : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=SK",
                fi_FI : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=FI",
                cs_CZ : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=CZ"
            }
        },
        flags_options : [
            { value: 256, label: "256 - Zone Signing Key (ZSK)" },
            { value: 257, label: "257 - Key Signing Key (KSK)" }
        ],
        algorithm_options : [
            { value: 3, label: "3 - DSA" },
            { value: 5, label: "5 - RSASHA1" },
            { value: 6, label: "6 - DSA-NSEC3-SHA1" },
            { value: 7, label: "7 - RSASHA1-NSEC3-SHA1" },
            { value: 8, label: "8 - RSASHA256" },
            { value: 10, label: "10 - RSASHA512" },
            { value: 13, label: "13 - ECDSAP256SHA256" },
            { value: 14, label: "14 - ECDSAP384SHA384" }
        ],
        MANAGER_URLS : {
            "portal"    : "https://www.ovh.com/manager/portal/index.html#/",
            "web"       : "https://www.ovh.com/manager/web/index.html#/",
            "dedicated" : "https://www.ovh.com/manager/dedicated/index.html#/",
            "cloud"     : "https://www.ovh.com/manager/cloud/index.html#/",
            "telecom"   : "https://www.ovhtelecom.fr/manager/index.html#/",
            "sunrise"   : "https://www.ovh.com/manager/sunrise/index.html#/",
            "partners"  : "https://www.ovh.com/manager/partners"
        },
        NO_AUTORENEW_COUNTRIES : [
            "CZ",
            "PL",
            "CA",
            "US",
            "WS",
            "MA",
            "TN",
            "SN"
        ],
        REDIRECT_URLS: {
            listTicket: "https://www.ovh.com/manager/dedicated/index.html#/ticket"
        }
    },
    CA: {
        AUTORENEW_URL: "https://ca.ovh.com/manager/dedicated/#/billing/autoRenew",
        RENEW_URL: "https://ca.ovh.com/fr/cgi-bin/order/renew.cgi?domainChooser={serviceName}",
        LOGS_URCHIN: "https://logs.ovh.net/{serviceName}/urchin6/",
        STATS_LOGS: "https://logs.ovh.net/{serviceName}/",
        loginUrl: "https://www.ovh.com/manager/web/login/",
        UNIVERS: "web",
        UNIVERSES: {
            PORTAL: "PORTAL",
            WEB: "WEB",
            DEDICATED: "DEDICATED",
            CLOUD: "CLOUD",
            TELECOM: "TELECOM",
            SUNRISE: "SUNRISE"
        },
        HOSTING: {
            OFFERS: {
                START_10_M: {
                    TYPE_VALUE: "START_10_M",
                    LIST_VALUE: "START"
                }
            },
            MODULES: {
                DEFAULT_INSTALL_PATH: "./www/"
            }
        },
        URLS: {
            CA: { // eq to en_CA
                support: "http://www.ovh.co.uk/support/",
                support_contact: "https://www.ovh.com/ca/en/support/",
                guides: {
                    home: "http://docs.ovh.ca/en/",
                    sshCreate: "https://www.ovh.com/ca/en/g1769.creating_ssh_keys",
                    sshAdd: "https://www.ovh.com/ca/en/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.com/ca/en/g2069.replacing_your_lost_ssh_key_pair"
                },
                dnssec_service: "https://www.ovh.co.uk/domains/dnssec_service.xml",
                vpsCloud: "http://www.ovh.co.uk/vps/vps-cloud.xml",
                changeOwner: "https://www.ovh.co.uk/cgi-bin/procedure/procedureChangeOwner.cgi",
                domainOrder: "https://www.ovh.co.uk/cgi-bin/newOrder/order.cgi",
                domainOrderChange: "https://www.ovh.co.uk/cgi-bin/newOrder/order.cgi",
                exchangeOrder: "https://www.ovh.com/ca/en/emails/hosted-exchange/",
                renewAlign: "https://www.ovh.co.uk/cgi-bin/order/renew.cgi?alignDate=1&csid=0"
            },
            QC: { // eq to fr_CA
                support: "https://www.ovh.com/fr/support/",
                support_contact: "https://www.ovh.com/ca/fr/support/",
                guides: {
                    home: "http://docs.ovh.ca/fr/",
                    sshCreate: "https://www.ovh.com/ca/fr/g1769.creation_des_cles_ssh",
                    sshAdd: "https://www.ovh.com/ca/fr/g1924.configurer_des_cles_ssh_supplementaires",
                    sshChange: "https://www.ovh.com/ca/fr/g2069.changer_sa_cle_ssh_en_cas_de_perte"
                },
                dnssec_service: "https://www.ovh.com/fr/domaines/service_dnssec.xml",
                vpsCloud: "https://www.ovh.com/fr/vps/vps-cloud.xml",
                changeOwner: "https://www.ovh.com/cgi-bin/fr/procedure/procedureChangeOwner.cgi",
                domainOrder: "https://www.ovh.com/fr/cgi-bin/newOrder/order.cgi",
                domainOrderChange: "https://www.ovh.com/fr/cgi-bin/newOrder/order.cgi",
                exchangeOrder: "https://www.ovh.com/ca/fr/emails/hosted-exchange/",
                renewAlign: "https://eu.ovh.com/fr/cgi-bin/order/renew.cgi?alignDate=1"
            },
            WE: {
                support: "http://www.ovh.co.uk/support/",
                support_contact: "https://www.ovh.com/ca/en/support/",
                guides: {
                    home: "http://docs.ovh.ca/en/",
                    sshCreate: "https://www.ovh.com/ca/en/g1769.creating_ssh_keys",
                    sshAdd: "https://www.ovh.com/ca/en/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.com/ca/en/g2069.replacing_your_lost_ssh_key_pair"
                },
                dnssec_service: "https://www.ovh.co.uk/domains/dnssec_service.xml",
                vpsCloud: "http://www.ovh.co.uk/vps/vps-cloud.xml",
                changeOwner: "https://www.ovh.co.uk/cgi-bin/procedure/procedureChangeOwner.cgi",
                domainOrder: "https://www.ovh.co.uk/cgi-bin/newOrder/order.cgi",
                domainOrderChange: "https://www.ovh.co.uk/cgi-bin/newOrder/order.cgi",
                exchangeOrder: "https://www.ovh.com/us/emails/hosted-exchange/",
                renewAlign: "https://www.ovh.co.uk/cgi-bin/order/renew.cgi?alignDate=1&csid=0"
            },
            WS: { // eq to es_US
                support: "https://www.ovh.com/fr/support/",
                support_contact: "https://www.ovh.com/ca/en/support/",
                guides: {
                    home: "http://docs.ovh.ca/en/",
                    sshCreate: "https://www.ovh.com/ca/en/g1769.creating_ssh_keys",
                    sshAdd: "https://www.ovh.com/ca/en/g1924.configuring_additionnal_ssh_key",
                    sshChange: "https://www.ovh.com/ca/en/g2069.replacing_your_lost_ssh_key_pair"
                },
                dnssec_service: "https://www.ovh.com/fr/domaines/service_dnssec.xml",
                vpsCloud: "https://www.ovh.com/fr/vps/vps-cloud.xml",
                changeOwner: "https://www.ovh.es/cgi-bin/procedure/procedureChangeOwner.cgi",
                domainOrder: "https://www.ovh.com/fr/cgi-bin/newOrder/order.cgi",
                domainOrderChange: "https://www.ovh.com/fr/cgi-bin/newOrder/order.cgi",
                exchangeOrder: "https://www.ovh.com/us/es/emails/hosted-exchange/",
                renewAlign: "https://www.ovh.es/cgi-bin/order/renew.cgi?alignDate=1&csid=0"
            },
            hosting: {
                CA: "https://www.ovh.com/ca/en/",
                CZ: "https://www.ovh.cz/webhosting/",
                DE: "https://www.ovh.de/hosting/",
                EN: "https://www.ovh.co.uk/web-hosting/",
                ES: "https://www.ovh.es/hosting/",
                FI: "https://www.ovh-hosting.fi/webhotelli/",
                FR: "https://www.ovh.com/fr/hebergement-web/",
                GB: "https://www.ovh.co.uk/web-hosting/",
                IE: "https://www.ovh.ie/web-hosting/",
                IT: "https://www.ovh.it/hosting-web/",
                LT: "https://www.ovh.lt/svetainiu-talpinimas/",
                MA: "https://www.ovh.com/ma/hebergement-web/",
                NL: "https://www.ovh.nl/shared-hosting/",
                PL: "https://www.ovh.pl/hosting/",
                PT: "https://www.ovh.pt/alojamento-partilhado/",
                QC: "https://www.ovh.com/ca/fr/",
                RU: "https://www.ovh.ie/web-hosting/",
                SN: "https://www.ovh.sn/hebergement-web/",
                TN: "https://www.ovh.com/tn/hebergement-web/",
                WE: "http://www.ovh.com/us/"
            },
            MX_PLAN: {
                CA: "",
                CZ: "https://www.ovh.cz/produkty/mxplan.xml",
                DE: "https://www.ovh.de/produkte/mxplan.xml",
                EN: "https://www.ovh.co.uk/products/mxplan.xml",
                ES: "https://www.ovh.es/productos/mxplan.xml",
                FI: "https://www.ovh-hosting.fi/produits/mxplan.xml",
                FR: "https://www.ovh.com/fr/produits/mxplan.xml",
                GB: "https://www.ovh.co.uk/products/mxplan.xml",
                IE: "https://www.ovh.ie/products/mxplan.xml",
                IT: "https://www.ovh.it/prodotti/mxplan.xml",
                LT: "https://www.ovh.lt/produktai/mxplan.xml",
                MA: "https://www.ovh.com/ma/produits/mxplan.xml",
                NL: "https://www.ovh.nl/producten/mxplan.xml",
                PL: "https://www.ovh.pl/produkty/mxplan.xml",
                PT: "https://www.ovh.pt/produtos/mxplan.xml",
                QC: "",
                RU: "https://www.ovh.ie/products/mxplan.xml",
                SN: "https://www.ovh.sn/produits/mxplan.xml",
                TN: "https://www.ovh.com/tn/produits/mxplan.xml",
                WE: ""
            },
            express_order: {
                CA: "https://www.ovh.com/ca/en/order/express/",
                CZ: "https://www.ovh.cz/order/express/",
                DE: "https://www.ovh.de/order/express/",
                EN: "https://www.ovh.co.uk/order/express/",
                ES: "https://www.ovh.es/order/express/",
                FI: "https://www.ovh-hosting.fi/order/express/",
                FR: "https://www.ovh.com/fr/order/express/",
                GB: "https://www.ovh.co.uk/order/express/",
                IE: "https://www.ovh.ie/order/express/",
                IT: "https://www.ovh.it/order/express/",
                LT: "https://www.ovh.lt/order/express/",
                MA: "https://www.ovh.com/ma/order/express/",
                NL: "https://www.ovh.nl/order/express/",
                PL: "https://www.ovh.pl/order/express/",
                PT: "https://www.ovh.pt/order/express/",
                QC: "https://www.ovh.com/ca/fr/order/express/",
                RU: "https://www.ovh.ie/order/express/",
                SN: "https://www.ovh.sn/order/express/",
                TN: "https://www.ovh.com/tn/order/express/",
                WE: "https://www.ovh.com/us/order/express/"
            }
        },
        COMODO: {
            knowledgebase: "https://support.comodo.com/index.php?/Knowledgebase/Article/View/702/0/ev-certificate-validation-checklist",
            contactEmail: "validation@comodo.eu",
            phoneNumber: "+31 88 775 7777"
        },
        LANGUAGES: [
            { value: "de_DE", name: "Deutsch" },
            { value: "en_GB", name: "English" },
            { value: "es_ES", name: "Español" },
            { value: "fr_FR", name: "Français" },
            { value: "it_IT", name: "Italiano" },
            { value: "lt_LT", name: "Lietuviškai" },
            { value: "nl_NL", name: "Nederlands" },
            { value: "pl_PL", name: "Polski" },
            { value: "pt_PT", name: "Português" },
            { value: "fi_FI", name: "Suomi" },
            { value: "cs_CZ", name: "Česky" }
        ],
        website_url: {
            new_nic: {
                de_DE : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=DE",
                en_GB : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=GB",
                en_CA : "https://ca.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=CA",
                en_US : "https://ovhcloud.com/auth/signup/",
                es_ES : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=ES",
                es_US : "https://ovhcloud.com/auth/signup/",
                fr_CA : "https://ca.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=CA",
                fr_FR : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=FR",
                fr_MA : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=MA",
                fr_SN : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=SN",
                fr_TN : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=TN",
                it_IT : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=IT",
                lt_LT : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=LT",
                nl_NL : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=NL",
                pl_PL : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=PL",
                pt_PT : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=PT",
                sk_SK : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=SK",
                fi_FI : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=FI",
                cs_CZ : "https://www.ovh.com/auth/signup/#/?ovhCompany=ovh&ovhSubsidiary=CZ"
            }
        },
        flags_options: [
            { value: 256, label: "256 - Zone Signing Key (ZSK)" },
            { value: 257, label: "257 - Key Signing Key (KSK)" }
        ],
        algorithm_options: [
            { value: 3, label: "3 - DSA" },
            { value: 5, label: "5 - RSASHA1" },
            { value: 6, label: "6 - DSA-NSEC3-SHA1" },
            { value: 7, label: "7 - RSASHA1-NSEC3-SHA1" },
            { value: 8, label: "8 - RSASHA256" },
            { value: 10, label: "10 - RSASHA512" },
            { value: 13, label: "13 - ECDSAP256SHA256" },
            { value: 14, label: "14 - ECDSAP384SHA384" }
        ],
        NO_AUTORENEW_COUNTRIES: [
            "CZ",
            "PL",
            "CA",
            "US",
            "WS",
            "MA",
            "TN",
            "SN"
        ],
        REDIRECT_URLS: {
            listTicket: "https://ca.ovh.com/manager/index.html#/ticket"
        }
    }
};
