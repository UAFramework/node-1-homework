# Node Based Web-server

You can create a fully functional web server with Node JS.
This can be done either following these instructions: [Node server without framework](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework#example) or using a combination of those and [serve-handler](https://github.com/vercel/serve#api) with [options](https://github.com/vercel/serve-handler).

## Web server based on "serve-handler":
Check [index.js](./index.js) for implementation.

This requires starting scripts in package.json as below:

```json
{
    "scripts": {
       "start":  "cd client && node index.js",
       "dev": "cd client && nodemon index.js"
    }
}
```