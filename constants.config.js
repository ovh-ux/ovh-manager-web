"use strict";
module.exports = {
    EU : {
        CHATBOT_URL: {
            SLACK: "https://slack.com/oauth/authorize?&client_id=149394412983.149395414183&scope=bot,chat:write:bot",
            FACEBOOK_MESSENGER: "https://m.me/975451932604879"
        },
        BILLING_URL: "https://www.ovh.com/manager/dedicated/#/billing/history",
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
                    url: "https://docs.ovh.com/fr/hosting/premiers-pas-avec-hebergement-web/"
                }, {
                    title: "core_top_guide_3_title",
                    url: "https://docs.ovh.com/fr/emails/generalites-sur-les-emails-mutualises/"
                }, {
                    title: "core_top_guide_5_title",
                    url: "https://docs.ovh.com/fr/hosting/modules-en-1-clic/"
                }, {
                    title: "core_top_guide_6_title",
                    url: "https://docs.ovh.com/fr/domains/editer-ma-zone-dns/"
                }, {
                    title: "core_top_guide_7_title",
                    url: "https://docs.ovh.com/fr/hosting/erreur-site-non-installe/"
                }, {
                    title: "core_top_guide_database_title",
                    url: "https://docs.ovh.com/fr/hosting/creer-base-de-donnees/"
                }, {
                    title: "core_top_guide_9_title",
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.cz/g1332.Nastaveni_multi_domen#standardni_multi-domena_pripojeni", title: "guide_add_subclient" },
                                { url: "https://www.ovh.cz/g1332.Nastaveni_multi_domen#multi-domena_pro_externi_domenu_pridani_domeny_na_ovh_dns_1_cast", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.cz/g1332.Nastaveni_multi_domen#attacher_un_domaine_externe", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.cz/g1332.Nastaveni_multi_domen#ajouter_un_sous-domaine_vers_votre_hebergement_web", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.cz/g1585.Chyba_pri_nacitani_stranky#chyba_pri_nacitani_stranky_obecne", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.cz/g1604.hosting_how_to_edit_my_dns_zone", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: " https://www.ovh.cz/g1343.webhosting_-_e-mail_prirucka_o_vytvareni_e-mailovych_adres", title: "guide_emails_emails_creation" }
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.de/g1332.Einrichtung_einer_Multi_Domain#standard-multi-domain", title: "guide_add_subclient" },
                                { url: "https://www.ovh.de/g1332.Einrichtung_einer_Multi_Domain#multi-domain_fur_eine_externe_domain", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.de/g1332.Einrichtung_einer_Multi_Domain#multi-domain_fur_eine_externe_domain", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.de/g1332.Einrichtung_einer_Multi_Domain#die_einrichtung_der_multi-domain_uberprufen", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.de/g1585.Webseite_ist_nicht_installiert#webseite_nicht_installiert_fehlerhafte_verknupfung_ihrer_domain_oder_sub-domain_mit_dem_hostserver", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.de/g1604.webhosting_bearbeiten_der_dns_zone", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.de/g2015.webhosting_allgemeine_informationen_zu_den_dns_servern", title: "guide_domain_dns_getting_started" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.de/g609.sichern_sie_ihre_domain_mit_dnssec_ab", title: "guide_domain_ds_record" }
                            ]
                        }

                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.de/g1343.webhosting_e-mail_anleitung_zur_erstellung_einer_e-mail-adresse", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.de/g1474.allgemeine-informationen-ovh-webhosting-mails", title: "guide_emails_emails_configuration" }

                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.de/g2004.webhosting_e-mail_anleitung_zur_konfiguration_auf_einem_iphone_mit_ios_91", title: "guide_emails_emails_configuration_ios" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.de/g1913.webhosting_e-mail-angebot_wechseln", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh.de/g2028.webhosting_spf-eintrag", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh.de/g2117.erweiterte_funktionen_von_ovh_e-mails", title: "guide_emails_emails_advanced" }
                            ]
                        }
                    ],
                    emailsFilter: [
                        {
                            title: "guide_emails_filter_subscope",
                            list: [
                                { url: "https://www.ovh.de/g1973.webhosting_e-mail_hilfe_zur_erstellung_von_e-mail-filtern_im_kundencenter", title: "guide_emails_emails_filters" }
                            ]
                        }

                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh.de/g2001.webhosting_e-mail_anleitung_zum_einrichten_einer_mail-weiterleitung", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh.de/g2052.einrichten_von_auto-antworten", title: "guide_emails_responder" }
                            ]
                        }

                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.es/g1332.Como_asociar_un_dominio_o_subdominio_a_mi_alojamiento#asociar_un_dominio_registrado_con_ovh", title: "guide_add_subclient" },
                                { url: "https://www.ovh.es/g1332.Como_asociar_un_dominio_o_subdominio_a_mi_alojamiento#asociar_un_dominio_externo", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.es/g1332.Como_asociar_un_dominio_o_subdominio_a_mi_alojamiento#asociar_un_dominio_externo", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.es/g1332.Como_asociar_un_dominio_o_subdominio_a_mi_alojamiento#anadir_un_subdominio_al_alojamiento", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.es/g1585.Error_Sitio_no_instalado#sitio_no_instalado_error_de_instalacion_en_el_alojamiento_de_alguno_de_los_dominios_o_subdominios", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.es/g2137.whois_activacion_de_owo", title: "guide_domain_owo_activation" }
                            ]
                        }

                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.es/g1604.web_hosting_como_editar_mi_zona_dns", title: "guide_domain_edit_zone" }
                            ]
                        }

                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.es/g2015.web_hosting_informacion_general_sobre_los_servidores_dns", title: "guide_domain_dns_getting_started" }
                            ]
                        }

                    ],
                    dynhost: [
                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://www.ovh.es/g2024.web_hosting_dynhost", title: "guide_domain_dyn_host" }
                            ]
                        }

                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.es/g609.proteja_su_dominio_con_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.es/g1343.correo_guia_de_creacion_de_una_direccion_de_correo_electronico", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.es/g1474.correo-alojamiento-compartido-ovh", title: "guide_emails_emails_configuration" }

                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.es/g2004.correo_guia_de_configuracion_en_iphone_ios_91", title: "guide_emails_emails_configuration_ios" },
                                { url: "https://www.ovh.es/g1302.webmail_guia_de_uso_de_roundcube", title: "guide_emails_emails_roundcube" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.es/g1913.web_hosting_cambiar_de_servicio_de_correo", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh.es/g2028.web_hosting_el_registro_spf", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh.es/g2117.uso_avanzado_del_correo_de_ovh", title: "guide_emails_emails_advanced" },
                                { url: "https://www.ovh.es/g2272.codigos_de_respuesta_de_un_servidor_smtp", title: "guide_emails_emails_smtp_response_code" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh.es/g2001.correo_redirecciones_de_correo", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh.es/g2052.guia_de_creacion_de_un_contestador", title: "guide_emails_responder" }
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g1332.Miten_webhotelliin_liitetaan_verkkotunnus_tai_aliverkkotunnus#ovhn_kautta_rekisteroidyn_verkkotunnuksen_liittaminen", title: "guide_add_subclient" },
                                { url: "https://www.ovh-hosting.fi/g1332.Miten_webhotelliin_liitetaan_verkkotunnus_tai_aliverkkotunnus#ulkoisen_verkkotunnuksen_lisays", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh-hosting.fi/g1332.Miten_webhotelliin_liitetaan_verkkotunnus_tai_aliverkkotunnus#ulkoisen_verkkotunnuksen_lisays", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh-hosting.fi/g1332.Miten_webhotelliin_liitetaan_verkkotunnus_tai_aliverkkotunnus#aliverkkotunnuksen_lisays_webhotelliin", title: "guide_add_subcreate" },
                                { url: "https://www.ovh-hosting.fi/g1585.Asentamattoman_sivun_virhe#sivusto_ei_asennettu_virhe_verkkotunnusten_tai_aliverkkotunnuksen_kayttoonotossa_webhotelliin", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2137.whois_-_owon_aktivointi", title: "guide_domain_owo_activation" },
                                { url: "https://www.ovh-hosting.fi/g2151.verkkotunnusten_siirtoa_kasittelevat_ohjeet", title: "guide_domain_transfert" },
                                { url: "https://www.ovh-hosting.fi/g2267.ohjeet_verkkotunnuksen_omistajanvaihdokseen", title: "guide_domain_owner_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g1604.miten_dns-aluetta_muokataan", title: "guide_domain_edit_zone" }
                            ]
                        }

                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2015.webhotellit_yleista_nimipalvelimista", title: "guide_domain_dns_getting_started" },
                                { url: "https://www.ovh-hosting.fi/g1980.verkkotunnuksen_zonecheck", title: "guide_domain_dns_zone_check" }
                            ]
                        }
                    ],
                    dynhost: [
                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2024.webhotelli_dynhost", title: "guide_domain_dyn_host" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g609.verkkotunnuksen_turvaaminen_dnssecin_avulla", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    addZone: [
                        {
                            title: "guide_add_zone_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2229.dns-alueen_luominen_ulkopuoliselle_verkkotunnukselle", title: "guide_domain_add_dns_zone" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g1343.webhotellit_ja_sahkopostit_ohje_postilaatikon_luomiseen", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh-hosting.fi/g1474.yleista-ovh-webhotellit-sahkopostit", title: "guide_emails_emails_configuration" }
                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2004.webhotellien_sahkoposti_konfigurointiohje_iphone_ios_91-versiolle", title: "guide_emails_emails_configuration_ios" },
                                { url: "https://www.ovh-hosting.fi/g1302.selainposti_roundcube-ohje", title: "guide_emails_emails_roundcube" },
                                { url: "https://www.ovh-hosting.fi/g2012.webhotellin_sahkoposti_opas_mx-konfiguraatioon_dns-alueella", title: "guide_emails_emails_configuration_mx_zone_dns" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g1913.webhotelli_sahkopostituotteen_vaihtaminen", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh-hosting.fi/g2028.webhotelli_spf-kentta", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh-hosting.fi/g2117.ovhn_sahkopostiohjelmien_edistynyt_kaytto", title: "guide_emails_emails_advanced" },
                                { url: "https://www.ovh-hosting.fi/g2272.smtp-palvelimen_vastauskoodit", title: "guide_emails_emails_smtp_response_code" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2001.webhotellin_sahkoposti_sahkopostin_uudelleenohjaus", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g2052.ohje_automaattisen_vastauksen_luomiseen", title: "guide_emails_responder" }
                            ]
                        }
                    ],
                    emailsMailingList: [
                        {
                            title: "guide_mailing_list_title",
                            list: [
                                { url: "https://www.ovh-hosting.fi/g1596.webhotellin_sahkoposti_sahkopostilistan_kayttopas", title: "guide_emails_mailing_list" }
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://docs.ovh.com/fr/hosting/erreur-site-non-installe/", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/domains/changement-proprietaire-domaine/", title: "guide_domain_owner_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/domains/editer-ma-zone-dns/", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/domains/generalites-serveurs-dns/", title: "guide_domain_dns_getting_started" },
                                { url: "https://docs.ovh.com/fr/domains/zonecheck-de-votre-domaine/", title: "guide_domain_dns_zone_check" }
                            ]
                        }
                    ],
                    redirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/domains/redirection-nom-de-domaine/", title: "guide_domain_redirection" }
                            ]
                        }
                    ],
                    dynhost: [
                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/domains/utilisation-dynhost/", title: "guide_domain_dyn_host" }
                            ]
                        }
                    ],
                    glue: [
                        {
                            title: "guide_glue_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/domains/glue-registry/", title: "guide_domain_glue_registry" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.com/fr/g609.securiser_votre_domaine_avec_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    addZone: [
                        {
                            title: "guide_add_zone_subscope",
                            list: [
                                { url: "https://www.ovh.com/fr/g2229.creer_une_zone_dns_pour_un_domaine_externe", title: "guide_domain_add_dns_zone" }
                            ]
                        }
                    ],
                    emailsInfos: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://docs.ovh.com/fr/emails/generalites-sur-les-emails-mutualises/", title: "guide_emails_emails_configuration" },
                                { url: "https://docs.ovh.com/fr/emails/generalites-sur-les-serveurs-mx-mutualises/", title: "guide_emails_emails_mx_servers" }
                            ]
                        }
                    ],
                    emailsAccounts: [
                        {
                            title: "guide_emails_configuration_title",
                            description: "",
                            list: [{ url: "https://docs.ovh.com/fr/emails/mail-mutualise-guide-configuration-outlook-2013/", title: "guide_emails_emails_configuration_outlook" },
                                    { url: "https://docs.ovh.com/fr/emails/mail-mutualise-guide-configuration-iphone-ios-91/", title: "guide_emails_emails_configuration_ios" },
                                    { url: "https://docs.ovh.com/fr/emails/utilisation-roundcube/", title: "guide_emails_emails_roundcube" },
                                    { url: "https://docs.ovh.com/fr/emails/mail-mutualise-guide-de-configuration-mx-avec-zone-dns-ovh/", title: "guide_emails_emails_configuration_mx_zone_dns" },
                                    { url: "https://docs.ovh.com/fr/emails/mail-mutualise-guide-de-configuration-mx-avec-zone-dns-non-ovh/", title: "guide_emails_emails_configuration_mx_zone_dns_non_ovh" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://docs.ovh.com/fr/emails/creation-dune-adresse-e-mail/", title: "guide_emails_emails_creation" },
                                { url: "https://docs.ovh.com/fr/emails/recuperation-des-entetes-e-mails/", title: "guide_emails_emails_headers" },
                                { url: "https://docs.ovh.com/fr/emails/deleguer-gestion-emails-autre-identifiant/", title: "guide_emails_emails_delegation" },
                                { url: "https://docs.ovh.com/fr/emails/le-champ-spf/", title: "guide_emails_emails_spf" },
                                { url: "https://docs.ovh.com/fr/emails/diagnostiquer-mon-adresse-e-mail/", title: "guide_emails_emails_diagnosis" },
                                { url: "https://docs.ovh.com/fr/microsoft-collaborative-solutions/migration-adresse-e-mail-mutualisee-vers-exchange/", title: "guide_emails_emails_migrate_to_exchange" },
                                { url: "https://docs.ovh.com/fr/emails/utilisation-avancee-des-e-mails/", title: "guide_emails_emails_advanced" },
                                { url: "https://docs.ovh.com/fr/emails/codes-de-reponse-serveur-smtp/", title: "guide_emails_emails_smtp_response_code" }
                            ]
                        }
                    ],
                    emailsFilter: [
                        {
                            title: "guide_emails_filter_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/emails/mail-mutualise-guide-configuration-des-filtres-e-mail-sur-lespace-client/", title: "guide_emails_emails_filters" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/emails/guide-des-redirections-emails/", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://docs.ovh.com/fr/emails/mise-en-place-repondeur-mail/", title: "guide_emails_responder" }
                            ]
                        }
                    ],
                    emailsMailingList: [
                        {
                            title: "guide_mailing_list_title",
                            list: [
                                { url: "https://docs.ovh.com/fr/emails/guide-dutilisation-mailing-list/", title: "guide_emails_mailing_list" }
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.co.uk/g1332.Multi_domain_Setup_Guide#standard_multi-domain", title: "guide_add_subclient" },
                                { url: "https://www.ovh.co.uk/g1332.Multi_domain_Setup_Guide#multidomain_for_an_external_domain", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.co.uk/g1332.Multi_domain_Setup_Guide#multidomain_for_an_external_domain", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.co.uk/g1332.Multi_domain_Setup_Guide#verify_the_implementation_of_the_multidomain", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.co.uk/g1585.Error_website_not_installed#site_not_installed_error_linking_your_domain_or_sub-domain_to_the_host_server", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.co.uk/g2137.whois_-_enable_owo", title: "guide_domain_owo_activation" },
                                { url: "https://www.ovh.co.uk/g2151.guide_hub_for_domain_name_transers", title: "guide_domain_transfert" },
                                { url: "https://www.ovh.co.uk/g2267.guide_hub_-_change_domain_name_owner", title: "guide_domain_owner_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.co.uk/g1604.hosting_how_to_edit_my_dns_zone", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.co.uk/g2015.shared_hosting_general_information_about_dns_servers", title: "guide_domain_dns_getting_started" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.co.uk/g609.secure_your_domain_with_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.co.uk/g1343.hosted_email_how_to_set_up_an_email_address", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.co.uk/g1474.ovh-mails-general-use", title: "guide_emails_emails_configuration" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.co.uk/g2028.web_hosting_the_spf_record", title: "guide_emails_emails_spf" },
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.it/g1332.come_associare_un_dominio_o_un_sottodominio_al_tuo_hosting_Web#associare_un_dominio_registrato_in_ovh", title: "guide_add_subclient" },
                                { url: "https://www.ovh.it/g1332.come_associare_un_dominio_o_un_sottodominio_al_tuo_hosting_Web#associa_un_dominio_esterno", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.it/g1332.come_associare_un_dominio_o_un_sottodominio_al_tuo_hosting_Web#associa_un_dominio_esterno", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.it/g1332.come_associare_un_dominio_o_un_sottodominio_al_tuo_hosting_Web#aggiungi_un_sottodominio_al_tuo_hosting_web", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.it/g1585.errore_Sito_non_installato#sito_non_installato_errore_nellinstallazione_di_uno_dei_tuoi_domini_o_sottodomini_sullhosting", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.it/g2137.whois_-_attivazione_di_owo", title: "guide_domain_owo_activation" },
                                { url: "https://www.ovh.it/g2151.guide_al_trasferimento_dei_domini", title: "guide_domain_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.it/g1604.web_hosting_modifica_la_tua_zona_dns", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.it/g2015.web_hosting_gestisci_il_tuo_server_dns", title: "guide_domain_dns_getting_started" },
                                { url: "https://www.ovh.it/g1980.zone_check_del_tuo_dominio", title: "guide_domain_dns_zone_check" }
                            ]
                        }
                    ],
                    dynhost: [
                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://www.ovh.it/g2024.hosting_condiviso_dynhost", title: "guide_domain_dyn_host" }
                            ]
                        }
                    ],
                    glue: [
                        {
                            title: "guide_glue_subscope",
                            list: [
                                { url: "https://www.ovh.it/g1568.glue_registry", title: "guide_domain_glue_registry" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.it/g609.proteggi_il_tuo_dominio_con_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.it/g1343.servizio_email_guida_alla_creazione_di_un_indirizzo_email", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.it/g1474.info-email-condivise-ovh", title: "guide_emails_emails_configuration" }

                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.it/g2004.servizio_email_guida_alla_configurazione_su_iphone_ios_91", title: "guide_emails_emails_configuration_ios" },
                                { url: "https://www.ovh.it/g1302.webmail_guida_allutilizzo_di_roundcube", title: "guide_emails_emails_roundcube" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.it/g1913.hosting_condiviso_cambia_la_tua_offerta_email", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh.it/g2028.hosting_condiviso_il_record_spf", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh.it/g2117.configurazione_avanzata_delle_email_ovh", title: "guide_emails_emails_advanced" }
                            ]
                        }
                    ],
                    emailsFilter: [
                        {
                            title: "guide_emails_filter_subscope",
                            list: [
                                { url: "https://www.ovh.it/g1973.servizio_email_configura_i_filtri_email_nel_tuo_spazio_cliente_ovh", title: "guide_emails_emails_filters" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh.it/g2001.servizio_email_configura_il_reindirizzamento_delle_tue_email", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh.it/g2052.servizio_email_configura_una_risposta_automatica", title: "guide_emails_responder" }
                            ]
                        }
                    ],
                    emailsMailingList: [
                        {
                            title: "guide_mailing_list_title",
                            list: [
                                { url: "https://www.ovh.it/g1596.mail_mutualise_guide_dutilisation_mailing-list", title: "guide_emails_mailing_list" }
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.lt/g1332.kaip_prie_talpinimo_plano_prideti_kita_domena_ar_subdomena#ovh_registruoto_domeno_pridejimas", title: "guide_add_subclient" },
                                { url: "https://www.ovh.lt/g1332.kaip_prie_talpinimo_plano_prideti_kita_domena_ar_subdomena#isorinio_domeno_pridejimas", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.lt/g1332.kaip_prie_talpinimo_plano_prideti_kita_domena_ar_subdomena#isorinio_domeno_pridejimas", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.lt/g1332.kaip_prie_talpinimo_plano_prideti_kita_domena_ar_subdomena#subdomeno_pridejimas_i_talpinimo_plana", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.lt/g1585.Klaida_svetaine_neidiegta#svetaine_neidiegta_klaida_diegiant_domena_arba_subdomena_interneto_svetainiu_talpinimo_plane", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g2137.whois_-_owo_paslaugos_ijungimas", title: "guide_domain_owo_activation" },
                                { url: "https://www.ovh.lt/g2151.domenu_perkelimo_gidai", title: "guide_domain_transfert" },
                                { url: "https://www.ovh.lt/g2267.domeno_savininko_keitimo_gidai", title: "guide_domain_owner_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g1604.svetainiu_talpinimas_kaip_redaguoti_dns_zona", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g1980.domeno_zonos_tikrinimas", title: "guide_domain_dns_zone_check" }
                            ]
                        }
                    ],
                    dynhost: [
                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g2024.svetainiu_talpinimas_dynhost", title: "guide_domain_dyn_host" }
                            ]
                        }
                    ],
                    glue: [
                        {
                            title: "guide_glue_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g1568.glue_registry", title: "guide_domain_glue_registry" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g609.apsaugokite_savo_domena_su_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    addZone: [
                        {
                            title: "guide_add_zone_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g2229.dns_zonos_kurimas_isoriniam_domenui", title: "guide_domain_add_dns_zone" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.lt/g1343.svetainiu_talpinimo_el_pastas_el_pasto_dezutes_kurimo_gidas", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.lt/g1474.svetainiu_talpinimas_bendra_informacija_apie_el_pasto_sprendimus", title: "guide_emails_emails_configuration" },
                                { url: "https://www.ovh.lt/g2003.svetainiu_talpinimas_bendrai_apie_mx_serverius", title: "guide_emails_emails_mx_servers" }
                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.lt/g2004.svetainiu_talpinimo_el_pastas_el_pasto_konfiguravimas_iphone_ios_91", title: "guide_emails_emails_configuration_ios" },
                                { url: "https://www.ovh.lt/g2012.svetainiu_talpinimas_mx_konfiguravimas_naudojant_ovh_dns_zona", title: "guide_emails_emails_configuration_mx_zone_dns" },
                                { url: "https://www.ovh.lt/g2011.svetainiu_talpinimas_mx_konfiguravimas_naudojant_isorine_dns_zona", title: "guide_emails_emails_configuration_mx_zone_dns_non_ovh" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.lt/g1913.svetainiu_talpinimas_el_pasto_plano_keitimas", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh.lt/g2028.svetainiu_talpinimas_spf_laukas", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh.lt/g2117.ovh_el_pastas_pazangiam_naudojimui", title: "guide_emails_emails_advanced" },
                                { url: "https://www.ovh.lt/g2272.smtp_serverio_atsako_kodai", title: "guide_emails_emails_smtp_response_code" }
                            ]
                        }
                    ],
                    emailsFilter: [
                        {
                            title: "guide_emails_filter_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g1973.svetainiu_talpinimas_el_pasto_filtru_konfiguravimas_kliento_valdymo_sasajoje", title: "guide_emails_emails_filters" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g2001.svetainiu_talpinimo_el_pastas_el_laisku_nukreipimu_gidas", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh.lt/g2052.atsakiklio_diegimo_gidas", title: "guide_emails_responder" }
                            ]
                        }

                    ],
                    emailsMailingList: [
                        {
                            title: "guide_mailing_list_title",
                            list: [
                                { url: "https://www.ovh.lt/g1596.svetainiu_talpinimo_el_pastas_el_pasto_konferencijos_naudojimo_gidas", title: "guide_emails_mailing_list" }
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.nl/g1332.hoe_kan_ik_een_domein_of_een_subdomein_aan_mijn_webhosting_toevoegen#het_toevoegen_van_een_domeinnaam_die_is_geregistreerd_bij_ovh", title: "guide_add_subclient" },
                                { url: "https://www.ovh.nl/g1332.hoe_kan_ik_een_domein_of_een_subdomein_aan_mijn_webhosting_toevoegen#een_extern_domein_toevoegen", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.nl/g1332.hoe_kan_ik_een_domein_of_een_subdomein_aan_mijn_webhosting_toevoegen#een_extern_domein_toevoegen", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.nl/g1332.hoe_kan_ik_een_domein_of_een_subdomein_aan_mijn_webhosting_toevoegen#een_subdomein_aan_uw_webhosting_toevoegen", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.nl/g1585.error_site_niet_geinstalleerd#site_niet_geinstalleerd_error_bij_het_instellen_van_een_van_uw_domeinen_of_subdomeinen_op_de_hosting", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.nl/g2137.whois_-_owo_inschakelen", title: "guide_domain_owo_activation" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.nl/g1604.hosting_hoe_wijzig_ik_mijn_dns_zone", title: "guide_domain_edit_zone" }
                            ]
                        }

                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.nl/g2015.gedeelde_hosting_algemene_informatie_over_dns_servers", title: "guide_domain_dns_getting_started" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.nl/g609.beveilig_uw_domein_met_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.nl/g1343.webhosting_e-mail_handleiding_het_aanmaken_van_een_e-mailadres", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.nl/g1474.algemene-informatie-ovh-webhosting-emails", title: "guide_emails_emails_configuration" }
                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.nl/g1302.webmail_roundcube_gebruikershandleiding", title: "guide_emails_emails_roundcube" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.nl/g2028.het_spf_veld", title: "guide_emails_emails_spf" },
                            ]
                        }
                    ]
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.pl/g1332.Jak_przypisac_domene_lub_subdomene_do_hostingu_www#przypisanie_domeny_zarejestrowanej_w_ovh", title: "guide_add_subclient" },
                                { url: "https://www.ovh.pl/g1332.Jak_przypisac_domene_lub_subdomene_do_hostingu_www#przypisanie_zewnetrznej_domeny", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.pl/g1332.Jak_przypisac_domene_lub_subdomene_do_hostingu_www#przypisanie_zewnetrznej_domeny", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.pl/g1332.Jak_przypisac_domene_lub_subdomene_do_hostingu_www#dodaj_subdomene_do_hostingu_www", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.pl/g1585.Blad_dotyczacy_nie_zainstalowanej_strony#strona_nie_zainstalowana_blad_dotyczacy_uruchamiania_domen_i_subdomen_na_hostingu", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g2137.whois_-_aktywacja_opcji_owo", title: "guide_domain_owo_activation" },
                                { url: "https://www.ovh.pl/g2151.przewodniki_o_transferach", title: "guide_domain_transfert" },
                                { url: "https://www.ovh.pl/g2267.przewodniki_na_temat_zmiany_wlasciciela_domen", title: "guide_domain_owner_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g1604.hosting_www_jak_edytowac_strefe_dns", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g2015.hosting_www_informacje_na_temat_serwerow_dns", title: "guide_domain_dns_getting_started" },
                                { url: "https://www.ovh.pl/g1980.zonecheck_domeny", title: "guide_domain_dns_zone_check" }
                            ]
                        }
                    ],
                    dynhost: [

                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g2024.hosting_www_dynhost", title: "guide_domain_dyn_host" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g609.jak_skonfigurowac_strefe_dnssec_dla_domeny", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    addZone: [
                        {
                            title: "guide_add_zone_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g2229.utworzenie_strefy_dns_dla_zewnetrznej_domeny", title: "guide_domain_add_dns_zone" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.pl/g1343.przewodnik_na_temat_zakladania_adresu_e-mail", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.pl/g1474.emaile-na-hostingu-www-ovh", title: "guide_emails_emails_configuration" },
                                { url: "https://www.ovh.pl/g2003.hosting_www_serwery_mx", title: "guide_emails_emails_mx_servers" }
                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.pl/g2004.hosting_www_konfiguracja_na_iphone_ios_91", title: "guide_emails_emails_configuration_ios" },
                                { url: "https://www.ovh.pl/g1302.webmail_przewodnik_dotyczacy_interfejsu_roundcube", title: "guide_emails_emails_roundcube" },
                                { url: "https://www.ovh.pl/g2012.hosting_www_konfiguracja_serwerow_mx_w_strefie_dns_ovh", title: "guide_emails_emails_configuration_mx_zone_dns" },
                                { url: "https://www.ovh.pl/g2011.hosting_www_konfiguracja_serwerow_mx_w_strefie_dns_u_innego_dostawcy", title: "guide_emails_emails_configuration_mx_zone_dns_non_ovh" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.pl/g1913.uslugi_www_zmiana_oferty_e-mail", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh.pl/g2028.uslugi_www_pole_spf", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh.pl/g2117.zaawansowane_korzystanie_z_e-maili_ovh", title: "guide_emails_emails_advanced" },
                                { url: "https://www.ovh.pl/g2272.kody_odpowiedzi_serwera_smtp", title: "guide_emails_emails_smtp_response_code" }
                            ]
                        }
                    ],
                    emailsFilter: [
                        {
                            title: "guide_emails_filter_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g2001.hosting_www_przekierowania_e-mail", title: "guide_emails_emails_filters" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh.com/fr/g2001.mail_mutualise_guide_des_redirections_emails", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh.pl/g2052.przewodnik_dotyczacy_aktywacji_autorespondera", title: "guide_emails_responder" }
                            ]
                        }
                    ],
                    emailsMailingList: [
                        {
                            title: "guide_mailing_list_title",
                            list: [
                                { url: "https://www.ovh.pl/g1596.hosting_www_listy_mailingowe", title: "guide_emails_mailing_list" }
                            ]
                        }
                    ]
                },
                dnssec_service: "https://www.ovh.pl/domeny/usluga_dnssec.xml",
                vpsCloud: "https://www.ovh.pl/vps/vps-cloud.xml",
                domainOrder: "https://www.ovh.pl/order/domain/",
                domainOrderChange: "https://www.ovh.pl/cgi-bin/newOrder/order.cgi",
                domainOrderTrade: "https://www.ovh.pl/order/domain/#/legacy/domain/trade/informations?options=~~(domain~~'{domain})",
                changeOwner: "https://www.ovh.pl/cgi-bin/procedure/procedureChangeOwner.cgi",
                bulkChangeOwner: "https://www.ovh.pl/order/domain/#/legacy/domain/trade/list",
                oldInterface: "https://www.ovh.pl/managerv3/home.pl",
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
                OVHGuides: {
                    hostingGuidesTips: [
                        {
                            title: "guide_add_subscope",
                            description: "guide_add_subcontext",
                            list: [
                                { url: "https://www.ovh.pt/g1332.Guia_de_implementacao_de_um_Multi_dominio#multi-dominio_standard", title: "guide_add_subclient" },
                                { url: "https://www.ovh.pt/g1332.Guia_de_implementacao_de_um_Multi_dominio#multi-dominio_para_um_dominio_externo", title: "guide_add_subnon_client" },
                                { url: "https://www.ovh.pt/g1332.Guia_de_implementacao_de_um_Multi_dominio#multi-dominio_para_um_dominio_externo", title: "guide_add_subnon_registered" },
                                { url: "https://www.ovh.pt/g1332.Guia_de_implementacao_de_um_Multi_dominio#verificar_a_implementacao_do_seu_multi-dominio", title: "guide_add_subcreate" },
                                { url: "https://www.ovh.pt/g1585.Erro_de_site_nao_instalado#site_nao_instalado_erro_na_implementacao_de_um_dos_seus_dominios_ou_subdominios_no_alojamento", title: "guide_add_subnot_installed" }
                            ]
                        }
                    ],
                    generalInformations: [
                        {
                            title: "guide_general_info_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g2137.whois_-_ativacao_do_owo", title: "guide_domain_owo_activation" },
                                { url: "https://www.ovh.pt/g2151.centralizacao_dos_guias_de_transferencia_de_dominios", title: "guide_domain_transfert" },
                                { url: "https://www.ovh.pt/g2267.centralizacao_dos_guias_de_alteracao_do_proprietario_de_um_dominio", title: "guide_domain_owner_transfert" }
                            ]
                        }
                    ],
                    zone: [
                        {
                            title: "guide_zone_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g1604.alojamento_partilhado_como_editar_a_minha_zona_dns", title: "guide_domain_edit_zone" }
                            ]
                        }
                    ],
                    dns: [
                        {
                            title: "guide_dns_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g2015.partilhado_generalidades_sobre_os_servidores_dns", title: "guide_domain_dns_getting_started" },
                                { url: "https://www.ovh.pt/g1980.zonecheck_do_seu_dominio", title: "guide_domain_dns_zone_check" }
                            ]
                        }
                    ],
                    dynhost: [
                        {
                            title: "guide_dyn_host_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g2024.partilhado_dynhost", title: "guide_domain_dyn_host" }
                            ]
                        }
                    ],
                    glue: [
                        {
                            title: "guide_glue_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g1568.glue_registry", title: "guide_domain_glue_registry" }
                            ]
                        }
                    ],
                    dsRecord: [
                        {
                            title: "guide_ds_records_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g609.proteja_o_seu_dominio_com_dnssec", title: "guide_domain_ds_record" }
                            ]
                        }
                    ],
                    addZone: [
                        {
                            title: "guide_add_zone_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g2229.criar_uma_zona_dns_para_um_dominio_externo", title: "guide_domain_add_dns_zone" }
                            ]
                        }
                    ],
                    emails: [
                        {
                            title: "guide_emails_general_title",
                            list: [
                                { url: "https://www.ovh.pt/g1343.e-mail_partilhado_guia_de_criacao_de_um_endereco_de_e-mail", title: "guide_emails_emails_creation" },
                                { url: "https://www.ovh.pt/g1474.generalidades-mails-partilhados-ovh", title: "guide_emails_emails_configuration" },
                                { url: "https://www.ovh.pt/g2003.mail_partilhado_generalidades_sobre_os_servidores_mx", title: "guide_emails_emails_mx_servers" }
                            ]
                        }, {
                            title: "guide_emails_configuration_title",
                            list: [
                                { url: "https://www.ovh.pt/g2004.mail_partilhado_guia_configuracao_iphone_ios_91", title: "guide_emails_emails_configuration_ios" },
                                { url: "https://www.ovh.pt/g1302.webmail_guia_de_utilizacao_do_roundcube", title: "guide_emails_emails_roundcube" },
                                { url: "https://www.ovh.pt/g2012.email_partilhado_guia_de_configuracao_dos_campos_mx_com_uma_zona_dns_ovh", title: "guide_emails_emails_configuration_mx_zone_dns" },
                                { url: "https://www.ovh.pt/g2011.mail_partilhado_guia_de_configuracao_mx_com_uma_zona_dns_nao_ovh", title: "guide_emails_emails_configuration_mx_zone_dns_non_ovh" }
                            ]
                        }, {
                            title: "guide_emails_how_to_title",
                            list: [
                                { url: "https://www.ovh.pt/g1913.partilhado_alterar_o_servico_de_email", title: "guide_emails_emails_change_offer" },
                                { url: "https://www.ovh.pt/g2028.partilhado_o_campo_spf", title: "guide_emails_emails_spf" },
                                { url: "https://www.ovh.pt/g2117.utilizacao_avancada_dos_e-mails_ovh", title: "guide_emails_emails_advanced" },
                                { url: "https://www.ovh.pt/g2272.os_codigos_de_resposta_de_um_servidor_smtp", title: "guide_emails_emails_smtp_response_code" }
                            ]
                        }
                    ],
                    emailsRedirection: [
                        {
                            title: "guide_redirection_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g2001.mail_partilhado_guia_dos_reencaminhamentos_email", title: "guide_emails_redirection_create" }
                            ]
                        }
                    ],
                    emailsResponder: [
                        {
                            title: "guide_emails_responder_subscope",
                            list: [
                                { url: "https://www.ovh.pt/g2052.guia_de_ajuda_a_implementacao_de_respostas_automaticas", title: "guide_emails_responder" }
                            ]
                        }

                    ],
                    emailsMailingList: [
                        {
                            title: "guide_mailing_list_title",
                            list: [
                                { url: "https://www.ovh.pt/g1596.email_partilhado_guia_de_utilizacao_de_mailing-lists", title: "guide_emails_mailing_list" }
                            ]
                        }

                    ]
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
                WE : "https://www.ovh.com/us/order/domain/#/legacy/domain/hosting/choose?options=~(~(flow~'hosting_existing_service~serviceName~'{domai}n))"
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
            { value : "sk_SK", name : "Slovakian" },
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
        changelog_url : "engine/2api/changelog",
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
            { value: "sk_SK", name: "Slovakian" },
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
        changelog_url: "engine/2api/changelog/",
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
