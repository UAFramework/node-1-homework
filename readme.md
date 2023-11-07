# client-server TODO project

Remember your ToDo project in https://github.com/UAFramework/js-2-3 ?
This time, you need to get your latest version of your client and refactor it, 
so that it used server dealing with data.

## Level 1:

### Client side:
Create `client` folder here and put your ToDo front-end code in there.
Here is an example how the UI could possibly look like:

![Mock UI](MockUI.png)

### Server side:
Create `server` folder and initialise it as a node application.
Add necessary dependencies for building REST API server.
In the server code create a global `const` variable where you will keep you todo tasks.
Remember, each Todo task is an object.
Implement api end-points at your server:
- GET /task
- POST /task
- PUT /task/:id
- DELETE /task/:id

Where `:id` is the parameter that stands for Index in the Array of Tasks.

For now, we assume that the source of truth (source of data) is our front-end. 
And so whenever user changes a task at the front-end you use REST api to update/delete the same existing task or create a new task at the server side.

We will change our approach later, though.

## Level 2:
- Whatch this video: [Your First Node.js Web Server](https://www.youtube.com/watch?v=VShtPwEkDD0)
and build your Node-Based Web Server out of the `client` folder.
- Following this template for [yarn-starter-kit](https://github.com/filkovsp/yarn-starter-kit) make a Monorepo with Yarn out of your project.
- Add Node [uuid](https://www.npmjs.com/package/uuid) package into the back-end and generate new UUID for each task whenever it's being posted to the server. Add it as `id` key-value in each task.
- Refactor client to use id from the server's response as the value of id tag in the newly created task at the front-end side.
- Refactor `POST /task` to return to the client the whole new task object as response.
- Refactor `PUT /task/:id` and `DELETE /task/:id` to use UUID instead of array index.
