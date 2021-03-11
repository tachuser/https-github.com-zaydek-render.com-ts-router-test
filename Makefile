all:
	./node_modules/.bin/esbuild main.ts --bundle --outfile=main.esbuild.js --platform=node
