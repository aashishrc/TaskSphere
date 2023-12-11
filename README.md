# TaskSphere 

About the project goes here

# Tech Stack

#### Backend: Spring Boot, PostgreSQL, Spring Security, JWT, JPA, Rest API
#### Frontend: React, HTML, CSS, JS

## Concepts Used

## Class Diagram

## Flows

## User Flow:

The User Flow involves the creation, authentication, and management of users. Users can register and log in through the `AuthenticationController`, which uses the `AuthenticationServiceImpl`. User information is stored in the `User` entity, and passwords are securely encoded.

Upon successful registration or login, a JWT token is generated for user authentication. The `Token` entity represents these tokens, allowing secure access to protected endpoints.

---

## Authentication Flow:

The Authentication Flow begins with the `AuthenticationController`, handling user registration and login endpoints. These are processed by the `AuthenticationServiceImpl`. The `register` function creates a new user and generates a JWT token, while `login` authenticates the user and returns a JWT token. The `Token` entity represents a user's authentication token.

---

## Project Flow:

In the Project Flow, `ProjectController` manages endpoints for project operations. The `ProjectServiceImpl` provides functions for interacting with projects, including getting project details, creating, updating, and deleting projects, assigning users to projects, and exporting/importing projects from/to CSV files. The `Project` entity represents a project, and `UserProject` represents the relationship between users and projects.

---

## Task Flow:

The Task Flow is handled by `TaskController`, including endpoints for tasks like getting task details, creating, updating, and deleting tasks, assigning tasks to users, and changing task priority and status. The `TaskServiceImpl` implements functions for these operations. The `Task` entity represents a task with properties like name, description, deadline, priority, status, associated project, assignee, and comments.

## Steps to Setup

### Backend

**1. Clone the application**

```bash
git clone https://github.com/CSYE6200-Object-Oriented-DesignFall2023/final-project-final-group-19.git
```

**2. Install PostgreSQL**

