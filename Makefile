#### SYSTEM COMMAND ####
NODE=node
YARN=yarn
GRUNT=grunt
GIT=git
CD=cd
ECHO=@echo
TAR=tar -zcvf
DEL=rm -rf
MAKE=make
MV=mv
RSYNC=rsync -av --delete --exclude=".git"

CERTIFICATE_PASS=manager
CERTIFICATE_INFO='/FR=localhost/O=OVH./C=FR'
CERTIFICATE_KEY=server/certificate/server.key
CERTIFICATE_TMP_KEY=$(CERTIFICATE_KEY).tmp
CERTIFICATE_CSR_FILE=server/certificate/server.csr
CERTIFICATE_CRT_FILE=server/certificate/server.crt

#### FOLDERS ####
NODE_DIR=node_modules
GRUNT_DEP=$(NODE_DIR)/grunt
DIST_DIR=dist
DIST_EU_DIR=dist-EU
DIST_CA_DIR=dist-CA

#### FILES ####
DIST_TAR=dist.tar.gz
DIST_EU_TAR=dist-EU.tar.gz
DIST_CA_TAR=dist-CA.tar.gz

#### MACRO ####
NAME=`grep -Po '(?<="name": ")[^"]*' package.json`


help:
	$(ECHO) "_____________________________"
	$(ECHO) "$(NAME)"
	$(ECHO) "Copyright (c) OVH SAS."
	$(ECHO) "All rights reserved."
	$(ECHO) "_____________________________"
	$(ECHO) " -- AVAILABLE TARGETS --"
	$(ECHO) "make clean                                                         => clean the sources"
	$(ECHO) "make gen-certificate                                               => generate certificate"
	$(ECHO) "make install                                                       => install deps"
	$(ECHO) "make dev                                                           => launch the project (development)"
	$(ECHO) "make prod                                                          => launch the project (production) - For testing purpose only"
	$(ECHO) "make test                                                          => launch the tests"
	$(ECHO) "make test-e2e suite=smoke|full browser=phantomjs|chrome|firefox    => launch the e2e tests"
	$(ECHO) "make coverage                                                      => launch the coverage"
	$(ECHO) "make build                                                         => build the project and generate dist"
	$(ECHO) "make release type=patch|minor|major                                => build the project, generate build folder, increment release and commit the source"
	$(ECHO) "_____________________________"

clean:
	$(DEL) $(NODE_DIR)
	$(DEL) $(DIST_DIR)
	$(DEL) $(DIST_TAR)
	$(DEL) $(DIST_EU_DIR)
	$(DEL) $(DIST_CA_DIR)
	$(DEL) $(DIST_EU_TAR)
	$(DEL) $(DIST_CA_TAR)

gen-certificate:
	mkdir -p server/certificate
	openssl genrsa -des3 -passout pass:$(CERTIFICATE_PASS) -out $(CERTIFICATE_KEY) 1024
	openssl req -passin pass:$(CERTIFICATE_PASS) -new -key $(CERTIFICATE_KEY) -out $(CERTIFICATE_CSR_FILE) -subj $(CERTIFICATE_INFO)
	cp $(CERTIFICATE_KEY) $(CERTIFICATE_TMP_KEY)
	openssl rsa -passin pass:$(CERTIFICATE_PASS) -in $(CERTIFICATE_TMP_KEY) -out $(CERTIFICATE_KEY)
	openssl x509 -req -days 365 -in $(CERTIFICATE_CSR_FILE) -signkey $(CERTIFICATE_KEY) -out $(CERTIFICATE_CRT_FILE)
	rm $(CERTIFICATE_TMP_KEY)

install:
	$(YARN) install

dev: deps
	$(GRUNT) serve

# [OLD] legacy system, should be:
# prod: deps
# 	$(GRUNT) serve:dist

build: build-eu
	$(TAR) $(DIST_TAR) $(DIST_EU_TAR)

build-eu: deps
	$(GRUNT) build --mode=prod --zone=EU
	$(MV) $(DIST_DIR) $(DIST_EU_DIR)
	$(TAR) $(DIST_EU_TAR) $(DIST_EU_DIR)

build-ca: deps
	$(GRUNT) build --mode=prod --zone=CA
	$(MV) $(DIST_DIR) $(DIST_CA_DIR)
	$(TAR) $(DIST_CA_TAR) $(DIST_CA_DIR)

release: deps
	$(YARN) version $(type) -m "chore: release v%s"


###############
# Tests tasks #
###############

TEST_REPORTS=test-reports

test: deps
	$(GRUNT) test

coverage: deps
	$(GRUNT) test:coverage:unit

webdriver:
	$(YARN) run update-webdriver

test-e2e: deps webdriver
	$(GRUNT) test:e2e --suite=$(suite) --browser=$(browser); \
	if [ $$? = 0 ]; \
	then \
	$(MAKE) tar-test-reports; \
	exit 0; \
	else \
	$(MAKE) tar-test-reports; \
	exit 2; \
	fi

tar-test-reports:
	$(TAR) $(TEST_REPORTS).tar.gz $(TEST_REPORTS)


#############
# Sub tasks #
#############

# Dependencies of the project
deps: $(GRUNT_DEP)

$(NODE_DIR)/%:
	$(MAKE) install

clean-dist: $(GRUNT_DEP)
	$(GRUNT) clean
