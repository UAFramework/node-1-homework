# client-server TODO project

Remember your ToDo project in https://github.com/UAFramework/js-2-3 ?
This time, you need to get your latest version of your client and refactor it, 
so that it used server dealing with data.

# Client side:
Create `client` folder here and put your ToDo front-end code in there.

# Server side:
Create `server` folder and initialise it as a node application.
Add necessary dependencies for building REST API server.
In the server code create a global `const` variable where you will keep you todo tasks.
Remember, each Todo task is an object.
Implement api end-points at your server:
- GET /task
- POST /task
- PUT /task/:id
- DELETE /task/:id

For now, we assume that the source of truth (source of data) is our front-end. 
And so whenever user changes a task at the front-end you use REST api to update/delete the same existing task or create a new task at the server side.

We will change our approach later, though.