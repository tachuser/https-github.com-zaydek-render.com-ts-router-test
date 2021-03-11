import * as router from "./router"

function run() {
	// function middleware(req: router.Request, _: router.Response): void {
	// 	console.log(req.url!)
	// }

	router.handle("/a", (req, res) => {
		// middleware(req, res)
		res.writeHead(200, { "Content-Type": "text/html" })
		res.end("<h1>Hello, world! (/a)</h1>")
	})
	router.handle("/b", (req, res) => {
		// middleware(req, res)
		res.writeHead(200, { "Content-Type": "text/html" })
		res.end("<h1>Hello, world! (/b)</h1>")
	})
	router.handle("/c", (req, res) => {
		// middleware(req, res)
		res.writeHead(200, { "Content-Type": "text/html" })
		res.end("<h1>Hello, world! (/c)</h1>")
	})
	router.handle(/\/hello-w[o0]rld/, (req, res) => {
		// middleware(req, res)
		res.writeHead(200, { "Content-Type": "text/html" })
		res.end("<h1>Hello, world! ([o0])</h1>")
	})
	let port = 8000
	if (process.env["PORT"] !== undefined) {
		port = +process.env["PORT"]
	}
	router.listen(port)
}

run()
