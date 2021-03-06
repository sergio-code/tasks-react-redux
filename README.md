<p align="center">
  <img src="docs/img/screenshots/tablet_v1.png" alt="PWA Calculator">
</p>

## Demo
https://tasksreactapp.surge.sh/

- Login: admin
- Password: 123

## Tasks App (Test task)

Functionality:
- Tasks consist of: Username/Email/Text
- The start page is a list of tasks with the ability to sort by Username/Email/Status.
- The output of tasks must be done with pagination by 3 items per page.
- Any visitor (without registration) can see a list of tasks and create new.
- The administrator has the ability to edit the text of the task and mark task as completed.
- Completed tasks in the general list are displayed with the corresponding mark.

[Backend description](./docs/backend.md)

## Approach

### State tree
<p align="center">
  <img src="docs/img/state_tree.png" alt="Redux state tree">
</p>

### Mockups

Main page (everyone can add task, but not edit)

<img src="docs/img/mockups/main_page.png" height="400">


Login page

<img src="docs/img/mockups/login_page.png" height="400">


Admin page

<img src="docs/img/mockups/admin_page.png" height="400">


Editing task (Admin)

<img src="docs/img/mockups/admin_editing_item.png" height="400">


## How to build/run from sources

`npm start # Runs the app in the development mode on localhost:3000`

`npm run build # Builds for production`

## Todo

- [ ] Rewrite with Material-UI
- [ ] Try some another Redux pattern

## Tech/framework used
- React
- React Hooks
- Redux
- Redux-Thunk
- Redux-Form

## Credits
- [Pagination in ReactJS by Agoi Abel](https://medium.com/@agoiabeladeyemi/pagination-in-reactjs-36f4a6a6eb43)
- [The best way to architect your Redux app by Lusan Das](https://www.freecodecamp.org/news/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d/)
- [Redux FAQ: Code Structure](https://redux.js.org/faq/code-structure)
- [React and Redux Design Patterns @learnhowtoprogram.com](https://www.learnhowtoprogram.com/react/advanced-topics/react-and-redux-design-patterns)

## License
MIT © Sergio Gromov
