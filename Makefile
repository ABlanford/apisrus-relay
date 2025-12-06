# FeedView Relay - Start9 Package Build
# Builds .s9pk package for StartOS

PKG_ID := feedview-relay
PKG_VERSION := 0.1.0
TS_FILES := $(shell find . -name "*.ts" 2>/dev/null)

.DELETE_ON_ERROR:

all: verify

# Build for x86_64 (Intel/AMD)
x86:
	@echo "Building for x86_64..."
	@mkdir -p docker-images
	docker buildx build \
		--tag start9/$(PKG_ID)/main:$(PKG_VERSION) \
		--build-arg PLATFORM=linux/amd64 \
		--platform=linux/amd64 \
		-o type=docker,dest=docker-images/x86_64.tar \
		.
	@echo "Building s9pk..."
	start-sdk pack

# Build for ARM64 (Raspberry Pi, Apple Silicon)
arm:
	@echo "Building for aarch64..."
	@mkdir -p docker-images
	docker buildx build \
		--tag start9/$(PKG_ID)/main:$(PKG_VERSION) \
		--build-arg PLATFORM=linux/arm64 \
		--platform=linux/arm64 \
		-o type=docker,dest=docker-images/aarch64.tar \
		.
	@echo "Building s9pk..."
	start-sdk pack

# Build for both architectures
both: x86 arm

# Verify the package
verify: 
	@echo "Verifying package..."
	start-sdk verify

# Clean build artifacts
clean:
	rm -rf docker-images
	rm -f $(PKG_ID).s9pk
	rm -f image.tar

# Install to local Start9 (requires start-cli configured)
install: x86
	start-cli package install $(PKG_ID).s9pk

# Development: just build Docker image locally
dev:
	docker build -t $(PKG_ID):dev .
	docker run --rm -it -p 8888:8888 -p 8554:8554 $(PKG_ID):dev

.PHONY: all x86 arm both verify clean install dev
