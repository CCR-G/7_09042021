# Project #7 - Build a Full-Stack solution

**Projet 7 - Construisez une API sécurisée pour une application d'avis gastronomiques** <br>
OpenClassrooms - Web developper training

## Subject
Analyze a client’s needs to define the scope and features of a new application. With the help of a front-end framework, build a full-stack solution, including a SQL database.

## How to test

### Prerequisites
* You will need to use a local web server to run the backend of this app and install the MySQL database.
I recommand using either Laragon or WAMP server (This tutorial will use Laragon).
* You will also need to clone this repository in order to have a local copy of the project.

### Database
* Save the `groupomania_bdd.sql` file inside your `laragon` folder for ease of use.
* Open Laragon and open its terminal.
* Open MySQL with your root credentials (`mysql -u root`).
* Create a new user and grant it the privileges for the future database.
```
CREATE USER 'openclassrooms'@'localhost'IDENTIFIED BY 'OpenClassr00ms';
GRANT ALL PRIVILEGES ON groupomania.* TO 'openclassrooms'@'localhost';
```
* Quit MySQL (`quit`) and run it this new user (`mysql -u openclassrooms -p --default-character-set=utf8`) and enter the `OpenClassr00ms` password we set.
* Create the database with
```
CREATE DATABASE groupomania;
USE groupomania;
SOURCE groupomania_bdd.sql;
```

### Backend
* On Laragon home page, run the services with the button `Start` or `Démarrer`.
* Create and fill in an `.env` file within the `backend` folder, based on the `.env.template` file
```
DB_HOST=localhost
DB_USER=openclassrooms
DB_PASS=OpenClassr00ms
DB_DATABASE=groupomania
TOKEN_SECRET_KEY=Long_And_Complicated_Secret_Key
```
* In a terminal and from within the `backend` folder of the repository, run `npm run build`

### Frontend
* In a terminal and from within the `frontend` folder of the repository, run `npm run serve`
* The command should tell you that the app is running at `http://localhost:8081` (the port may differ).

### Use and test
* Open the frontend page at `http://localhost:8081` and register yourself as a new user.
* If you wish to test the app as a moderator, you may do so with user `Sabine`. The credentials are as follow : `sabine@gmail.com` - `Sab1neSab1ne`.

## Available features
* Register a new user with a username and secure password.
* Login and stay authenticated.
* View articles and comments from other users of the network.
* Post new articles with or without a picture link.
* Comment on articles.
* Logout of the app or delete your account.
* Browse as a moderator to be able to delete unappropriate articles and comments.

## Features roadmap
* Change username, email and password.
* Add a GitHub page with a GitHub action for easy deployement upon pushing.
* Delete own articles and comments.
* Upload images.
* Confirm password upon registration.
* Save user email for quicker login in.
* Lazy loading on articles and comments.
* Date and hour on comments
* API documentation
* …

## Note

I built this app using VueJS and TypeScript for the frontend, and NodeJS for the backend. The database uses MySQL.

My objectives were to make a nice UX and accessible UI.
I tried as much as possible to make the backend secure and the overall code readable and maintanable.
I believe that all those topic are long-term tasks and that they are likely to never end. Development is beautiful in that it is always possible to improve the code and add new features to a project.

This exercice is the last part of my training to become a graduated web developper. Please do send me comments or feedback!