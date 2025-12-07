PACKAGE_ID := $(shell yq e ".id" manifest.yaml)
PACKAGE_VERSION := $(shell yq e ".version" manifest.yaml)
TS_FILES := $(shell find ./scripts -name "*.ts")

.DELETE_ON_ERROR:

all: verify

clean:
	rm -rf docker-images
	rm -f $(PACKAGE_ID).s9pk
	rm -f scripts/*.js

verify: $(PACKAGE_ID).s9pk
	start-sdk verify s9pk $(PACKAGE_ID).s9pk

$(PACKAGE_ID).s9pk: manifest.yaml instructions.md icon.png LICENSE.md scripts/embassy.js docker-images/aarch64.tar docker-images/x86_64.tar
	start-sdk pack

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh
	mkdir -p docker-images
	docker buildx build --tag start9/$(PACKAGE_ID)/main:$(PACKAGE_VERSION) --platform=linux/arm64 -o type=docker,dest=docker-images/aarch64.tar .

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh
	mkdir -p docker-images
	docker buildx build --tag start9/$(PACKAGE_ID)/main:$(PACKAGE_VERSION) --platform=linux/amd64 -o type=docker,dest=docker-images/x86_64.tar .

scripts/embassy.js: $(TS_FILES)
	deno run --allow-read --allow-write --allow-env --allow-net scripts/bundle.ts
