# Final Back-End (GameMoon)

### Project Overview

#### GameMoon is a back-end application built with Node.js, Express.js, and MongoDB. It provides authentication, user management, and API endpoints for handling game-related content.

### Setup Instructions

1️. Clone the Repository
```
git clone https://github.com/barcek2281/Final-back-end.git
cd Final-back-end
```
2️. Install Dependencies
```
npm install
```
3️. Set Up Environment Variables
Create a .env file in the root directory and configure necessary variables:

```
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
SESSION_SECRET=your_session_secret
```
4️. Start the Server

### Run the following command to start the server:

`npm start`
The server will run on `http://localhost:3000`

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing
- EJS for templating


## Deployment

On Render 
`https://final-back-end-1oa5.onrender.com`