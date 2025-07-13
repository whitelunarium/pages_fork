# Configuration, override port with usage: make PORT=4200
PORT ?= 4500
REPO_NAME ?= pages
LOG_FILE = /tmp/jekyll$(PORT).log

SHELL = /bin/bash -c
.SHELLFLAGS = -e # Exceptions will stop make, works on MacOS

# Default theme
THEME ?= minima

# List all .ipynb files in the _notebooks directory
NOTEBOOK_FILES := $(shell find _notebooks -name '*.ipynb')

# Specify the target directory for the converted Markdown files
DESTINATION_DIRECTORY = _posts
MARKDOWN_FILES := $(patsubst _notebooks/%.ipynb,$(DESTINATION_DIRECTORY)/%_IPYNB_2_.md,$(NOTEBOOK_FILES))

# Call server, then verify and start logging
# ...

# Call theme-aware serve, then verify and start logging
default: serve

# Full monitoring with logging and notebook conversion watching
all: serve
	@echo "Terminal logging starting, watching server..."
	@# tail and awk work together to extract Jekyll regeneration messages
	@# When a _notebook is detected in the log, call make convert in the background
	@# Note: We use the "if ($$0 ~ /_notebooks\/.*\.ipynb/) { system(\"make convert &\") }" to call make convert
	@(tail -f $(LOG_FILE) | awk '/Server address: http:\/\/127.0.0.1:$(PORT)\/$(REPO_NAME)\// { serverReady=1 } \
	serverReady && /^ *Regenerating:/ { regenerate=1 } \
	regenerate { \
		if (/^[[:blank:]]*$$/) { regenerate=0 } \
		else { \
			print; \
			if ($$0 ~ /_notebooks\/.*\.ipynb/) { system("make convert &") } \
		} \
	}') 2>/dev/null &
	@# start an infinite loop with timeout to check log status
	@for ((COUNTER = 0; ; COUNTER++)); do \
		if grep -q "Server address:" $(LOG_FILE); then \
			echo "Server started in $$COUNTER seconds"; \
			break; \
		fi; \
		if [ $$COUNTER -eq 60 ]; then \
			echo "Server timed out after $$COUNTER seconds."; \
			echo "Review errors from $(LOG_FILE)."; \
			cat $(LOG_FILE); \
			exit 1; \
		fi; \
		sleep 1; \
	done
	@# outputs startup log, removes last line ($$d) as ctl-c message is not applicable for background process
	@sed '$$d' $(LOG_FILE)


# Start the local web server
server: stop convert
	@echo "Starting server..."
	@@nohup bundle exec jekyll serve -H 127.0.0.1 -P $(PORT) > $(LOG_FILE) 2>&1 & \
		PID=$$!; \
		echo "Server PID: $$PID"
	@@until [ -f $(LOG_FILE) ]; do sleep 1; done

# Convert .ipynb files to Markdown with front matter
convert: $(MARKDOWN_FILES)

# Convert .ipynb files to Markdown with front matter, preserving directory structure
$(DESTINATION_DIRECTORY)/%_IPYNB_2_.md: _notebooks/%.ipynb
	@mkdir -p $(@D)
	@python3 -c "from scripts.convert_notebooks import convert_notebooks; convert_notebooks()"

# Clean up project derived files, to avoid run issues stop is dependency
clean: stop
	@echo "Cleaning converted IPYNB files..."
	@find _posts -type f -name '*_IPYNB_2_.md' -exec rm {} +
	@echo "Cleaning Github Issue files..."
	@find _posts -type f -name '*_GithubIssue_.md' -exec rm {} +
	@echo "Removing empty directories in _posts..."
	@while [ $$(find _posts -type d -empty | wc -l) -gt 0 ]; do \
		find _posts -type d -empty -exec rmdir {} +; \
	done
	@echo "Removing _site directory..."
	@rm -rf _site


