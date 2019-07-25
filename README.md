<p align="center">
  <img src="https://i.ibb.co/HP8DnpL/tasksreactapp-surge-sh.png" alt="PWA Calculator">
</p>

## DEMO
https://tasksreactapp.surge.sh/

Login: admin

Password: 123

## Tasks App (Test task)

Functionality:
- Tasks consist of: Username/Email/Text
- The start page is a list of tasks with the ability to sort by Username/Email/Status.
- The output of tasks must be done with pagination by 3 items per page.
- Any visitor (without registration) can see a list of tasks and create new.
- The administrator has the ability to edit the text of the task and mark task as completed.
- Completed tasks in the general list are displayed with the corresponding mark.

## State tree
<p align="center">
  <img src="https://i.ibb.co/QKG418r/Screenshot-from-2019-07-25-22-24-28.png" alt="PWA Calculator">
</p>

## Backend description

MIME-type for POST requests - multipart/form-data

Server response in JSON format.

Response may consist of two fields:

 - status: string - "ok" in case of success request, "error" in case of error
 - message: string | {} - result of request (in case of success), error message (in case of error), field may be empty or absent

There are must present GET-parameter "developer" (with a name of developer) for all requests.

### Tasks list (/)

Acceptable parameters (GET):

 - sort_field (id | username | email | status) - field for sorting
 - sort_direction (asc | desc) - sorting direction
 - page - page number for pagination

In response in "message" field will be two keys - "tasks" (task list for the current page) and "total_task_count"

Response example:

```
{
  "status": "ok",
  "message": {
  "tasks": [
    {
      "id": 1,
      "username": "Test User",
      "email": "test_user_1@example.com",
      "text": "Hello, world!",
      "status": 10,
    },
    {
      "id": 3,
      "username": "Test User 2",
      "email": "test_user_2@example.com",
      "text": "Hello from user 2!",
      "status": 0,
    },
    {
      "id": 4,
      "username": "Test User 3",
      "email": "test_user_3@example.com",
      "text": "Hello from user 3!",
      "status": 0,
    }
  ],
  "total_task_count": "5"
  }
}

```

### Creating task (/create)

Required parameters (POST):

- username: string - task owner username
- email: string - task owner email, must be valid email
- text: string - task text

Request example (jQuery AJAX):

```
$(document).ready(function() {
  var form = new FormData();
  form.append("username", "Example");
  form.append("email", "example@example.com");
  form.append("text", "Some text");

  $.ajax({
    url: 'https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Example',
    crossDomain: true,
    method: 'POST',
    mimeType: "multipart/form-data",
    contentType: false,
    processData: false,
    data: form,
    dataType: "json",
    success: function(data) {
      console.log(data);
    }
  });
});
```

Response example (success):

```
{
  "status": "ok",
  "message": {
    "id": 8,
    "username": "Example user",
    "email": "123@example.com",
    "text": "Some text",
    "status": 0
  }
}
```

Response example (error):

```
{
  "status": "error",
  "message": {
    "username": "Поле является обязательным для заполнения",
    "email": "Неверный email",
    "text": "Поле является обязательным для заполнения"
  }
}
```



### SignIn (/login)

To verify user data, you need to transfer two fields in POST request - username (admin) and password (123).

In the case of successful authorization, an authorization token will be transmitted in the message body, with 24h lifetime.

Response example (auth error):

```
{
  "status": "error",
  "message": {
    "username": "Поле является обязательным для заполнения",
    "password": "Неверный логин или пароль"
  }
}
```

Response example (success):

```
{
  "status": "ok"
}
```


### Task edit (/edit/:id)

Editing is available only for authorized users (see login). As POST-parameter, you must pass the authorization token ("token" field). Authorization Token Lifetime - 24 hours.

Allowed parameters for editing:

 - text: string - task text
 - status: number - task execution status (0 - task isn't completed, 10 - task is completed)

Response example (auth error):

```
{
  "status": "error",
  "message": {
    "token": "Токен истёк"
  }
}
````

Response example (success):

```
{
  "status": "ok"
}
```



## Tech/framework used
- React
- Redux
- Redux-Thunk

## How to build/run from sources

`npm start # Runs the app in the development mode on localhost:3000`

`npm run build # Builds for production`

## Credits
- [Pagination in ReactJS by Agoi Abel](https://medium.com/@agoiabeladeyemi/pagination-in-reactjs-36f4a6a6eb43)
- [The best way to architect your Redux app by Lusan Das](https://www.freecodecamp.org/news/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d/)
- [Redux FAQ: Code Structure](https://redux.js.org/faq/code-structure)
- [React and Redux Design Patterns @learnhowtoprogram.com](https://www.learnhowtoprogram.com/react/advanced-topics/react-and-redux-design-patterns)

## License
MIT © Sergio Gromov