Download the installer from official [website](https://www.postgresql.org/).

or

Use homebrew to install (MacOS only):

`brew install postgresql`

`brew services start postgresql`


**3. Install pgAdmin 4 for database visualization (optional)**

Download the installer from official [website](https://www.pgadmin.org/download/)

or

Use homebrew to install (MacOS only):

`brew install --cask pgadmin4`


**2. Create postgres database**

```bash
create database 'TaskSphere'
```
- run `src/main/resources/tasksphere.sql`

**4. Change database username and password as per your installation**

+ open `src/main/resources/application.yml`
+ change `spring.datasource.username` and `spring.datasource.password` as per your installation
+ default username: `admin` and password:`admin@123`

**5. Run the app using maven**

```bash
cd backend

mvn clear install

mvn spring-boot:run
```
The app will start running at <http://localhost:8080>

### Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `cd frontend`

### `npm i react-beautiful-dnd antd styled-components` to install three packages and their dependenciess

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

# Swagger documentation

Swagger documentation will be available at <http://localhost:8080/swagger-ui/index.html>

[//]: # (## Explore Rest APIs)

[//]: # ()
[//]: # (The app defines following CRUD APIs.)

[//]: # ()
[//]: # (### Auth)

[//]: # ()
[//]: # (| Method | Url                   | Description | Sample Valid Request Body | )

[//]: # (| ------ |-----------------------|------------|---------------------------|)

[//]: # (| POST   | /api/v1/auth/register | Register   | [JSON]&#40;#register&#41;         |)

[//]: # (| POST   | /api/v1/auth/login    | Log in     | [JSON]&#40;#login&#41;            |)

[//]: # ()
[//]: # (### Users)

[//]: # ()
[//]: # (| Method | Url | Description | Sample Valid Request Body |)

[//]: # (| ------ | --- | ----------- | ------------------------- |)

[//]: # (| GET    | /api/users/me | Get logged in user profile | |)

[//]: # (| GET    | /api/users/{username}/profile | Get user profile by username | |)

[//]: # (| GET    | /api/users/{username}/posts | Get posts created by user | |)

[//]: # (| GET    | /api/users/{username}/albums | Get albums created by user | |)

[//]: # (| GET    | /api/users/checkUsernameAvailability | Check if username is available to register | |)

[//]: # (| GET    | /api/users/checkEmailAvailability | Check if email is available to register | |)

[//]: # (| POST   | /api/users | Add user &#40;Only for admins&#41; | [JSON]&#40;#usercreate&#41; |)

[//]: # (| PUT    | /api/users/{username} | Update user &#40;If profile belongs to logged in user or logged in user is admin&#41; | [JSON]&#40;#userupdate&#41; |)

[//]: # (| DELETE | /api/users/{username} | Delete user &#40;For logged in user or admin&#41; | |)

[//]: # (| PUT    | /api/users/{username}/giveAdmin | Give admin role to user &#40;only for admins&#41; | |)

[//]: # (| PUT    | /api/users/{username}/TakeAdmin | Take admin role from user &#40;only for admins&#41; | |)

[//]: # (| PUT    | /api/users/setOrUpdateInfo | Update user profile &#40;If profile belongs to logged in user or logged in user is admin&#41; | [JSON]&#40;#userinfoupdate&#41; |)

[//]: # ()
[//]: # (### Projects)

[//]: # ()
[//]: # (| Method | Url                        | Description                         | Sample Valid Request Body |)

[//]: # (|--------|----------------------------|-------------------------------------|--------------------------|)

[//]: # (| GET    | /api/v1/projects           | Get all projects                    | [JSON]&#40;#projects&#41;        |)

[//]: # (| GET    | /api/v1/projects/{id}      | Get project by id                   | [JSON]&#40;#projectById&#41;     |)

[//]: # (| POST   | /api/v1/projects/create    | Create project                      | [JSON]&#40;#projectcreate&#41;   |)

[//]: # (| PUT    | /api/v1/project/update     | Update project                      | [JSON]&#40;#projectupdate&#41;   |)

[//]: # (| DELETE | /api/v1/project/{id}       | Delete project                      | [JSON]&#40;#projectdelete&#41;   |)

[//]: # (| POST   | /api/v1/project/assign     | Assign project to a user            | [JSON]&#40;#projectassign&#41;   |)

[//]: # (| GET    | /api/v1/project/{id}/users | Get all users assigned to a project | [JSON]&#40;#projectusers&#41;    |)

[//]: # ()
[//]: # (### Tasks)

[//]: # ()
[//]: # (| Method | Url | Description | Sample Valid Request Body |)

[//]: # (| ------ | --- | ----------- | ------------------------- |)

[//]: # (| GET    | /api/posts | Get all posts | |)

[//]: # (| GET    | /api/posts/{id} | Get post by id | |)

[//]: # (| POST   | /api/posts | Create new post &#40;By logged in user&#41; | [JSON]&#40;#postcreate&#41; |)

[//]: # (| PUT    | /api/posts/{id} | Update post &#40;If post belongs to logged in user or logged in user is admin&#41; | [JSON]&#40;#postupdate&#41; |)

[//]: # (| DELETE | /api/posts/{id} | Delete post &#40;If post belongs to logged in user or logged in user is admin&#41; | |)

[//]: # ()
[//]: # (### Comments)

[//]: # ()
[//]: # (| Method | Url | Description | Sample Valid Request Body |)

[//]: # (| ------ | --- | ----------- | ------------------------- |)

[//]: # (| GET    | /api/posts/{postId}/comments | Get all comments which belongs to post with id = postId | |)

[//]: # (| GET    | /api/posts/{postId}/comments/{id} | Get comment by id if it belongs to post with id = postId | |)

[//]: # (| POST   | /api/posts/{postId}/comments | Create new comment for post with id = postId &#40;By logged in user&#41; | [JSON]&#40;#commentcreate&#41; |)

[//]: # (| PUT    | /api/posts/{postId}/comments/{id} | Update comment by id if it belongs to post with id = postId &#40;If comment belongs to logged in user or logged in user is admin&#41; | [JSON]&#40;#commentupdate&#41; |)

[//]: # (| DELETE | /api/posts/{postId}/comments/{id} | Delete comment by id if it belongs to post with id = postId &#40;If comment belongs to logged in user or logged in user is admin&#41; | |)

[//]: # ()
[//]: # (## Sample Valid JSON Request Bodys)

[//]: # ()
[//]: # (##### <a id="register">Register -> /api/v1/auth/register</a>)

[//]: # (```json)

[//]: # ({)

[//]: # (  "username": "admin@tasksphere.com",)

[//]: # (  "firstname": "Admin",)

[//]: # (  "lastname": "User",)

[//]: # (  "password": "Admin@123",)

[//]: # (  "role": "Admin")

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="login">Log In -> /api/v1/auth/login</a>)

[//]: # (```json)

[//]: # ({)

[//]: # (  "username": "admin@tasksphere.com",)

[//]: # (  "password": "Admin@123")

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="usercreate">Create User -> /api/users</a>)

[//]: # (```json)

[//]: # ({)

[//]: # (	"firstName": "Ervin",)

[//]: # (	"lastName": "Howell",)

[//]: # (	"username": "ervin",)

[//]: # (	"password": "password",)

[//]: # (	"email": "ervin.howell@gmail.com",)

[//]: # (	"address": {)

[//]: # (		"street": "Victor Plains",)

[//]: # (		"suite": "Suite 879",)

[//]: # (		"city": "Wisokyburgh",)

[//]: # (		"zipcode": "90566-7771",)

[//]: # (		"geo": {)

[//]: # (			"lat": "-43.9509",)

[//]: # (			"lng": "-34.4618")

[//]: # (		})

[//]: # (	},)

[//]: # (	"phone": "010-692-6593 x09125",)

[//]: # (	"website": "http://erwinhowell.com",)

[//]: # (	"company": {)

[//]: # (		"name": "Deckow-Crist",)

[//]: # (		"catchPhrase": "Proactive didactic contingency",)

[//]: # (		"bs": "synergize scalable supply-chains")

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="userupdate">Update User -> /api/users/{username}</a>)

[//]: # (```json)

[//]: # ({)

[//]: # (	"firstName": "Ervin",)

[//]: # (	"lastName": "Howell",)

[//]: # (	"username": "ervin",)

[//]: # (	"password": "updatedpassword",)

[//]: # (	"email": "ervin.howell@gmail.com",)

[//]: # (	"address": {)

[//]: # (		"street": "Victor Plains",)

[//]: # (		"suite": "Suite 879",)

[//]: # (		"city": "Wisokyburgh",)

[//]: # (		"zipcode": "90566-7771",)

[//]: # (		"geo": {)

[//]: # (			"lat": "-43.9509",)

[//]: # (			"lng": "-34.4618")

[//]: # (		})

[//]: # (	},)

[//]: # (	"phone": "010-692-6593 x09125",)

[//]: # (	"website": "http://erwinhowell.com",)

[//]: # (	"company": {)

[//]: # (		"name": "Deckow-Crist",)

[//]: # (		"catchPhrase": "Proactive didactic contingency",)

[//]: # (		"bs": "synergize scalable supply-chains")

[//]: # (	})

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="userinfoupdate">Update User Profile -> /api/users/setOrUpdateInfo</a>)

[//]: # (```json)

[//]: # ({)

[//]: # (	"street": "Douglas Extension",)

[//]: # (	"suite": "Suite 847",)

[//]: # (	"city": "McKenziehaven",)

[//]: # (	"zipcode": "59590-4157",)

[//]: # (	"companyName": "Romaguera-Jacobson",)

[//]: # (	"catchPhrase": "Face to face bifurcated interface",)

[//]: # (	"bs": "e-enable strategic applications",)

[//]: # (	"website": "http://ramiro.info",)

[//]: # (	"phone": "1-463-123-4447",)

[//]: # (	"lat": "-68.6102",)

[//]: # (	"lng": "-47.0653")

[//]: # (})

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="projects">Get all projects -> /api/v1/projects</a>)

[//]: # (```url)

[//]: # (http://localhost:8080/api/v1/projects?page=0&size=5)

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="projectById">Get project by id -> /api/v1/projects/{id}</a>)

[//]: # (```url)

[//]: # (http://localhost:8080/api/v1/projects/1)

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="projectdelete">Delete project by id -> /api/v1/projects/{id}</a>)

[//]: # (```url)

[//]: # (http://localhost:8080/api/v1/projects/1)

[//]: # (```)

[//]: # ()
[//]: # (##### <a id="projectusers">Get all users assigned to a project -> /api/v1/projects/{id}/users</a>)

[//]: # (```url)

[//]: # (http://localhost:8080/api/v1/projects/1/users)

[//]: # (```)