# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Scope

This frontend project, built with React, TypeScript, and TailwindCSS, covers the following key areas:

User Management:
Create, Read, Update, and Delete (CRUD) operations for managing users.
Role-based access control, allowing assignment of roles (e.g., Admin, Super Admin, Normal User).

Company Management:
CRUD operations for creating, updating, deleting, and viewing companies.
Each company is associated with users and employees, allowing company-level data isolation.

Employee Management:
Full CRUD capabilities for managing employees, including linking them to companies.
Employees can be assigned keys, which are critical to the overall locking system.

Building Management:
Detailed management of buildings and their hierarchical components:
Floors: Each building can have multiple floors.
Rooms: Each floor can contain multiple rooms.
Locks: Each room can have one or more locks assigned to it.
The user interface allows for easy navigation between buildings, floors, rooms, and locks.

Super Admin Controls:
Separate menu for Super Admin users.
Manual CRUD management of floors, rooms, and locks.

UI and Styling:
Styled using TailwindCSS for a responsive, clean, and consistent user interface.
Utilizes React components with TypeScript for type safety, ensuring scalable and maintainable code.

## Documentation
[Google Doc](https://docs.google.com/document/d/1rAjp8_1tGBXu5GtAUaINRZjk3fW9dT8OMmbqYR7hRFI/edit?usp=sharing)