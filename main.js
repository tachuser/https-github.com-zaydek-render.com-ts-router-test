var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// router.ts
var http = __toModule(require("http"));
function createServer2() {
  const str_map = {};
  const regex_arr = [];
  const srv2 = {
    handle(pathOrPattern, handler) {
      if (typeof pathOrPattern === "string") {
        const path = pathOrPattern;
        str_map[path] = handler;
        return;
      }
      if (pathOrPattern instanceof RegExp) {
        const pattern = pathOrPattern;
        regex_arr.push({pattern, handler});
        return;
      }
    },
    listen(port) {
      let epoch = 0;
      function start(req, res) {
        epoch = Date.now();
      }
      function end(req, res) {
        console.log(`${req.method} ${req.url} - ${Date.now() - epoch}ms`);
      }
      const srv3 = http.createServer(async (req, res) => {
        start(req, res);
        const handler = str_map[req.url];
        if (handler !== void 0) {
          handler(req, res);
          end(req, res);
          return;
        }
        for (const {pattern, handler: handler2} of regex_arr) {
          if (pattern.test(req.url)) {
            handler2(req, res);
            end(req, res);
            return;
          }
        }
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 - Not Found");
        end(req, res);
      });
      srv3.listen(port);
    }
  };
  return srv2;
}
var srv = createServer2();
function handle(path, handler) {
  srv.handle(path, handler);
}
function listen(port) {
  srv.listen(port);
}

// main.ts
function run() {
  handle("/a", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Hello, world! (/a)</h1>");
  });
  handle("/b", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Hello, world! (/b)</h1>");
  });
  handle("/c", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Hello, world! (/c)</h1>");
  });
  handle(/\/hello-w[o0]rld/, (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Hello, world! ([o0])</h1>");
  });
  let port = 8e3;
  if (process.env["PORT"] !== void 0) {
    port = +process.env["PORT"];
  }
  listen(port);
}
run();
