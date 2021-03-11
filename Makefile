all:
	./node_modules/.bin/esbuild \
		main.ts \
			--bundle \
			--outfile=main.js \
			--platform=node