# Stop the server and kill processes
stop:
	@echo "Stopping server..."
	@# kills process running on port $(PORT)
	@@lsof -ti :$(PORT) | xargs kill >/dev/null 2>&1 || true
	@echo "Stopping logging process..."
	@# kills previously running logging processes
	@@ps aux | awk -v log_file=$(LOG_FILE) '$$0 ~ "tail -f " log_file { print $$2 }' | xargs kill >/dev/null 2>&1 || true
	@# removes log
	@rm -f $(LOG_FILE)

# stops the server and reloads it
reload:
	@make stop
	@make

# stops server, cleans it, reloads it
refresh:
	@make stop
	@make clean
	@make

# ================================================================
# THEME SWITCHING FUNCTIONALITY
# ================================================================

# Serve with Minima theme
serve-minima: stop convert
	@echo "Starting server with Minima theme..."
	@if ! grep -q "jekyll/minima" _config.yml; then \
		./scripts/switch-theme.sh minima; \
	fi
	@@nohup bundle exec jekyll serve -H 127.0.0.1 -P $(PORT) > $(LOG_FILE) 2>&1 & \
		PID=$$!; \
		echo "Server PID: $$PID"
	@@until [ -f $(LOG_FILE) ]; do sleep 1; done
	@# Wait for server to be ready and show server address
	@for ((COUNTER = 0; ; COUNTER++)); do \
		if grep -q "Server address:" $(LOG_FILE); then \
			echo "Server started in $$COUNTER seconds"; \
			grep "Server address:" $(LOG_FILE); \
			break; \
		fi; \
		if [ $$COUNTER -eq 120 ]; then \
			echo "Server timed out after $$COUNTER seconds."; \
			echo "Review errors from $(LOG_FILE)."; \
			cat $(LOG_FILE); \
			exit 1; \
		fi; \
		sleep 1; \
	done

# Serve with TeXt theme  
serve-text: stop convert
	@echo "Starting server with TeXt theme..."
	@if ! grep -q "kitian616/jekyll-TeXt-theme" _config.yml; then \
		./scripts/switch-theme.sh text; \
	fi
	@@nohup bundle exec jekyll serve -H 127.0.0.1 -P $(PORT) > $(LOG_FILE) 2>&1 & \
		PID=$$!; \
		echo "Server PID: $$PID"
	@@until [ -f $(LOG_FILE) ]; do sleep 1; done
	@# Wait for server to be ready and show server address
	@for ((COUNTER = 0; ; COUNTER++)); do \
		if grep -q "Server address:" $(LOG_FILE); then \
			echo "Server started in $$COUNTER seconds"; \
			grep "Server address:" $(LOG_FILE); \
			break; \
		fi; \
		if [ $$COUNTER -eq 120 ]; then \
			echo "Server timed out after $$COUNTER seconds."; \
			echo "Review errors from $(LOG_FILE)."; \
			cat $(LOG_FILE); \
			exit 1; \
		fi; \
		sleep 1; \
	done

# Build with Minima theme
build-minima:
	@echo "Building with Minima theme..."
	@./scripts/switch-theme.sh minima
	@bundle exec jekyll build

# Build with TeXt theme
build-text:
	@echo "Building with TeXt theme..."
	@./scripts/switch-theme.sh text
	@bundle exec jekyll build

# Interactive theme switcher
switch-theme:
	@echo "Available themes:"
	@echo "1. Minima (minimal, clean)"
	@echo "2. TeXt (feature-rich, modern)"
	@read -p "Select theme (1-2): " choice; \
	case $$choice in \
		1) ./scripts/switch-theme.sh minima ;; \
		2) ./scripts/switch-theme.sh text ;; \
		*) echo "Invalid choice" ;; \
	esac

# Detect current theme from _config.yml
detect-theme:
	@if grep -q "kitian616/jekyll-TeXt-theme" _config.yml; then \
		echo "text"; \
	else \
		echo "minima"; \
	fi

# Theme-aware serve target
serve: stop convert
	@CURRENT_THEME=$$(make -s detect-theme); \
	echo "Detected theme: $$CURRENT_THEME"; \
	echo "Will call: serve-$$CURRENT_THEME"; \
	make serve-$$CURRENT_THEME

# Theme-aware build target
build: 
	@CURRENT_THEME=$$(make -s detect-theme); \
	make build-$$CURRENT_THEME
