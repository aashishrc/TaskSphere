# TaskSphere 

TaskSphere is a collaborative project and task management system inspired by Kanban principles. It offers a visual  board for streamlined project organization, allowing users to create, assign, and track tasks effectively. With features such as detailed task management, real-time progress monitoring, and user assignments, TaskSphere facilitates seamless collaboration. Authentication is handled through JWT tokens, ensuring secure user access. The system also supports export/import functionalities for efficient project management. TaskSphere aims to enhance team coordination and project success with its user-friendly interface and robust features.

# Index
1. [Introduction]()
2. [Tech Stack]()
3. [Flows]()
4. [Concepts Used]()
5. [Individual Contributions]()
6. [Class Diagram]()
7. [Steps to Setup Backend]()
8. [Steps to Setup Frontend]()
9. [Swagger Documentation]()

# Tech Stack

#### Backend: Java, Spring Boot, PostgreSQL, Spring Security, JWT, JPA, Rest API
#### Frontend: React, HTML, CSS, JS

# Flows

### User

The User Flow involves the creation, authentication, and management of users. Users can register and log in through the `AuthenticationController`, which uses the `AuthenticationServiceImpl`. User information is stored in the `User` entity, and passwords are securely encoded.

Upon successful registration or login, a JWT token is generated for user authentication. The `Token` entity represents these tokens, allowing secure access to protected endpoints.

### Authentication

The Authentication Flow begins with the `AuthenticationController`, handling user registration and login endpoints. These are processed by the `AuthenticationServiceImpl`. The `register` function creates a new user and generates a JWT token, while `login` authenticates the user and returns a JWT token. The `Token` entity represents a user's authentication token.

### Project

In the Project Flow, `ProjectController` manages endpoints for project operations. The `ProjectServiceImpl` provides functions for interacting with projects, including getting project details, creating, updating, and deleting projects, assigning users to projects, and exporting/importing projects from/to CSV files. The `Project` entity represents a project, and `UserProject` represents the relationship between users and projects.

### Task

The Task Flow is handled by `TaskController`, including endpoints for tasks like getting task details, creating, updating, and deleting tasks, assigning tasks to users, and changing task priority and status. The `TaskServiceImpl` implements functions for these operations. The `Task` entity represents a task with properties like name, description, deadline, priority, status, associated project, assignee, and comments.

# Concepts Used (Few Examples)

**Inheritance**

`ProjectRequest extends ProjectDTO`, `ProjectREpository extends JPARepository`, `BadRequestException extends RuntimeException`

**Polymorphism** In entity models: User.java, Task.java, Project.java, Token.java, JwtAuthenticationFilter.java etc.

`toString`,
`equals`,
`logout`,
`compare`,
`compareTo`,
`createProject`,
`commence`,
`doFilterInternal`

LogoutService.java
```
@Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
    }
```

**APIs** Interfaces & Implementations
`AuthenticationServiceImpl implements AuthenticationService`,
`UserServiceImpl implements UserService`,
`UserProjectServiceImpl implements UserProjectService`,
`ProjectServiceImpl implements ProjectService`,
`TaskServiceImpl implements TaskService`

**Enums**

`Role` Role.java : Admin, Manager, Developer

`Task Priority` Task Priority.java : Lowest, Low, Medium, High, Highest

**Abstarct methods**

`public abstract ProjectDTO createProjectDto(Integer id, String name, String description);`  ProjectDtoFactory.java

**Lambdas**

TaskServiceImpl.java
```
List<TaskDTO> taskDTOList = taskStream
                .sorted()
                .map(this::mapToTaskDTO)
                .collect(Collectors.toList());
```
```
taskStream = taskStream.filter(task -> task.getPriority().equals(priority));
```

**Inner classes**

`public static class UserProjectId implements Serializable` - UserProject.java

`public static class LastestCommentComparator implements Comparator<Comment>` - Comment,java

**Comparators** Comment.java

```
public static class LastestCommentComparator implements Comparator<Comment> {

        @Override
        public int compare(Comment o1, Comment o2) {
            return o2.getCreatedAt().compareTo(o1.getCreatedAt());
        }
    }
```

**Comparables** Task.java

```
public class Task implements Comparable<Task> {
    @Override
    public int compareTo(Task o) {
        return Integer.compare(this.getPriority().getPriority(), o.getPriority().getPriority());
    }
}
```

**Generics**

`TaskRepository extends JpaRepository<Task, Integer>`,
`ResponseEntity<TaskDTO>`,
`ResponseEntity<APIResponse>`

**Exception Handling**

`BadRequestException extends RuntimeException`,
`ResourceNotFoundException extends RuntimeException`,
`UnauthorizedException extends RuntimeException`

**CSV file handling** Importing Project from CSV File (Reading CSV Files) - ProjectServiceImpl.java
```
public ResponseEntity<List<ProjectDTO>> importProject(File file) {
        ProjectFactory projectFactory = ProjectFactory.getInstance();
        List<ProjectDTO> list = new ArrayList<>();
        try (FileReader fr = new FileReader(file); BufferedReader br = new BufferedReader(fr)) {
            String inputLine = null;
            while ((inputLine = br.readLine()) != null) {
                String[] fields = inputLine.split(",");
                Project project = projectFactory.createProject(fields[0], fields[1]);
                projectRepository.save(project);
                list.add(new ProjectDTO(project.getId(), project.getName(), project.getDescription()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(list);
    }
```

**Design Patterns**


# Induvidual Contributions

| Name                  | Nu ID       | Contributions                                                                                                         
|-----------------------|-------------|-----------------------------------------------------------------------------------------------------------------------
| Aashish Chaple        | #002680570  | Streams, Enums, MVC Design Pattern
| Akhileshkumar Kumbar  | #002201470  | Lazy Singleton Design Pattern, Enum Singleton Factory Pattern
| Akshay Bharadwaj      | #002745765  | MVC Design Pattern, Streams
| Pritesh Nimje         | #002817324  | Repository Pattern, MVC Design Pattern, Streams
| Ruchika Shashidhara   | #002245068  | Comparable, Streams, Enum Singleton & Lazy Singleton Factory Pattern
| Sai Geeta Acharya     | #002627749  | Comparator, Inner Classes, Eager Singleton Factory Pattern
| Yuchen Zhang          | #002646829  | CSV Files, MVC Design Pattern

# Class Diagram

# Steps to Setup Backend

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

# Steps to Setup Frontend

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