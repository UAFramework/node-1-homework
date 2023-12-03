import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";
import serveHandler from "serve-handler";

const options = {
  public: path.join(process.cwd(), "./public"),
  directoryListing: false,
  cleanUrls: true,
  trailingSlash: true
};

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  console.log(`${request.method} ${request.url}`);

  // serveHandler doesn't require processing missing paths or files.
  // just place 404.html into the serve folder and serveHandler will pick it up.
  return serveHandler(request, response, options);
});

server.listen(8080, function () {
  const addressInfo = this.address();
  console.log(`Front-End server started at http://localhost:${addressInfo.port}`);
});