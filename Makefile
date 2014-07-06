test: lint
	@./node_modules/.bin/mocha

lint: ./lib/*.js
	@./node_modules/.bin/jshint $^ \

clean:
	rm -fr build components node_modules

.PHONY: test lint clean
