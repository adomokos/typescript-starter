.PHONY: fmt
fmt:
	yarn run prettier ./src/**/* --config ./prettier.js --write

.PHONY: lint
lint: build ## Lints the project for best practices
	yarn run tslint --project ./tsconfig.json --config ./tslint.json

.PHONY: test
test: ## Runs application tests
	yarn run test

.PHONY: clean
clean: ## Cleans build artifacts and artifact directories
	rm -rf $(output_dir) node_modules

.PHONY: help
help: ## Prints this help command
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
